import { useLanguage } from "../language";
import "../styles/Footer.css";

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="Footer">
      <div className="Footer-container">
        <div className="Footer-bottom">
          <span>© 2026 Thirawat Duangta</span>
          <a href="mailto:title.thirawat.dev@gmail.com">{language === "th" ? "อีเมล" : "Email"}</a>
          <a href="https://github.com/err0r4o4-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
