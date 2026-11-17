import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import AboutPage from "./Components/Pages/AboutPage";
import HomePage from "./Components/Pages/HomePage";
import ProjectDetailPage from "./Components/Pages/ProjectDetailPage";
import ProjectsPage from "./Components/Pages/ProjectsPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function App() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main key={pathname} className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
