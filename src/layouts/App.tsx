import { meses, headers, participantes } from "../utils/data"
import { icons } from "../utils/icons"
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import ReportePDF from "../components/ReportePDF";
import { generarPDF } from "../components/generarPDF";

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
  const [isDelete, setIsDelete] = useState(false)
  // const [isGenerate, setIsGenerate] = useState(false)

  const [items, setItems] = useState<IItem[]>([{
    id: 0,
    fecha: "",
    hora: "",
    tipo: "",
    director: participantes[0],
    predicador: participantes[0]
  }])

  // function handleSchedule() {
  //   setIsGenerate(true)
  // }

  const handleClick = async () => {
    const pdfBytes = await generarPDF({ mes: month, anio: year, datos: items });
  
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    // Crear un enlace temporal para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cronograma Iglesia Cristiana (${code}) ${month} ${year}.pdf`; // Nombre del archivo
    link.click();

    // Liberar el objeto URL después de la descarga
    URL.revokeObjectURL(url);
  };

  function agregarFila() {
    setFilas(filas+1)
    const nuevoItem: IItem = {
      id: filas,
      fecha: "",
      hora: "",
      tipo: "",
      director: participantes[0],
      predicador: participantes[0]
    }
    setItems([...items, nuevoItem])
  }

  function agregarFilaId(index: number) {
    setFilas(filas+1)
    const nuevoItem: IItem = {
      id: filas,
      fecha: "",
      hora: "",
      tipo: "",
      director: participantes[0],
      predicador: participantes[0]
    }
    setItems(prevItems => {
      const copiaItems = [...prevItems];
      copiaItems.splice(index + 1, 0, nuevoItem);
      return copiaItems;
    })
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
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }

  return (
    <div className="min-h-screen pb-20 flex flex-col items-center bg-gray-200 gap-2">
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
            {
              meses.map((mes, index) => (
                <option key={index} value={mes}>{mes}</option>
              ))
            }
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

      <div id="tabla" className="w-full flex md:justify-center">
        <table className="border-2 border-gray-300 rounded-md p-2 mt-2 border-collapse overflow-x-auto">
          <thead>
            <tr>
              { 
                headers.map(header => (
                  <th key={header.header} className={`p-2 border-2 text-lg ${header.style}`}>{header.header}</th>
                ))
              }
              <th className="border-2 w-8 text-center align-middle hover:bg-blue-400">
                <button 
                  className="h-full flex justify-center items-center w-full cursor-pointer"
                  onClick={() => setIsDelete(!isDelete)}
                >
                  { isDelete ? icons.Delete : icons.Add }
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((item, index) => (
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
                    { isDelete
                      ? <button 
                          className="h-full flex justify-center items-center w-full cursor-pointer" 
                          onClick={() => eliminarFila(item.id)}
                        >
                          {icons.Delete}
                        </button>
                      :  <button 
                          className="h-full flex justify-center items-center w-full cursor-pointer" 
                          onClick={() => agregarFilaId(index)}
                        >
                          {icons.Add}
                        </button>
                    }
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
        {icons.Add}
      </button>

      <button 
        className="border-2 font-bold rounded-md p-2 px-5 mt-2 hover:bg-black hover:text-white cursor-pointer"
        onClick={handleClick}
      >
        Generar PDF
      </button>
{/* 
      {isGenerate && (
        <PDFDownloadLink
          document={<ReportePDF mes={month} anio={year} datos={items} />}
          fileName={`Cronograma Iglesia Cristiana (${code}) ${month} ${year}.pdf`}
          style={{
            marginTop: 10,
            padding: '8px 16px',
            backgroundColor: '#1a237e',
            color: '#fff',
            borderRadius: 4,
            textDecoration: 'none'
          }}
        >
          {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
        </PDFDownloadLink>
      )} */}

    </div>
  )
}

export default App
