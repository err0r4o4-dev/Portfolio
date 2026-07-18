import { useLanguage } from "../language";
import "../styles/Footer.css";

export default function Footer() {
  const { language } = useLanguage();
  const description = language === "th"
    ? "นักศึกษาวิศวกรรมคอมพิวเตอร์และนักพัฒนาซอฟต์แวร์"
    : "Computer Engineering student & software developer.";

  return (
    <footer className="Footer">
      <div className="Footer-container">
        <a className="Footer-brand" href="#home">Thirawat Duangta <span>↟</span></a>
        <p>{description}</p>
        <div className="Footer-bottom">
          <span>© 2026 Thirawat Duangta</span>
          <a href="mailto:title.thirawat.dev@gmail.com">{language === "th" ? "อีเมล" : "Email"}</a>
          <a href="https://github.com/err0r4o4-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
