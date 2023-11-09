const event = {
  title: "Réservation",
  name: "reservation",
  type: "document",
  readOnly: false,
  description: "Les informations sur les réservations.",
  fields: [
    {
      name: "event_id",
      title: "ID de la réservation",
      type: "string",
      description: "L'identifiant unique de la réservation.",
    },
    {
      name: "title",
      title: "Titre",
      type: "string",
      description: "Le titre de la réservation.",
    },
    {
      name: "client",
      title: "Client",
      type: "reference",
      to: [{ type: "client" }],
      description: "Le client associé à la réservation.",
    },
    {
      name: "start",
      title: "Date de début",
      type: "datetime",
      description: "La date et l'heure de début de la réservation.",
    },
    {
      name: "end",
      title: "Date de fin",
      type: "datetime",
      description: "La date et l'heure de fin de la réservation.",
    },
    {
      name: "assets",
      title: "Pièces jointes",
      type: "array",
      of: [{ title: "Photo", name: "image", type: "image" }],
      description: "Les images ou pièces jointes liées à la réservation.",
    },
    {
      name: "doctors",
      title: "Médecins Offrant le Service",
      type: "reference",
      to: [{ type: "unite" }],
      description: "Les médecins associés à cette réservation.",
    },
    {
      name: "service",
      title: "Service",
      type: "reference",
      to: [{ type: "services" }],
      description: "the chosen service for the resrvation",
    },
  ],
};

export default event;
