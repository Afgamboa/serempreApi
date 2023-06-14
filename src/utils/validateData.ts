import { IDataValid } from "../interfaces/TaskInterfaces";
import { regex } from "./regularExp";

export const validateData = (validateData: IDataValid) => {
  const title = validateData.title || null;
  const description = validateData.description || null;

  if (title && !regex.titleRegex.test(title)) {
    const error = new Error("El titulo no es valido para tu tarea");
    return { message: error.message, isValid: false };
  } else if (title && title.trim().length === 0) {
    const error = new Error("El titulo es requerido");
    return { message: error.message, isValid: false };
  }
if (description && description.trim().length === 0) {
    const error = new Error("La descripcion de la tarea es requerida");
    return { message: error.message, isValid: false };
  }

  return { isValid: true };
};
