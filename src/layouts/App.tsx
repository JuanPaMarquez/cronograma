import { meses, headers, participantes } from "../utils/data"
import { icons } from "../utils/icons"
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportePDF from "../components/ReportePDF";
import { IItem } from "../schemas/schemas";
import { useState, useEffect } from "react"

function App() {
  const [code, setCode] = useState<string>('C22')
  const [month, setMonth] = useState<string>(meses[new Date().getMonth()])
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())
  const [filas, setFilas] = useState(1)
  const [isDelete, setIsDelete] = useState(false)
  const [isGenerate, setIsGenerate] = useState(false)
  const [pdfData, setPdfData] = useState<IItem[]>([]);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfKey, setPdfKey] = useState<string>("initial");
  const [nextId, setNextId] = useState(1); // For generating unique IDs
  const [items, setItems] = useState<IItem[]>([{
    id: 0,
    fecha: "",
    hora: "",
    tipo: "",
    director: participantes[0],
    predicador: participantes[0],
    color: "#ffffff"
  }])

  // Effect to handle PDF data generation
  useEffect(() => {
    if (isGenerate) {
      try {
        // Create a stable copy of the data with sequential IDs for PDF
        const stablePdfData = items.map((item, index) => ({
          ...item,
          id: index // Reassign sequential IDs for PDF
        }));
        setPdfData(stablePdfData);
        setPdfKey(`pdf-${Date.now()}-${stablePdfData.length}`);
        setPdfError(null);
      } catch (err) {
        console.error("PDF data generation error:", err);
        setPdfError(err instanceof Error ? err.message : "Unknown error");
      }
    }
  }, [isGenerate, items]);

  function handleSchedule() {
    console.log("Generando PDF con los siguientes datos:", items);
    console.log("datos:", pdfData);
    setIsGenerate(true);
  }

  function agregarFila() {
    const nuevoItem: IItem = {
      id: nextId, // Use next unique ID
      fecha: "",
      hora: "",
      tipo: "",
      director: participantes[0],
      predicador: participantes[0],
      color: "#ffffff"
    }
    setItems([...items, nuevoItem]);
    setNextId(nextId + 1); // Increment the ID counter
    setFilas(filas + 1);
  }

  function agregarFilaId(index: number) {
    const nuevoItem: IItem = {
      id: nextId, // Use next unique ID
      fecha: "",
      hora: "",
      tipo: "",
      director: participantes[0],
      predicador: participantes[0],
      color: "#ffffff"
    }
    setItems(prevItems => {
      const copiaItems = [...prevItems];
      copiaItems.splice(index + 1, 0, nuevoItem);
      return copiaItems;
    });
    setNextId(nextId + 1); // Increment the ID counter
    setFilas(filas + 1);
  }

  function modificar(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, campo: keyof IItem, item: IItem) {
    const nuevosItems = items.map((i: IItem) =>
      i.id === item.id ? { ...i, [campo]: e.target.value } : i
    );
    setItems(nuevosItems);
  }

  function eliminarFila(id: number) {
    try {
      if (items.length === 1) {
        alert("No puedes eliminar la última fila");
        return;
      }

      // Reset PDF generation state
      setIsGenerate(false);
      setPdfData([]);

      // Simply filter out the item with the given ID without reassigning IDs
      const newItems = items.filter(item => item.id !== id);
      setItems(newItems);
      setFilas(newItems.length);
    } catch (err) {
      console.error("Error al eliminar fila:", err);
      setPdfError(err instanceof Error ? err.message : "Error al eliminar fila");
    }
  }

  return (
    <div className="min-h-screen pb-20 flex flex-col items-center bg-gray-200 gap-2">
      <h1 className="pt-5 text-2xl font-bold text-center">Cronograma Iglesia del Zulia</h1>
      <a
        href="https://juanpamarquez.github.io/portfolio/"
        target="_blank"
        className="text-lg font-bold text-center hover:text-blue-500"
      >
        By Juan Pablo Marquez
      </a>
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

      <div id="tabla" className="w-full overflow-x-auto flex md:justify-center">
        <table className="border-2 border-gray-300 rounded-md p-2 mt-2 border-collapse overflow-x-auto">
          <thead>
            <tr>
              {
                headers.map(header => (
                  <th key={header.header} className={`p-2 border-2 text-lg ${header.style}`}>{header.header}</th>
                ))
              }
              <th className="border-2 w-8 text-center align-middle">
                <button
                  className="h-full flex justify-center items-center w-full"
                >
                  {icons.Pincel}
                </button>
              </th>
              <th className="border-2 w-8 text-center align-middle hover:bg-blue-400">
                <button
                  className="h-full flex justify-center items-center w-full cursor-pointer"
                  onClick={() => setIsDelete(!isDelete)}
                >
                  {isDelete ? icons.Delete : icons.Add}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((item, index) => (
                <tr key={`row-${item.id}`} className="h-10">
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
                      value={item.hora}
                      onChange={(e) => modificar(e, "hora", item)}
                    />
                  </td>
                  <td className="border-2 text-center align-middle">
                    <input
                      className="text-center text-lg focus:outline-none"
                      type="text"
                      value={item.tipo}
                      placeholder="Escuela Dominical.."
                      onChange={(e) => modificar(e, "tipo", item)}
                    />
                  </td>
                  <td className="border-2 text-center align-middle">
                    <select
                      className="focus:outline-none text-center text-lg"
                      name="director"
                      value={item.director}
                      onChange={(e) => modificar(e, "director", item)}
                    >
                      {
                        participantes.map(participante => (
                          <option key={`director-${participante}-${item.id}`} value={participante}>
                            {participante}
                          </option>
                        ))
                      }
                    </select>
                  </td>
                  <td className="border-2 text-center align-middle">
                    <select
                      className="focus:outline-none text-center text-lg"
                      name="predicador"
                      value={item.predicador}
                      onChange={(e) => modificar(e, "predicador", item)}
                    >
                      {
                        participantes.map(participante => (
                          <option key={`predicador-${participante}-${item.id}`} value={participante}>
                            {participante}
                          </option>
                        ))
                      }
                    </select>
                  </td>
                  <td className="border-2 w-30">
                    <select
                      name="color"
                      value={item.color}
                      className="w-full h-full focus:outline-none text-center text-lg"
                      onChange={(e) => modificar(e, "color", item)}
                    >
                      <option value="#ffffff" className="bg-white">Sin color</option>
                      <option value="#F7CAAC" className="bg-red-500">Rojo</option>
                      <option value="#C5E0B3" className="bg-green-500">Verde</option>
                      <option value="#B4C6E7" className="bg-blue-500">Azul</option>
                      <option value="#FFE599" className="bg-yellow-500">Amarillo</option>
                    </select>
                  </td>
                  <td className="border-2 hover:bg-red-600">
                    {isDelete
                      ? <button
                        className="h-full flex justify-center items-center w-full cursor-pointer"
                        onClick={() => eliminarFila(item.id)}
                      >
                        {icons.Delete}
                      </button>
                      : <button
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
        onClick={handleSchedule}
      >
        Generar PDF
      </button>

      {pdfError && (
        <div className="text-red-600 font-bold mt-2">
          Error al generar PDF: {pdfError}
        </div>
      )}

      {isGenerate && pdfData.length > 0 && (
        <PDFDownloadLink
          key={pdfKey}
          document={<ReportePDF mes={month} anio={year} datos={pdfData} />}
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
          {({ loading, error }) => {
            if (error) {
              console.error("PDF Error:", error);
              return 'Error al generar PDF';
            }
            return loading ? 'Generando PDF...' : 'Descargar PDF';
          }}
        </PDFDownloadLink>
      )}
    </div>
  )
}

export default App