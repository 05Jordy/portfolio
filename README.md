# Portfolio professionnel — Jordy Gasso

Site vitrine Full Stack (V1) : React + Vite côté frontend, Node.js / Express + PostgreSQL côté
backend. Identité visuelle sombre, moderne et technique, responsive et accessible au clavier.

Conforme au cahier des charges « Portfolio professionnel de développeur » v1.0.

## Publication en ligne (GitHub Pages)

- **Site** : https://05jordy.github.io/portfolio/
- **Dépôt** : https://github.com/05Jordy/portfolio
- Déploiement automatique via GitHub Actions (`.github/workflows/deploy.yml`) : à chaque
  push sur `main`, le workflow lint, build et publie `client/dist/` sur GitHub Pages.
- Pages doit rester configuré : **Settings → Pages → Source : GitHub Actions**.
- Seul le front est publié ici : l'API `/api/` n'est pas hébergée sur Pages, le formulaire de
  contact affiche donc un message d'erreur en ligne (backend prévu pour Ubuntu Server).

## Structure

```
portfolio/
├── client/            Frontend React + Vite
│   └── src/
│       ├── components/  Navbar, Footer, ProjectCard, Reveal
│       ├── data/        profile.js, skills.js, projects.js (contenu éditable)
│       ├── pages/       Home, About, Skills, Projects, Contact
│       └── styles/      global.css (design system)
├── server/            Backend Express
│   ├── src/
│   │   ├── routes/      health.js, contact.js
│   │   ├── db.js        Pool PostgreSQL
│   │   ├── validate.js  Validation serveur
│   │   └── index.js     Point d'entrée
│   ├── sql/init.sql     Schéma de la base
│   └── .env             Secrets (NON versionné)
└── README.md
```

## Prérequis

- Node.js ≥ 20
- PostgreSQL ≥ 14 (ici testé sur 18)
- Git

## Installation

### 1. Base de données

```bash
psql -U postgres -h localhost
```

```sql
CREATE DATABASE portfolio_db;
CREATE USER portfolio_user WITH PASSWORD 'VOTRE_MOT_DE_PASSE';
GRANT CONNECT ON DATABASE portfolio_db TO portfolio_user;
```

Puis exécuter le schéma :

```bash
psql -U postgres -h localhost -d portfolio_db -f server/sql/init.sql
```

### 2. Backend

```bash
cd server
cp .env.example .env      # puis renseigner DATABASE_URL, PORT, CORS_ORIGIN
npm install
npm run dev               # API sur http://localhost:3001
```

### 3. Frontend

```bash
cd client
npm install
npm run dev               # Site sur http://localhost:5173
```

En développement, Vite proxy `/api` vers `http://localhost:3001` (voir `client/vite.config.js`).

## API

| Méthode | Route          | Usage                                            |
| ------- | -------------- | ------------------------------------------------ |
| GET     | `/api/health`  | Vérifier que l'API et la base répondent          |
| POST    | `/api/contact` | Valider et enregistrer un message de contact     |

Exemple :

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Prénom Nom","email":"vous@example.com","subject":"Bonjour","message":"Message d'au moins 10 caractères."}'
```

Réponses : `201 {ok:true,id}` · `400 {ok:false,fields}` · `429` (limite de fréquence) · `500`.

## Tests effectués (V1)

- `GET /api/health` → `200` avec base `up`.
- `POST /api/contact` invalide → `400` + champs en erreur.
- `POST /api/contact` valide → `201`, ligne insérée dans `contact_messages`.
- Champ piège (honeypot) rempli → `201` silencieux, **aucune** insertion.
- Limite : 5 messages / 15 minutes / IP.
- `npm run lint` et `npm run build` du client sans erreur ni warning.
- Responsive : navigation burger sous 860px, grilles fluides.

## Déploiement (Ubuntu Server)

1. Cloner le dépôt sur le serveur, installer Node et PostgreSQL.
2. Créer la base et l'utilisateur (cf. plus haut), remplir `server/.env`
   (`PORT`, `DATABASE_URL`, `CORS_ORIGIN=https://votre-domaine`).
3. `npm ci` puis `npm run build` dans `client/`, copier `client/dist/` dans `/var/www/portfolio`.
4. Backend en arrière-plan : **PM2** (`pm2 start server/src/index.js --name portfolio-api`)
   ou **systemd** (service avec `Restart=always`).
5. **Nginx** : servir `client/dist/` (avec `try_files $uri /index.html;` pour le routage SPA)
   et proxyer `/api/` vers `http://127.0.0.1:3001`.
6. HTTPS : certificat Let's Encrypt (ou Cloudflare Tunnel / tunnel HTTPS temporaire pour les
   tests publics sans accès au routeur — l'URL d'un Quick Tunnel peut changer).

## Sécurité

- Requêtes SQL **paramétrées** uniquement (aucune concaténation).
- Validation stricte côté navigateur **et** côté serveur (longueurs, format e-mail).
- Limite de fréquence (`express-rate-limit`) + honeypot anti-spam.
- `helmet` pour les en-têtes HTTP, JSON body limité à 16 ko.
- Secrets uniquement dans `server/.env` (ignoré par Git, `.env.example` fourni).
- PostgreSQL à écouter sur localhost et restreint par le pare-feu.

## Contenu éditable (sans toucher au code applicatif)

- `client/src/data/profile.js` — nom, titre, e-mail, texte « À propos ».
- `client/src/data/skills.js` — compétences par catégorie et niveau.
- `client/src/data/projects.js` — fiches de projets.

## Limites connues (V1)

- Pas encore d'interface d'administration (CMS) : projets éditables dans le code uniquement.
- Projets stockés en données locales, pas encore en base de données.
- Pas de tests automatisés ni de CI/CD.
- Le serveur personnel dépend de l'électricité, de la connexion et du matériel ; pas de nom de
  domaine dans le périmètre initial.
- Aucun contenu de projet inventé : les fiches `projects.js` sont à compléter avec vos vraies
  réalisations.

## Évolutions prévues (après V1)

- Administration sécurisée pour gérer les projets.
- Projets en base de données avec filtres par technologie.
- SEO, métadonnées sociales, favicon et aperçu de partage.
- Tests automatisés, intégration continue, supervision et sauvegardes.
