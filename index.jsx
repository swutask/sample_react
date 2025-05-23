import { useEffect } from "react";
import { useLocation, Routes as BrowserRouter, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout";
import HomePage from "@/pages/home";
import CareListPage from "@/pages/carelist";
import Reports from "@/pages/reports";
import Inbox from "@/pages/inbox";
import CourseDetailPage from "@/pages/coursedetail";
import CreateReport from "@/pages/reports/new";
import CampusPage from "@/pages/campus";
import SettingPage from "@/pages/settings";
import StudentProfile from "@/pages/studentprofile";
import PlansBillingPage from "@/pages/plansbilling";
import GpaAnalysisPage from "@/pages/gpa-analysis";
import AveragePerformancePage from "@/pages/average-performance";
import AllCoursePage from "@/pages/all-courses";
import OtherStudentPage from "@/pages/other-students";
import EthnicityDistribution from "@/pages/ethnicity-distribution";
import Financing from "@/pages/financing";
import AddStudentPage from "@/pages/add-students";
import FinancialAidCounsellingPage from "@/pages/financial-aid-counselling";
import RetakingStudentsPage from "@/pages/retaking-students";
import SpecialNeedsPage from "@/pages/special-needs";
import TypeStudyPage from "@/pages/type-study";
import FirstGenerationStudentPage from "@/pages/first-generation-student";
import IncomeGroupPage from "@/pages/income-group";
import AgeGroupPage from "@/pages/income-group/age";
import EnglishProficiencyPage from "@/pages/english-proficiency";
import AssignedRecommendation from "@/pages/assigned-recommendation";
import OverallSuccessRatePage from "@/pages/overall-success-rate";
import ModeCommunicationPage from "@/pages/mode-communication";
import SessionFrequencyPage from "@/pages/session-frequency";
import AdvisorOverviewPage from "@/pages/advisor-overview";
import AssignedStudentPage from "@/pages/advisor-overview/pageOne";
import EmptyPage from "@/pages/advisor-overview/pageTwo";
import ManageStudentsPage from "@/pages/manage-students";
import Login from "@/pages/authenticatioon/login";
import ForgotPassword from "@/pages/authenticatioon/forgotPassword";
import ResetPassword from "@/pages/authenticatioon/resetPassword";
import NewPassword from "@/pages/authenticatioon/newPassword";
import PasswordReset from "@/pages/authenticatioon/finishNewPassword";
import ManageCampusPage from "@/pages/manage-campus";
import ModalTrainingPage from "@/pages/modal-training";
import ProtectedRoute from "../utils/protectedRoutes";
import SuperAdminWelcome from "@/pages/SuperadminWelcome/SuperAdminWelcome";
import ManageUniversityPage from "@/pages/manage-university";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 50);
  }, [pathname]);
  return null;
};

const Routes = () => {
  const location = useLocation();
  const onboardingPage = ['/', '/forgot-password', '/reset-password', '/new-password/:token', '/finish-reset-password'];
  const jwtPattern = /^\/new-password\/([A-Za-z0-9-_]+)\.([A-Za-z0-9-_]+)\.([A-Za-z0-9-_]+)$/;

  const isOnboardingPage = onboardingPage.includes(location.pathname) || jwtPattern.test(location.pathname);

  const hideComponents = isOnboardingPage ? false : true;

  const isAuthenticated = localStorage.getItem('authToken');
  const campusId = localStorage.getItem('campusId');
  const currentUserRole = localStorage.getItem('roleId');

  const onboardingRoutes = [
    { path: "/", element: isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "/new-password/:token", element: <NewPassword /> },
    { path: "/finish-reset-password", element: <PasswordReset /> },
  ];

  const superAdminRoutes = [
    { path: "/dashboard", element: <SuperAdminWelcome /> },
    { path: "/manage-campus", element: <ManageCampusPage /> },
    { path: "/manage-university", element: <ManageUniversityPage /> },
    { path: "/settings", element: <SettingPage /> },
  ];

  const userRoutes = [
    { path: "/dashboard", element: <HomePage /> },
    { path: "/care-list", element: <CareListPage /> },
    { path: "/reports", element: <Reports /> },
    { path: "/reports/create", element: <CreateReport /> },
    { path: "/inbox", element: <Inbox /> },
    { path: "/course-detail", element: <CourseDetailPage /> },
    { path: "/campus", element: <CampusPage /> },
    { path: `/student-profile/:id`, element: <StudentProfile /> },
    { path: "/settings", element: <SettingPage /> },
    { path: "/plans-billing", element: <PlansBillingPage /> },
    { path: "/gpa-analysis", element: <GpaAnalysisPage /> },
    { path: "/average-performance", element: <AveragePerformancePage /> },
    { path: "/total-courses", element: <AllCoursePage /> },
    { path: "/other-students", element: <OtherStudentPage /> },
    { path: "/financing", element: <Financing /> },
    { path: "/ethnicity-distribution", element: <EthnicityDistribution /> },
    { path: "/care-list/add", element: <AddStudentPage /> },
    { path: "/financial-aid-counselling", element: <FinancialAidCounsellingPage /> },
    { path: "/retaking-students", element: <RetakingStudentsPage /> },
    { path: "/special-needs", element: <SpecialNeedsPage /> },
    { path: "/type-study", element: <TypeStudyPage /> },
    { path: "/first-generation-student", element: <FirstGenerationStudentPage /> },
    { path: "/income-group", element: <IncomeGroupPage /> },
    { path: "/age-group", element: <AgeGroupPage /> },
    { path: "/english-proficiency", element: <EnglishProficiencyPage /> },
    { path: "/assigned-recommendation", element: <AssignedRecommendation /> },
    { path: "/overall-success-rate", element: <OverallSuccessRatePage /> },
    { path: "/mode-communication", element: <ModeCommunicationPage /> },
    { path: "/session-frequency", element: <SessionFrequencyPage /> },
    { path: "/advisor-overview", element: <AdvisorOverviewPage /> },
    { path: "/total-assigned-students", element: <AssignedStudentPage /> },
    { path: "/manage-students", element: <ManageStudentsPage /> },
    { path: "/model-training", element: ((currentUserRole == 1 && campusId ) || currentUserRole == 2) && <ModalTrainingPage /> },
    { path: "/empty", element: <EmptyPage /> },
  ];


  return (
    <>
      <ScrollToTop />
      <BrowserRouter>
        <Route
          path="/"
          element={<MainLayout hideComponents={hideComponents} />}
        >

          {onboardingRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {currentUserRole == 1 && !campusId ? (
            superAdminRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<ProtectedRoute>{route.element}</ProtectedRoute>}
              />
            ))
          ) : (
            userRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<ProtectedRoute>{route.element}</ProtectedRoute>}
              />
            ))
          )}

          <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Route>
      </BrowserRouter>
    </>
  );
};

export default Routes;
