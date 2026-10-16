import { useState } from "react";
import { profile } from "../data/profile.js";
import Reveal from "../components/Reveal.jsx";

const LIMITS = {
  name: 100,
  email: 255,
  subject: 200,
  message: 5000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form) {
  const errors = {};

  if (form.name.trim().length < 2 || form.name.length > LIMITS.name) {
    errors.name = "Indiquez votre nom (2 caractères minimum).";
  }
  if (!EMAIL_RE.test(form.email.trim()) || form.email.length > LIMITS.email) {
    errors.email = "Indiquez une adresse e-mail valide.";
  }
  if (form.subject.length > LIMITS.subject) {
    errors.subject = `L'objet ne doit pas dépasser ${LIMITS.subject} caractères.`;
  }
  if (form.message.trim().length < 10 || form.message.length > LIMITS.message) {
    errors.message = `Le message doit contenir entre 10 et ${LIMITS.message} caractères.`;
  }

  return errors;
}

const initialForm = { name: "", email: "", subject: "", message: "", website: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const clientErrors = validate(form);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus({ state: "error", message: "Corrigez les champs signalés." });
      return;
    }

    setErrors({});
    setStatus({ state: "sending", message: "Envoi en cours…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setForm(initialForm);
        setStatus({
          state: "success",
          message: "Merci, votre message a bien été envoyé. Je vous répondrai rapidement.",
        });
        return;
      }

      if (response.status === 400 && data.fields) {
        setErrors(data.fields);
        setStatus({ state: "error", message: data.error ?? "Formulaire invalide." });
        return;
      }

      setStatus({
        state: "error",
        message: data.error ?? "L'envoi a échoué. Réessayez dans quelques instants.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "Impossible de joindre le serveur. Vérifiez votre connexion.",
      });
    }
  }

  const sending = status.state === "sending";

  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-kicker">Contact</span>
          <h1 className="section-title">Prenons contact</h1>
          <p className="section-intro">
            Recrutement, mission freelance ou collaboration : décrivez votre besoin, je vous
            réponds rapidement.
          </p>
        </Reveal>

        <div className="grid-2">
          <Reveal className="card">
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="contact-name">Nom</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={LIMITS.name}
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={errors.name ? "error-name" : undefined}
                />
                {errors.name && (
                  <span className="field-error" id="error-name">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-email">Adresse e-mail</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={LIMITS.email}
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={errors.email ? "error-email" : undefined}
                />
                {errors.email && (
                  <span className="field-error" id="error-email">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-subject">
                  Objet <span className="optional">(facultatif)</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  maxLength={LIMITS.subject}
                  value={form.subject}
                  onChange={handleChange}
                  aria-invalid={errors.subject ? "true" : undefined}
                  aria-describedby={errors.subject ? "error-subject" : undefined}
                />
                {errors.subject && (
                  <span className="field-error" id="error-subject">
                    {errors.subject}
                  </span>
                )}
              </div>

              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  minLength={10}
                  maxLength={LIMITS.message}
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={errors.message ? "true" : undefined}
                  aria-describedby={errors.message ? "error-message" : undefined}
                />
                {errors.message && (
                  <span className="field-error" id="error-message">
                    {errors.message}
                  </span>
                )}
              </div>

              <div className="hp-field" aria-hidden="true">
                <label htmlFor="contact-website">Site web</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>

              <div aria-live="polite">
                {status.message && (
                  <p
                    className={`form-status ${
                      status.state === "success"
                        ? "is-success"
                        : status.state === "sending"
                          ? ""
                          : "is-error"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </div>

              <div>
                <button className="btn btn-primary" type="submit" disabled={sending}>
                  {sending ? "Envoi…" : "Envoyer le message"}
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal delay={90} className="contact-aside">
            <div className="card">
              <h2 className="card-title">Coordonnées directes</h2>
              <p className="contact-line">
                <span className="badge badge-accent">E-mail</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
              <p className="contact-line" style={{ marginTop: "12px" }}>
                <span className="badge badge-accent">Disponibilité</span>
                {profile.location}
              </p>
            </div>
            <div className="card">
              <h2 className="card-title">À quoi sert ce formulaire ?</h2>
              <p className="card-text">
                Vos messages sont enregistrés dans une base PostgreSQL et traités uniquement pour
                vous répondre. Aucune donnée n'est partagée avec des tiers.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
