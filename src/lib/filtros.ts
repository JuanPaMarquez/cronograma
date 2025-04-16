export function formatearFecha (fechaStr: string): string {
  console.log(fechaStr)
  const fecha = new Date(`${fechaStr}T12:00:00`);

  // Día y mes con padding
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');

  // Día de la semana en español (abreviado)
  const opciones: Intl.DateTimeFormatOptions = { weekday: 'short' };
  const [first, ...restoNombreDia] = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
  const nombreDiaCapitalizado = [first.toUpperCase(), ...restoNombreDia].join('');

  return `${dia}/${mes} ${nombreDiaCapitalizado}`;
};


export function formatearHora(horaStr: string): string {
  const [hora, minutos] = horaStr.split(':').map(Number);
  const hora12 = hora % 12 || 12; // Convierte 0 o 12 a 12, y las demás horas al formato 12 horas
  const periodo = hora < 12 ? 'AM' : 'PM';
  return `${hora12}:${minutos.toString().padStart(2, '0')} ${periodo}`;
};
