import state, { client } from "../types/state";
export async function submitValidation(state: state) {
  if (!state.client) {
    return {
      approved: false,
      msg: "Veuillez choisir un client ou en créer un",
    };
  }
  if (!state.service) {
    return { approved: false, msg: "Veuillez choisir un service" };
  }
  if (!state.unite) {
    return {
      approved: false,
      msg: "Veuillez choisir une unité pour ce service",
    };
  }

  const currentDate = new Date(); // Get the current date and time

  if (
    state.start.value.getHours() > 18 ||
    state.start.value.getHours() < 9 ||
    state.end.value.getHours() > 19 ||
    state.end.value.getHours() < 9
  ) {
    return {
      approved: false,
      msg: "Veuillez noter que les heures d'ouverture sont de 9 h à 18 h.",
    };
  }

  // Ensure start time is not earlier than the current date and time
  if (state.start.value < currentDate) {
    return {
      approved: false,
      msg: "La date de début ne peut pas être antérieure à la date actuelle.",
    };
  }

  // Calculate the duration in hours between start and end
  const startHours = state.start.value.getHours();
  const startMinutes = state.start.value.getMinutes();
  const endHours = state.end.value.getHours();
  const endMinutes = state.end.value.getMinutes();
  const durationHours = endHours - startHours;
  const durationMinutes = endMinutes - startMinutes;

  // Check if the duration is less than 1 hour
  if (durationHours < 1 && durationHours === 0 && durationMinutes < 60) {
    return {
      approved: false,
      msg: "La durée de l'heure de fin ne peut pas être inférieure à 1 heure.",
    };
  }

  return { approved: true, msg: "Tout est en ordre!" };
}

export async function createClientValidation(
  client: client,
  users: { fullName: string }[]
) {
  const fullNamePattren = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if (client.fullName.length < 6 || !fullNamePattren.test(client.fullName)) {
    return {
      isValid: false,
      msg: `"Assurez-vous d'entrer un nom complet avec un espace entre les mots et d'une longueur d'au moins 6 caractères."`,
    };
  }
  console.log(users);
  const isUser = users.filter(
    (e) =>
      e.fullName.toLocaleLowerCase() === client.fullName.toLocaleLowerCase()
  );
  if (isUser.length > 0) {
    return { isValid: false, msg: "Le client est déjà disponible" };
  }
  const phonePattren = /^[6-7][0-9]{8}/;
  if (
    !phonePattren.test(client.phone.toString()) ||
    client.phone.toString().length > 9
  ) {
    return {
      isValid: false,
      msg: `"Votre numéro de téléphone n'est pas valide. Assurez-vous qu'il commence par 6 ou 7 et qu'il comporte 9 chiffres."`,
    };
  }
  const emailPattren = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (client.email) {
    if (!emailPattren.test(client.email)) {
      return {
        isValid: false,
        msg: "Adresse e-mail non valide. Veuillez entrer une adresse e-mail valide",
      };
    }
  }
  return {
    isValid: true,
    msg: "evrething is good",
  };
}
