const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 255 },
  subject: { max: 200 },
  message: { min: 10, max: 5000 },
};

function str(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(body) {
  const fields = {};
  const name = str(body.name);
  const email = str(body.email);
  const subject = str(body.subject);
  const message = str(body.message);
  const website = str(body.website);

  if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) {
    fields.name = `Le nom doit contenir entre ${LIMITS.name.min} et ${LIMITS.name.max} caractères.`;
  }
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email.max) {
    fields.email = "Adresse e-mail invalide.";
  }
  if (subject.length > LIMITS.subject.max) {
    fields.subject = `L'objet ne doit pas dépasser ${LIMITS.subject.max} caractères.`;
  }
  if (message.length < LIMITS.message.min || message.length > LIMITS.message.max) {
    fields.message = `Le message doit contenir entre ${LIMITS.message.min} et ${LIMITS.message.max} caractères.`;
  }

  const valid = Object.keys(fields).length === 0;
  return {
    ok: valid,
    fields,
    data: { name, email, subject, message, website },
  };
}
