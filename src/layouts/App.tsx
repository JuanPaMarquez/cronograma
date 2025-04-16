import { meses, headers, participantes, colorOptions } from "../utils/data"
import { icons } from "../utils/icons"
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportePDF from "../components/ReportePDF";
import { IItem } from "../schemas/schemas";
import { useState, useEffect } from "react"
import useItem from "../hooks/useItem";
import { Columna } from "../components/ui/filasTabla";
import { InputTabla, SelectTabla } from "../components/ui/InputsTabla";
import { BotonPrimary } from "../components/ui/Buttons";

function App() {
  const [code, setCode] = useState<string>('C22')
  const [month, setMonth] = useState<string>(meses[new Date().getMonth()])
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())
  const [isDelete, setIsDelete] = useState(false)
  const [isGenerate, setIsGenerate] = useState(false)
  const [pdfData, setPdfData] = useState<IItem[]>([]);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfKey, setPdfKey] = useState<string>("initial");
  const [nextId, setNextId] = useState(1); // Para generar IDs únicos
  const [items, setItems] = useState<IItem[]>([{
    id: 0,
    fecha: "",
    hora: "",
    tipo: "",
    director: participantes[0],
    predicador: participantes[0],
    color: "#ffffff"
  }])

  const { agregarFila, modificar, agregarFilaId, eliminarFila } = useItem({
    setItems,
    items,
    setPdfData,
    setIsGenerate,
    setPdfError,
    nextId,
    setNextId
  })

  useEffect(() => {
    // Cargar los datos del localStorage al iniciar la aplicación
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setItems(parsedItems);
      setNextId(parsedItems.length > 0 ? parsedItems[parsedItems.length - 1].id + 1 : 1);
    }
  }, []);

  useEffect(() => {
    if (isGenerate) {
      try {
        // Crea una copia estable de los datos para evitar problemas de referencia
        const stablePdfData = items.map((item, index) => ({
          ...item,
          id: index // Reasigna las IDs para evitar conflictos
        }));
        localStorage.setItem("items", JSON.stringify(stablePdfData));
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
    // console.log("Generando PDF con los siguientes datos:", items);
    // console.log("datos:", pdfData);
    setIsGenerate(true);
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
      { /* Tabla de datos */}
      <div id="tabla" className="w-full overflow-x-auto flex md:justify-center">
        <table className="border-2 border-gray-300 rounded-md p-2 mt-2 border-collapse overflow-x-auto">
          <thead>
            <tr>
              { // Encabezados de Fecha, Hora, Tipo, Director, Predicador
                headers.map(header => (
                  <th key={header.header} className={`p-2 border-2 text-lg ${header.style}`}>{header.header}</th>
                ))
              }
              <th className="border-2 min-w-25 text-center align-middle">
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
                  <Columna>
                    <InputTabla 
                      item={item} 
                      type="date" 
                      modificar={modificar} 
                      campo="fecha"
                    />
                  </Columna>
                  <Columna>
                    <InputTabla 
                      item={item} 
                      type="time" 
                      modificar={modificar} 
                      campo="hora"
                    />
                  </Columna>
                  <Columna>
                    <input
                      className="text-center text-lg focus:outline-none"
                      type="text"
                      value={item.tipo}
                      placeholder="Escuela Dominical.."
                      onChange={(e) => modificar(e, "tipo", item)}
                    />
                  </Columna>
                  <Columna>
                    <SelectTabla
                      item={item}
                      modificar={modificar}
                      campo="director"
                    />
                  </Columna>
                  <Columna>
                    <SelectTabla
                      item={item}
                      modificar={modificar}
                      campo="predicador"
                    />
                  </Columna>
                  <td className="border-2 w-30">
                    <select
                      name="color"
                      value={item.color}
                      className="w-full h-full focus:outline-none text-center text-lg"
                      onChange={(e) => modificar(e, "color", item)}
                    >
                      { colorOptions.map((colorOption) => (
                          <option
                            key={`color-${colorOption.label}-${item.id}`}
                            value={colorOption.value}
                            className={colorOption.className}
                          >
                            {colorOption.label}
                          </option>
                        ))
                      }
                    </select>
                  </td>
                  <td className="border-2 hover:bg-red-600">
                    {isDelete
                      ? <BotonPrimary 
                          icons={icons.Delete}
                          funcion={eliminarFila}
                          valor={item.id} 
                        />
                      : <BotonPrimary
                          icons={icons.Add}
                          funcion={agregarFilaId}
                          valor={index-1} 
                        /> 
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