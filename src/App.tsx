import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/auth/login";
import RegisterPage from "@/auth/register";
import DashboardPage from "@/pages/AdminPage/dashboard.page";
import AdminDashboard from "@/pages/AdminPage/admin.dashboard";
import AddNewStudent from "@/pages/AdminPage/student/AddNewStudent";
import ViewStudentPage from "@/pages/AdminPage/student/ViewAllStudent";
import ViewTeacherPage from "@/pages/AdminPage/teacher/ViewAllTeacher";
import AddNewTeacher from "@/pages/AdminPage/teacher/AddNewTeacher";
import TeacherAction from "@/pages/AdminPage/teacher/TeacherAction";
import StudentAction from "@/pages/AdminPage/student/StudentAction";
import AddNewQuiz from "@/pages/AdminPage/quiz/AddNewQuiz";
import ViewAllQuiz from "@/pages/AdminPage/quiz/ViewAllQuiz";
import EditQuiz from "@/pages/AdminPage/quiz/EditQuiz";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/">
        <Route element={<HomePage />} path="home" />
        <Route element={<LoginPage />} path="login" />
        <Route element={<RegisterPage />} path="register" />
      </Route>

      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />


      <Route element={<DashboardPage />} path="/dashboard" >
        <Route element={<AdminDashboard />} path="admin" />
        <Route element={<ViewTeacherPage />} path="teacher/viewall" />
        <Route element={<AddNewTeacher />} path="addnewteacher" />
        <Route element={<TeacherAction />} path="teacher/action/:id/:action" />


        <Route element={<AddNewQuiz />} path="quiz/create" />
        <Route element={<ViewAllQuiz />} path="quiz/viewall" />
        <Route element={<EditQuiz />} path="quiz/edit/:id" />


        <Route element={<AddNewStudent />} path="addnewstudent" />
        <Route element={<ViewStudentPage />} path="student/viewall" />
        <Route element={<StudentAction />} path="student/action/:id/:action" />

      </Route>
    </Routes>
  );
}

export default App;
