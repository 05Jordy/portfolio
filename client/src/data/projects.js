// Fiches projets — renseignées avec vos réalisations réelles.
// Aucune donnée inventée : complétez ou ajoutez des projets ici.
// Champs : name, goal, features[], stack[], role, limits[], demo, repo, featured

export const projects = [
  {
    name: "Cabinet SpiritVie",
    goal: "Site complet d'un cabinet de bien-être et de soins énergétiques : présenter les prestations et permettre aux clients de réserver et payer leurs consultations en ligne, dont les séances à distance.",
    features: [
      "Prise de rendez-vous en ligne, avec séances à distance en visioconférence via Google Meet",
      "Intégration du paiement en ligne avec Stripe",
      "Présentation des prestations, tarifs et coordonnées du cabinet",
      "Accompagnement proposé en visioconférence, en cabinet ou à domicile",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Stripe"],
    role: "Développeur solo — conception, développement frontend et backend, base de données et mise en ligne.",
    limits: [],
    demo: "https://www.cabinetspiritvie.com",
    featured: true,
  },
];
