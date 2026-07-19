import { useCallback, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import SiteIntro from "./components/SiteIntro.tsx";
import Home from "./screens/Home.tsx";

export default function App() {
  const [isIntroVisible, setIsIntroVisible] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const completeIntro = useCallback(() => setIsIntroVisible(false), []);

  return (
    <>
      {isIntroVisible && <SiteIntro onComplete={completeIntro} />}
      <div inert={isIntroVisible ? true : undefined} aria-hidden={isIntroVisible || undefined}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} /> */}
        </Routes>
        <Footer />
      </div>
    </>
  )
}
