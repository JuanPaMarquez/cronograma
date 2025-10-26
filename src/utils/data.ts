const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const headers = [
  {
    header: "Fecha",
    style: "w-30"
  }, 
  {
    header: "Hora",
    style: "w-30"
  }, 
  {
    header: "Tipo",
    style: "w-50"
  }, 
  {
    header: "Director",
    style: "w-40"
  }, 
  {
    header: "Predicador",
    style: "w-40"
  },
]

const participantes = [
  "Participación",
  "Pastor Armando",
  "Pastora Stella",
  "Rodrigo Marquez",
  "Nohora E Sanchez",
  "Juan P Marquez",
  "Cecilia Marquez",
  "Karol D Ortega",
  "Elian F Marquez",
  "Maria Gallo"
]

const colorOptions = [
  { value: "#ffffff", className: "bg-white", label: "Sin color" },
  { value: "#F7CAAC", className: "bg-red-500", label: "Rojo" },
  { value: "#C5E0B3", className: "bg-green-500", label: "Verde" },
  { value: "#B4C6E7", className: "bg-blue-500", label: "Azul" },
  { value: "#FFE599", className: "bg-yellow-500", label: "Amarillo" },
]

export {meses, headers, participantes, colorOptions};