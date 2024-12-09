import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/auth/login";
import RegisterPage from "@/auth/register";

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
    </Routes>
  );
}

export default App;
