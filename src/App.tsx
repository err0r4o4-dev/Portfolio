import { useCallback, useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import SiteIntro from "./components/SiteIntro.tsx";
import Home from "./screens/Home.tsx";

export default function App() {
  const [isIntroVisible, setIsIntroVisible] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const completeIntro = useCallback(() => {
    setIsIntroVisible(false);
    window.requestAnimationFrame(() => {
      document.getElementById("home")?.scrollIntoView();
    });
  }, []);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.history.replaceState(window.history.state, "", "#home");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isIntroVisible && <SiteIntro onComplete={completeIntro} />}
      <div
        className={`App-shell min-h-screen ${isIntroVisible ? "is-intro-active" : "is-ready"}`}
        inert={isIntroVisible ? true : undefined}
        aria-hidden={isIntroVisible || undefined}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} /> */}
        </Routes>
        <Footer />
      </div>
    </>
  )
}
