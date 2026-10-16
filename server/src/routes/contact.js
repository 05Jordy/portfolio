import { Router } from "express";
import rateLimit from "express-rate-limit";
import { pool } from "../db.js";
import { validateContact } from "../validate.js";

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    ok: false,
    error: "Trop de messages envoyés. Réessayez dans quelques minutes.",
  },
});

export const contactRouter = Router();

contactRouter.post("/contact", contactLimiter, async (req, res) => {
  const result = validateContact(req.body ?? {});

  if (!result.ok) {
    return res.status(400).json({
      ok: false,
      error: "Certaines informations sont invalides.",
      fields: result.fields,
    });
  }

  const { name, email, subject, message, website } = result.data;

  if (website) {
    return res.status(201).json({ ok: true });
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING id, created_at",
      [name, email, subject || null, message]
    );
    return res.status(201).json({ ok: true, id: rows[0].id });
  } catch (err) {
    console.error("Erreur INSERT contact :", err.message);
    return res.status(500).json({
      ok: false,
      error: "Impossible d'enregistrer le message pour le moment.",
    });
  }
});
