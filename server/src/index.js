import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { healthRouter } from "./routes/health.js";
import { contactRouter } from "./routes/contact.js";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : true,
  })
);
app.use(express.json({ limit: "16kb" }));

app.use("/api", healthRouter);
app.use("/api", contactRouter);

app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Route introuvable." });
});

app.use((err, req, res, next) => {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ ok: false, error: "Corps JSON invalide." });
  }
  console.error(err);
  return res.status(500).json({ ok: false, error: "Erreur interne du serveur." });
});

const port = Number(process.env.PORT) || 3001;

app.listen(port, () => {
  console.log(`API démarrée sur http://localhost:${port}`);
});
