export default function CertificationCard({ certification }) {
  const { name, issuer, url, details = [] } = certification;

  return (
    <article className="card cert-card">
      <span className="badge badge-accent">{issuer}</span>
      <h3 className="card-title">{name}</h3>
      <p className="card-text">Cursus suivi et terminé sur {issuer}.</p>
      {details.length > 0 && (
        <div className="project-stack">
          {details.map((detail) => (
            <span key={detail} className="badge">
              {detail}
            </span>
          ))}
        </div>
      )}
      {url && (
        <a href={url} target="_blank" rel="noreferrer noopener">
          Voir le post LinkedIn →
        </a>
      )}
    </article>
  );
}
