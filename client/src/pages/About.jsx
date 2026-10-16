import { Link } from "react-router-dom";
import { profile } from "../data/profile.js";
import Reveal from "../components/Reveal.jsx";

export default function About() {
  return (
    <>
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-kicker">À propos</span>
            <h1 className="section-title">Qui je suis et comment je travaille</h1>
            <p className="section-intro">
              Un profil présenté sans artifice : ce que je fais réellement, la manière dont je
              travaille et ce que je cherche à construire.
            </p>
          </Reveal>

          <div className="grid-2">
            <Reveal className="card">
              <h2 className="card-title">Présentation</h2>
              {profile.about.map((paragraph) => (
                <p key={paragraph} className="card-text" style={{ marginBottom: "12px" }}>
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={90} className="card">
              <h2 className="card-title">Objectifs professionnels</h2>
              <ul className="list-check">
                {profile.goals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-kicker">Méthode</span>
            <h2 className="section-title">Ma façon de livrer un projet</h2>
            <p className="section-intro">
              De la compréhension du besoin jusqu'à la livraison, en passant par les tests.
            </p>
          </Reveal>

          <div className="steps">
            {profile.method.map((item, index) => (
              <Reveal key={item.step} delay={index * 80} className="step">
                <h3>{item.step}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="hero-actions">
            <Link className="btn btn-primary" to="/projets">
              Voir mes projets
            </Link>
            <Link className="btn btn-ghost" to="/contact">
              Me contacter
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
