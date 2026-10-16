import { Link } from "react-router-dom";
import { profile } from "../data/profile.js";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {year} {profile.name} — {profile.title}
        </p>
        <nav aria-label="Navigation de pied de page">
          <ul className="footer-links">
            <li>
              <Link to="/projets">Projets</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
