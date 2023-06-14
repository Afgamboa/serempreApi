import { validateData } from "../../../src/utils/validateData";
import { IDataValid } from "../../../src/interfaces/TaskInterfaces";

describe("validateData", () => {
  test("valid data returns isValid true", () => {
    const data: IDataValid = { title: "Valid title", description: "Valid description" }
    const result = validateData(data);
    expect(result.isValid).toBe(true);

  });

  test("invalid title returns isValid false", () => {
    const data: IDataValid = { title: "¡Título inválido!", description: "Valid description" }
    const result = validateData(data);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("El titulo no es valido para tu tarea");

  });

  test("empty title returns isValid false", () => {
    const data: IDataValid = { title: " ", description: "Valid description" }
    const result = validateData(data);
    expect(result.isValid).toBe(false);
  });

  test("empty description returns isValid false", () => {
    const data: IDataValid = { title: "Valid title", description: " " }
    const result = validateData(data);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("La descripcion de la tarea es requerida");

  });
});