import { parseISO } from "date-fns";

export function parseStringToBoolean({ value }) {
  if (["1", "true", true, 1].includes(value.toLowerCase())) {
    return true;
  }

  if (["0", "false", false, 0].includes(value.toLowerCase())) {
    return false;
  }

  return null;
}

export function parseStringToJson({ value }) {
  return JSON.parse(value);
}

export function parseQueryParamsToNumber({ value }) {
  // TODO Implementar Função para transformar o Limit e o Offset
  return +value;
}
export function parseQueryParamsToNumberArray({ value }) {
  // TODO Implementar Função para transformar o Limit e o Offset
  return value.map((n) => Number(n));
}

export function parseQueryParamsToDate({ value }) {
  // TODO Implementar Função para transformar string para data
  return value;
}

export function parseStringToEnum<T>({ value }): T {
  // TODO Implementar Função para transformar string para data
  return value;
}

// export function parseStringToDate(value: string): {
//   success: boolean;
//   data: Date;
// } {
// try {
//   const date = parseISO(value);
//   return { success: true, data: date };
// } catch (error) {
//   return { success: false, data: null };
// }
// }

export function parseStringToDate(value: string): Date {
  try {
    const date = parseISO(value);
    return date;
  } catch (error) {
    throw "invalid date";
  }
}

export function parseStringToNumber({ value }) {
  return Number(value);
}
