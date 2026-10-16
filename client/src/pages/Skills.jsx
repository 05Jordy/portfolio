import { Link } from "react-router-dom";
import { skillCategories, certifications } from "../data/skills.js";
import CertificationCard from "../components/CertificationCard.jsx";
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
            j'apprends encore, « Formation complétée » pour les cursus terminés.
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
            <span className="section-kicker">Formation</span>
            <h2 className="section-title">Cursus validés</h2>
            <p className="section-intro">
              Deux cursus LinkedIn Learning terminés, chacun confirmé par un post public
              vérifiable.
            </p>
          </Reveal>
          <div className="grid-2">
            {certifications.map((certification, index) => (
              <Reveal key={certification.name} delay={index * 80}>
                <CertificationCard certification={certification} />
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
