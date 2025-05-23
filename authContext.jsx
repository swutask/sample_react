// import { API } from "@/API/axiosInstance";
// import { createContext, useState, useEffect, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(null);
//   const [currentUserDetails, setCurrentUserDetails] = useState({});
//   const [currentUserRole, setCurrentUserRole] = useState(0);
//   const [currentCampusDetails, setCurrentCampusDetails] = useState({});
//   const [isDefaultUniversity, setIsDefaultUniversity] = useState(false);

//   const token = localStorage.getItem("authToken");
//   const role = localStorage.getItem("roleId");

//   useEffect(() => {
//       setAuthToken(token);
//       setCurrentUserRole(role);
//       if(token){
//         userDetailsHandler();
//       }
//   }, []);

//   const loginHandler = (token, role) => {
//     setAuthToken(token);
//     localStorage.setItem("authToken", token);
//     if(!localStorage.getItem("universityToken")) {
//       localStorage.setItem("universityToken", token);
//     }
//     setCurrentUserRole(role);
//     localStorage.setItem('roleId', role);
//     userDetailsHandler();
//   };

//   const logoutHandler = () => {
//     setAuthToken(null);
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("campusId");
//     localStorage.removeItem("universityToken");
//     setCurrentUserRole(0);
//     localStorage.removeItem("roleId")
//     setCurrentUserDetails({});
//   };

//   const userDetailsHandler = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await API.getUserDetails(token);
//       const userDetailResponse = response?.data;
//       if (userDetailResponse?.success) {
//         setCurrentUserDetails(userDetailResponse?.data)
//         userDetailResponse?.data?.isCampus ? setCurrentCampusDetails(userDetailResponse?.data?.campus) : setCurrentCampusDetails(userDetailResponse?.data?.university);
//         userDetailResponse?.data?.isCampus ? setIsDefaultUniversity(false) : setIsDefaultUniversity(true);
//       } else if(!userDetailResponse?.auth) {
//         logoutHandler();
//       } else {
//         console.log(userDetailResponse.message);
//       }

//     } catch (error) {
//       console.error('error:', error);
//     }
//   }

//   const value = {
//     authToken,
//     isAuthenticated: !!authToken,
//     loginHandler,
//     logoutHandler,
//     currentUserDetails,
//     userDetailsHandler,
//     currentUserRole,
//     currentCampusDetails,
//     setAuthToken,
//     isDefaultUniversity
//   };


//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);

import { API } from "@/API/axiosInstance";
import { createContext, useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(0);
  const [isDefaultUniversity, setIsDefaultUniversity] = useState(false);
  const [currentCampusDetails, setCurrentCampusDetails] = useState({});

  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("roleId");

  const {
    data: currentUserDetails,
    isLoading: isUserDetailsLoading,
    isError: isUserDetailsError,
    refetch: userDetailsHandler,
  } = useQuery({
    queryKey: ["userDetails", token], 
    queryFn: async () => {
      if (!token) throw new Error("No token available");
      const response = await API.getUserDetails(token);
      const userDetailResponse = response?.data;
      if (!userDetailResponse?.success) {
        throw new Error(userDetailResponse?.message || "Failed to fetch user details");
      }
      return userDetailResponse.data; 
    },
    staleTime: 1000 * 60 * 2,
    enabled: !!token,
  });

  useEffect(() => {
    if (currentUserDetails) {
      currentUserDetails?.isCampus
        ? setCurrentCampusDetails(currentUserDetails?.campus)
        : setCurrentCampusDetails(currentUserDetails?.university);
      setIsDefaultUniversity(!currentUserDetails?.isCampus);
    }
  }, [currentUserDetails]);


  useEffect(() => {
    setAuthToken(token);
    setCurrentUserRole(role);
    // if (token) {
    //   userDetailsHandler(); // Trigger the query when the component mounts
    // }
  }, [token, role]);

  const loginHandler = (token, role) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token);
    if (!localStorage.getItem("universityToken")) {
      localStorage.setItem("universityToken", token);
    }
    setCurrentUserRole(role);
    localStorage.setItem("roleId", role);
    userDetailsHandler(); // Trigger the query after login
  };

  const logoutHandler = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("campusId");
    localStorage.removeItem("universityToken");
    setCurrentUserRole(0);
    localStorage.removeItem("roleId");
  };

  const value = {
    authToken,
    isAuthenticated: !!authToken,
    loginHandler,
    logoutHandler,
    currentUserDetails,
    userDetailsHandler, // Expose the refetch function
    isUserDetailsLoading,
    isUserDetailsError,
    currentUserRole,
    currentCampusDetails,
    setAuthToken,
    isDefaultUniversity,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);