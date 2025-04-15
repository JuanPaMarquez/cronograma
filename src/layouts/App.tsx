import { meses, headers, participantes } from "../utils/data"

import { useState } from "react"

interface IItem {
  id: number
  fecha: string,
  hora: string,
  tipo: string,
  director: string,
  predicador: string
}


function App() {

  const [code, setCode] = useState<string>('C22')
  const [month, setMonth] = useState<string>(meses[new Date().getMonth()])
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())
  const [filas, setFilas] = useState(1)

  const [items, setItems] = useState<IItem[]>([{
    id: 0,
    fecha: "",
    hora: "",
    tipo: "",
    director: "",
    predicador: ""
  }])

  function handleSchedule() {
    console.log("codigo: ", code)
    console.log("mes: ", month)
    console.log("año: ", year)

    console.log(items)
  }

  function agregarFila() {
    setFilas(filas+1)
    const nuevoItem: IItem = {
      id: filas,
      fecha: "",
      hora: "",
      tipo: "",
      director: "",
      predicador: ""
    }
    setItems([...items, nuevoItem])
  }

  function modificar(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, campo: keyof IItem, item: IItem) {
    const nuevosItems = items.map((i: IItem) => 
      i.id === item.id ? { ...i, [campo]: e.target.value } : i
    );
    setItems(nuevosItems);
  }

  function eliminarFila(id: number) {
    if (filas === 1) {
      alert("No puedes eliminar la última fila")
      return;
    }
    console.log(id)
    const nuevosItems = items.filter(item => item.id !== id);
    setItems(nuevosItems);
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

      <div id="tabla" className="w-full overflow-x-auto flex md:justify-center">
        <table className="border-2 border-gray-300 rounded-md p-2 mt-2 border-collapse overflow-x-auto">
          <thead>
            <tr>
              { 
                headers.map(header => (
                  <th key={header.header} className={`p-2 border-2 text-lg ${header.style}`}>{header.header}</th>
                ))
              }
              <th className="border-2 w-8 text-center align-middle"><svg className="m-auto"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg></th>
            </tr>
          </thead>
          <tbody>
            {
              items.map(item => (
                <tr key={item.id} className="h-10">
                  <td className="border-2 text-center align-middle">
                    <input 
                      className="w-28" 
                      value={item.fecha} 
                      onChange={(e) => modificar(e, "fecha", item)} 
                      type="date"
                    />
                  </td>
                  <td className="border-2 text-center align-middle">
                    <input 
                      className="w-28" 
                      type="time"
                      onChange={(e) => modificar(e, "hora", item)} 
                    />
                  </td>
                  <td className="border-2 text-center align-middle">
                    <input 
                      className="text-center text-lg focus:outline-none" 
                      type="text"  
                      placeholder="Escuela Dominical.."
                      onChange={(e) => modificar(e, "tipo", item)} 
                    />
                  </td>
                  <td className="border-2 text-center align-middle">
                    <select 
                      className="focus:outline-none text-center text-lg" 
                      name="director"
                      onChange={(e) => modificar(e, "director", item)} 
                    >
                      {
                        participantes.map(participante => (
                          <option key={participante} value={participante}>{participante}</option>
                        ))
                      }
                    </select>
                  </td>
                  <td className="border-2 text-center align-middle">
                    <select 
                      className="focus:outline-none text-center text-lg" 
                      name="predicador"
                      onChange={(e) => modificar(e, "predicador", item)}
                    >
                      {
                        participantes.map(participante => (
                          <option key={participante} value={participante}>{participante}</option>
                        ))
                      }
                    </select>
                  </td>
                  <td className="border-2 hover:bg-red-600">
                    <button 
                      className="h-full flex justify-center items-center w-full cursor-pointer" 
                      onClick={() => eliminarFila(item.id)}
                    >
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <button 
        className="border-2 font-bold rounded-md p-2 px-5 mt-2 bg-blue-400 hover:bg-black hover:text-white cursor-pointer"
        onClick={agregarFila}
      >
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
      </button>

      <button 
        className="border-2 font-bold rounded-md p-2 px-5 mt-2 hover:bg-black hover:text-white cursor-pointer"
        onClick={handleSchedule}
      >
        DESCARGAR
      </button>

    </div>
  )
}

export default App
