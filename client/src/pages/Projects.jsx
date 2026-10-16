import { projects } from "../data/projects.js";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";

export default function Projects() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-kicker">Projets</span>
          <h1 className="section-title">Réalisations</h1>
          <p className="section-intro">
            Pour chaque projet : l'objectif visé, les fonctionnalités principales, les
            technologies employées, mon rôle précis et les limites connues.
          </p>
        </Reveal>

        {projects.length > 0 ? (
          <div className="grid-2">
            {projects.map((project, index) => (
              <Reveal key={project.name} delay={index * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>
              Les fiches de projets sont en cours de rédaction. Revenez bientôt, ou{" "}
              <a href="mailto:jordygasso@gmail.com">écrivez-moi directement</a> pour en savoir
              plus sur mes réalisations.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
