import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "http://localhost:4043/api/v1",
  // baseURL: "http://192.168.0.42:4000/api/v1/",
  // baseURL: "http://192.168.1.63:4000/api/v1/",
  baseURL: "https://caap-higher-dev-be.ourappdemo.com:4043/api/v1/",
  // baseURL:"http://192.168.1.63:4000/api/v1/",
  timeout: 250000000000000000,
  headers: {},
});


AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);

export const API = {
  async login(email, password) {
    try {
      const response = await AxiosInstance.post("/auth/login", {
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error("Login API error:", error);
      throw error;
    }
  },
  async forgotPassword(email) {
    try {
      const response = await AxiosInstance.post("/auth/forgot-password", {
        email,
      });
      return response;
    } catch (error) {
      console.error("Forget Password API error:", error);
      throw error;
    }
  },
  async resetPassword(token, password) {
    try {
      const response = await AxiosInstance.post("/auth/reset-password", {
        token: token,
        newPassword: password,
      });
      return response;
    } catch (error) {
      console.error("Reset Password API error:", error);
      throw error;
    }
  },
  async getUserDetails(token) {
    try {
      const response = await AxiosInstance.get("/user", {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.error("User Details API error:", error);
      throw error;
    }
  },
  async changePassword(oldPassword, newPassword, token) {
    try {
      const response = await AxiosInstance.post(
        "/auth/change-password",
        { oldPassword: oldPassword, password: newPassword },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Change Password Details API error:", error);
      throw error;
    }
  },
  async getAllUserDetails(token) {
    try {
      const response = await AxiosInstance.get("/user/get-all-users", {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.error("All User Details API error:", error);
      throw error;
    }
  },
  async updateUserProfile(token, payload) {
    try {
      const response = await AxiosInstance.patch(
        "/user/update",
        { ...payload },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("All User Details API error:", error);
      throw error;
    }
  },
  async getAllRoles() {
    try {
      const response = await AxiosInstance.patch("/user/roles");
      return response;
    } catch (error) {
      console.error("All User Details API error:", error);
      throw error;
    }
  },
  async createCampus(token, requestObject) {
    console.log("pauload", requestObject);
    try {
      const response = await AxiosInstance.post(
        "/campus/create",
        { ...requestObject },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Change Password Details API error:", error);
      throw error;
    }
  },
  async deactivateUser(
    token,
    userId,
    isActivateKey,
    reAssignStudents,
    reAssignTo
  ) {
    try {
      const response = await AxiosInstance.patch(
        "/user/change-user-status",
        {
          userId: userId,
          isActivate: isActivateKey == "Deactivate" ? false : true,
          reAssignStudents: reAssignStudents,
          ...(reAssignStudents && { reAssignTo }),
        },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Deactivate User API error:", error);
      throw error;
    }
  },
  async getUserById(token, id) {
    try {
      const response = await AxiosInstance.get(`/user/get-user/${id}`, {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Get User API error:", error);
      throw error;
    }
  },
  async editUser(token, payload) {
    try {
      const response = await AxiosInstance.patch(
        "/user/edit-user",
        { ...payload },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("User update by admin API error:", error);
      throw error;
    }
  },
  async getAllCampus(token) {
    try {
      const response = await AxiosInstance.get(`/campus/get-all-campus`, {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Get all campus API error:", error);
      throw error;
    }
  },
  async deactivateCampus(token, campusId, isActivateKey) {
    try {
      const response = await AxiosInstance.patch(
        "/campus/update-status",
        {
          campusId: campusId,
          isActivate: isActivateKey == "Deactivate" ? false : true,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Deactivate campus API error:", error);
      throw error;
    }
  },
  async getCampusById(token, id) {
    try {
      const response = await AxiosInstance.get(`/campus/get-campus/${id}`, {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Get campus API error:", error);
      throw error;
    }
  },
  async updateCampus(token, payload) {
    try {
      const response = await AxiosInstance.patch(
        "/campus/update",
        { ...payload },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Campus update by superadmnin API error:", error);
      throw error;
    }
  },
  async loggedInAsAdmin(token, id) {
    try {
      const response = await AxiosInstance.post(
        "/auth/login-as-admin",
        { campusId: id },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Campus update by superadmnin API error:", error);
      throw error;
    }
  },
  // ML APIS
  async getListModels(token) {
    try {
      const response = await AxiosInstance.get(`model/get-list`, {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Get campus API error:", error);
      throw error;
    }
  },
  async deleteModel(token, modelId) {
    try {
      const response = await AxiosInstance.delete("/model/delete", {
        headers: {
          token: token,
        },
        data: { modelId: modelId },
      });
      return response;
    } catch (error) {
      console.error("Delete model API error:", error);
      throw error;
    }
  },
  async trainModel(token, formdata) {
    try {
      const response = await AxiosInstance.post("/model/upload", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Delete model API error:", error);
      throw error;
    }
  },
  async markAsDefaultModel(token, modelId) {
    try {
      const response = await AxiosInstance.patch(
        "/model/set-default",
        { modelId: modelId },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Mark as default model API error:", error);
      throw error;
    }
  },
  async getArchivedListModels(token) {
    try {
      const response = await AxiosInstance.get(`model/archived-models`, {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Get archived model list API error:", error);
      throw error;
    }
  },
  async restoreArchivedModel(token, modelId) {
    try {
      const response = await AxiosInstance.post(
        "/model/restore",
        { modelId: modelId },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Restore model API error:", error);
      throw error;
    }
  },

  //User API
  async getDepartmentByRole(token, roleId) {
    try {
      const response = await AxiosInstance.get(
        `/user/get-department-by-role/${roleId}`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("data", response);
      return response;
    } catch (error) {
      console.error("Get department by role API error:", error);
      throw error;
    }
  },
  async createUser(token, requestObject) {
    try {
      const response = await AxiosInstance.post(
        "/user/create-user",
        { ...requestObject },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Create user API error:", error);
      throw error;
    }
  },
  async deleteUser(token, userId, reAssignStudents, reAssignTo) {
    try {
      const response = await AxiosInstance.delete("/user/delete-user", {
        headers: {
          token: token,
        },
        data: {
          userId: userId,
          reAssignStudents: reAssignStudents,
          ...(reAssignStudents && { reAssignTo }),
        },
      });
      return response;
    } catch (error) {
      console.error("Delete user API error:", error);
      throw error;
    }
  },
  async isValidToken(token) {
    try {
      const response = await AxiosInstance.post("/auth/is-valid-token", {
        token: token,
      });
      return response;
    } catch (error) {
      console.error("is valid token API error:", error);
      throw error;
    }
  },
  async getMajorList(token) {
    try {
      const response = await AxiosInstance.get(`/major`, {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.error("get major list API error:", error);
      throw error;
    }
  },
  async getFilteredStudentsList(token, payload) {
    try {
      const response = await AxiosInstance.get(`/students`, {
        headers: {
          token: token,
        },
        params: payload,
      });
      return response;
    } catch (error) {
      console.error("get student list API error:", error);
      throw error;
    }
  },

  async getSingleStudentDetailsByID(token, id) {
    try {
      const response = await AxiosInstance.get(`/students/${id}`, {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.log("Get student details by id API error:", error);
      throw error;
    }
  },

  async createUniversity(token, requestObject) {
    try {
      const response = await AxiosInstance.post(
        "/university/create",
        { ...requestObject },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Create university API error:", error);
      throw error;
    }
  },
  async getAllUniversity(token) {
    try {
      const response = await AxiosInstance.get(`/university`, {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Get all university API error:", error);
      throw error;
    }
  },
  async getUniversityById(token, id) {
    try {
      const response = await AxiosInstance.get(`/university/${id}`, {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Get university by id API error:", error);
      throw error;
    }
  },
  async updateUniversity(token, payload) {
    try {
      const response = await AxiosInstance.patch(
        "/university/update",
        { ...payload },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("University update by superadmnin API error:", error);
      throw error;
    }
  },
  async deactivateUniversity(token, universityId, isActivateKey) {
    try {
      const response = await AxiosInstance.patch(
        "/university/update-status",
        {
          id: universityId,
          isActivated: isActivateKey == "Deactivate" ? false : true,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Deactivate campus API error:", error);
      throw error;
    }
  },
  async assignStudentsToManager(token, managerId, studentIds) {
    try {
      const response = await AxiosInstance.post(
        "/user/assign-students",
        { managerId: managerId, students: studentIds },
        {
          headers: {
            token: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Assign students to user API error:", error);
      throw error;
    }
  },
  async getDemographicDetails(token, selectYear) {
    try {
      const response = await AxiosInstance.get(`/students/demographics/?passFailType=${selectYear}`,

        {
          headers: {
            token: token,
          },
        });
      return response;
    } catch (error) {
      console.error("Get demographic details API error:", error);
      throw error;
    }
  },

  async getEnrolledStudentsDetails(token, page, size, search, financing, ethnicity, unassignedStudents = false, queryParams, isCarelist=false, riskFilter) {
    try {
      const params = new URLSearchParams({
        page: page && page,
        size: size && size,
        ...(search && { search }),
        ...(financing && { financing }),
        ...(ethnicity && { ethnicity }),
        ...(unassignedStudents && { unassignedStudents: unassignedStudents}),
        ...(queryParams),
        ...isCarelist && {carelist:isCarelist},
        ...(riskFilter && {riskLevel: riskFilter}),  
      });
      const response = await AxiosInstance.get(`/students/?${params.toString()}`, {
        headers: {
          token: token,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Get Enrolled Students details API error:", error);
      throw error;
    }
  },
  async getAllUniversitiesCampus(token) {
    console.log("token", token);
    try {
      const response = await AxiosInstance.get(`/campus/get-universities-campuses`, {
        headers: {
          token: token,
        },
      });
      console.log("data", response);
      return response;
    } catch (error) {
      console.error("Search Students API error:", error);
      throw error;
    }
  },
  async getCampusData(token, campusId) {
    try {
      localStorage.setItem("campusId", campusId);
      const response = await AxiosInstance.get(`/campus/switch/${campusId}`, {
        headers: {
          token: token,
        },
      });
      console.log("data", response);
      return response;
    } catch (error) {
      console.error("Get Campus Name API error:", error);
      throw error;
    }
  },
  async getRiskedStudents(token, page, size, search) {
    try {
      const params = new URLSearchParams({
        page: page && page,
        size: size && size,
        ...(search && { search }),
      });
      const response = await AxiosInstance.get(`/students/risk-students/?${params.toString()}`, {
        headers: {
          token: token,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Get Risked Students API error:", error);
      throw error;
    }
  },

  async sendEmail(token, emails, message, subject, file) {
    try {
      const formData = new FormData();

      emails.forEach(element => {
        formData.append("emails[]", element);
      });


      formData.append("message", message);
      formData.append("subject", subject);

      if (file) {
        file.forEach((file) => {
          formData.append("attachments", file);
        })
      }
      const response = await AxiosInstance.post(`/students/send-risk-mail`,
        formData,
        {
          headers: {
            token: token,
          }
        },
      );
      return response;
    } catch (error) {
      console.error("Send Email API error:", error);
      throw error;
    }
  },
  async getDraft(token, type) {
    try {
      const response = await AxiosInstance.get(`/students/drafts/?type=${type}`,
        {
          headers: {
            token: token,
          }
        },
      );
      return response;
    } catch (error) {
      console.error("Send Email API error:", error);
      throw error;
    }
  },

  async updateDraft(token, type, message, subject, id) {

    console.log(type, id)

    const payload = {
      message: message,
      subject: subject,
    }
    if (!id) {
      payload.type = type;
    }
    else {
      payload.id = id;
    }
    try {
      const response = await AxiosInstance.patch(`/students/save-draft`,
        payload,
        {
          headers: {
            token: token,
          }
        },
      );
      return response;
    } catch (error) {
      console.error("Send Email API error:", error);
    }
  },
  async addStudentsToCarelist(token, studentIds) {
    const payload = {
     students: studentIds
    }
    try {
      const response = await AxiosInstance.post(`/students/add-carelist`,
        payload,
        {
          headers: {
            token: token,
          }
        },
      );
      return response;
    } catch (error) {
      console.error("Send Email API error:", error);
    }
  },
  async showCareList(token, page, size,search) {
    try {
      const params = new URLSearchParams({
        page: page && page,
        size: size && size,
        ...(search && { search }),
      });
      const response = await AxiosInstance.get(`/students/show-carelist/?${params.toString()}`, {
        headers: {
          token: token,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Send Email API error:", error);
    }
  },

  async undoCareList(token, studentIds) {
    const payload = {
      students: studentIds
    }
    try {
      const response = await AxiosInstance.post(`/students/undo-carelist`,
        payload,
        {
          headers: {
            token: token,
          }
        },
      );
      return response;
    } catch (error) {
      console.error("Send Email API error:", error);
    }
  },

  async getOtherStudentsData(token){
    try {
      const response = await AxiosInstance.get(`students/country-demographics`, {
        headers: {
          token: token,
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Get other students data API error:", error);
      throw error;
    }
  },
  async getAllRecommendations(token){
    try {
      const response = await AxiosInstance.get(`/recommendation`, {
        headers: {
          token: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Get all recommendations API error:", error);
      throw error;
    }
  },
};
