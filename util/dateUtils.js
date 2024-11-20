export function getFirstDayOfCurrentMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export function get30DaysAgoDate() {
  const now = new Date();
  return new Date(now.setDate(now.getDate() - 30));
}

// Función para formatear una fecha en formato ISO con hora de inicio o fin del día
export function formatDate(date, isStartDate = true) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = isStartDate ? "00" : "23";
  const minutes = isStartDate ? "00" : "59";
  const seconds = isStartDate ? "00" : "59";
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

// Función para obtener el rango del día actual (inicio y fin del día)
export function getCurrentDayRange() {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59
  );
  return [startOfDay, endOfDay];
}
