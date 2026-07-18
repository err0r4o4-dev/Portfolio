import { Routes, Route  } from "react-router-dom";
import Home from "./screens/Home.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} /> */}
        </Routes>
    )
}