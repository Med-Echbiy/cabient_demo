const doctors = {
  title: "Médecin",
  name: "unite",
  type: "document",
  readOnly: false,
  description: "Les informations sur les clients de l'entreprise.",
  fields: [
    {
      name: "fullName",
      title: "Nom et prénom",
      type: "string",
      description: "Le nom complet du client.",
    },
    {
      name: "phone",
      title: "Téléphone",
      type: "number",
      description: "Le numéro de téléphone du client.",
    },
    {
      name: "email",
      title: "Email",
      type: "email",
      description: "L'adresse e-mail du client.",
    },
    // Plus de champs peuvent être ajoutés au besoin.
  ],
};

export default doctors;
