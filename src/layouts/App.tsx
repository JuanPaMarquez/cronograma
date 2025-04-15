import { useState } from "react"

const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function App() {

  const [code, setCode] = useState<string>('C22')
  const [month, setMonth] = useState<string>(meses[new Date().getMonth()])
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())

  function handleSchedule() {
    console.log("codigo: ", code)
    console.log("mes: ", month)
    console.log("año: ", year)
  }

  return (
    <div className="flex flex-col items-center h-screen bg-gray-200 gap-2">
      <h1 className="pt-5 text-2xl font-bold text-center">Cronograma Iglesia del Zulia</h1>
      <div id="config" className="flex gap-3 flex-col sm:flex-row items-center">
        <label htmlFor="code" className="flex gap-2 items-center">
          <span>Codigo:</span>
          <input 
            type="text" 
            name="code" 
            className="border-2 w-15 border-gray-300 rounded-md p-2 mt-2" 
            placeholder={`${code}..`}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
        <label htmlFor="month" className="flex gap-2 items-center">
          <span>Mes:</span>
          <select 
            className="border-2 border-gray-300 rounded-md p-2 mt-2" 
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="Enero">Enero</option>
            <option value="Febrero">Febrero</option>
            <option value="Marzo">Marzo</option>
            <option value="Abril">Abril</option>
            <option value="Mayo">Mayo</option>
            <option value="Junio">Junio</option>
            <option value="Julio">Julio</option>
            <option value="Agosto">Agosto</option>
            <option value="Septiembre">Septiembre</option>
            <option value="Octubre">Octubre</option>
            <option value="Noviembre">Noviembre</option>
            <option value="Diciembre">Diciembre</option>
          </select>
        </label>
        <label htmlFor="year" className="flex gap-2 items-center">
          <span>Año:</span>
          <input 
            type="number" 
            name="year" 
            className="border-2 w-22 border-gray-300 rounded-md p-2 mt-2 " 
            placeholder={`${year}..`}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
      </div>

      <div id="tabla">
        <table className="border-2 border-gray-300 rounded-md p-2 mt-2 border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-2 border-gray-300 w-30">Fecha</th>
              <th className="p-2 border-2 border-gray-300 w-30">Hora</th>
              <th className="p-2 border-2 border-gray-300 w-50">Tipo</th>
              <th className="p-2 border-2 border-gray-300 w-40">Director</th>
              <th className="p-2 border-2 border-gray-300 w-40">Predicador</th>
            </tr>
          </thead>
        </table>
      </div>

      <button 
        className="border-2 font-bold rounded-md p-2 px-5 mt-2 hover:bg-black hover:text-white cursor-pointer"
        onClick={handleSchedule}
      >DESCARGAR</button>

    </div>
  )
}

export default App
