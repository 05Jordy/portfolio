import { Link } from "react-router-dom";
import { skillCategories, certifications } from "../data/skills.js";
import Reveal from "../components/Reveal.jsx";

export default function Skills() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-kicker">Compétences</span>
          <h1 className="section-title">Technologies que j'utilise</h1>
          <p className="section-intro">
            Classées par catégorie, avec une mention honnête : « Utilisé dans ce projet » pour ce
            que j'emploie réellement ici, « En cours d'approfondissement » pour ce que
            j'apprends encore.
          </p>
        </Reveal>

        <div className="grid-2">
          {skillCategories.map((category, index) => (
            <Reveal key={category.name} delay={index * 80} className="skill-group">
              <h3>{category.name}</h3>
              <ul className="skill-list">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <span
                      className={`badge ${skill.level.startsWith("Utilisé") ? "badge-accent" : ""}`}
                    >
                      {skill.level}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="subsection">
          <Reveal className="section-head">
            <span className="section-kicker">Certifications</span>
            <h2 className="section-title">Certifications obtenues</h2>
            <p className="section-intro">
              Validées sur LinkedIn, en complément de mes projets réalisés.
            </p>
          </Reveal>
          <div className="grid-2">
            {certifications.map((certification, index) => (
              <Reveal key={certification.name} delay={index * 80} className="card">
                <span className="badge badge-accent">{certification.issuer}</span>
                <h3 className="card-title" style={{ marginTop: "12px" }}>
                  {certification.name}
                </h3>
                {certification.url ? (
                  <a
                    className="card-text"
                    href={certification.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Vérifier la certification
                  </a>
                ) : (
                  <p className="card-text">Certification professionnelle {certification.issuer}</p>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120} className="hero-actions">
          <Link className="btn btn-primary" to="/projets">
            Voir ces compétences en action
          </Link>
          <Link className="btn btn-ghost" to="/contact">
            Me contacter
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
