import { Link } from "react-router-dom";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { certifications } from "../data/skills.js";
import ProjectCard from "../components/ProjectCard.jsx";
import CertificationCard from "../components/CertificationCard.jsx";
import Reveal from "../components/Reveal.jsx";

const highlights = [
  {
    title: "Interfaces claires",
    text: "Des pages rapides, lisibles et adaptées au mobile, sans effets qui freinent le chargement.",
  },
  {
    title: "API & données fiables",
    text: "Un backend Express avec validation côté serveur, requêtes SQL paramétrées et réponses JSON cohérentes.",
  },
  {
    title: "Mise en ligne soignée",
    text: "Git, Nginx, variables d'environnement et HTTPS : le projet est préparé pour un vrai déploiement.",
  },
];

export default function Home() {
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const shown = featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container">
          <Reveal>
            <h1 className="hero-title">
              {profile.name}
              <span className="accent">.</span>
            </h1>
            <p className="hero-subtitle">{profile.title}</p>
            <p className="hero-text">{profile.tagline}</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/projets">
                Voir mes projets
              </Link>
              <Link className="btn btn-ghost" to="/contact">
                Me contacter
              </Link>
            </div>
            <ul className="hero-meta">
              <li className="badge">React</li>
              <li className="badge">Node.js</li>
              <li className="badge">Express</li>
              <li className="badge">PostgreSQL</li>
              <li className="badge">Nginx / Ubuntu</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-kicker">Profil</span>
            <h2 className="section-title">Ce que j'apporte à un projet</h2>
            <p className="section-intro">
              Une vision complète du développement web, du composant React jusqu'à la base de
              données et le serveur.
            </p>
          </Reveal>
          <div className="grid-3">
            {highlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 90} className="card">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-kicker">Formation</span>
            <h2 className="section-title">Cursus validés</h2>
            <p className="section-intro">
              Formations LinkedIn Learning terminées et confirmées par des posts publics — Java et
              applications Android.
            </p>
          </Reveal>
          <div className="grid-2">
            {certifications.map((certification, index) => (
              <Reveal key={certification.name} delay={index * 90}>
                <CertificationCard certification={certification} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-kicker">Projets</span>
            <h2 className="section-title">Projets représentatifs</h2>
            <p className="section-intro">
              Contexte, fonctionnalités, technologies et rôle : chaque projet est présenté en
              toute transparence.
            </p>
          </Reveal>

          {shown.length > 0 ? (
            <div className="grid-3">
              {shown.map((project, index) => (
                <Reveal key={project.name} delay={index * 90}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Les fiches de projets seront publiées prochainement.</p>
            </div>
          )}

          <Reveal delay={120} className="hero-actions">
            <Link className="btn btn-ghost" to="/projets">
              Tous les projets
            </Link>
            <Link className="btn btn-primary" to="/contact">
              Discuter d'un besoin
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
