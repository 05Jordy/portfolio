export default function ProjectCard({ project }) {
  const { name, goal, features = [], stack = [], role, limits = [], demo, repo } = project;

  return (
    <article className="project-card">
      <div>
        <h3>{name}</h3>
        <p className="project-goal">{goal}</p>
      </div>

      {features.length > 0 && (
        <div>
          <strong style={{ fontSize: "0.9rem" }}>Fonctionnalités principales</strong>
          <ul className="project-features">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="project-meta">
        {role && (
          <p>
            <strong>Mon rôle :</strong> {role}
          </p>
        )}
        {limits.length > 0 && (
          <p>
            <strong>Limites connues :</strong> {limits.join(" · ")}
          </p>
        )}
      </div>

      <div className="project-stack">
        {stack.map((tech) => (
          <span key={tech} className="badge badge-accent">
            {tech}
          </span>
        ))}
      </div>

      {(demo || repo) && (
        <div className="project-links">
          {demo && (
            <a className="btn btn-ghost" href={demo} target="_blank" rel="noreferrer noopener">
              Voir la démo
            </a>
          )}
          {repo && (
            <a className="btn btn-ghost" href={repo} target="_blank" rel="noreferrer noopener">
              Code source
            </a>
          )}
        </div>
      )}
    </article>
  );
}
