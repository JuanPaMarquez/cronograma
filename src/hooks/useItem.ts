import { participantes } from "../utils/data";
import { IItem } from "../schemas/schemas";

interface IUseItemProps {
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>,
  items: IItem[],
  setPdfData: React.Dispatch<React.SetStateAction<IItem[]>>,
  setIsGenerate: React.Dispatch<React.SetStateAction<boolean>>,
  setPdfError: React.Dispatch<React.SetStateAction<string | null>>,
  nextId: number,
  setNextId: React.Dispatch<React.SetStateAction<number>>,
}

export default function useItem({ 
  setItems, 
  items, 
  setPdfData, 
  setIsGenerate, 
  setPdfError, 
  nextId, 
  setNextId 
}: IUseItemProps ) {
  function agregarFila() {
    const nuevoItem: IItem = {
      id: nextId,
      fecha: "",
      hora: "",
      tipo: "",
      director: participantes[0],
      predicador: participantes[0],
      color: "#ffffff"
    }
    setItems([...items, nuevoItem]);
    setNextId(nextId + 1); // Incrementa el ID para el siguiente nuevo item
  }

  function agregarFilaId(index: number) {
    const nuevoItem: IItem = {
      id: nextId, 
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
    setNextId(nextId + 1); 
  }

  function modificar(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, campo: keyof IItem, item: IItem) {
    const nuevosItems = items.map((i: IItem) =>
      i.id === item.id ? { ...i, [campo]: e.target.value } : i
    );
    setItems(nuevosItems);
    setIsGenerate(false);
  }

  function eliminarFila(id: number) {
    try {
      if (items.length === 1) {
        alert("No puedes eliminar la última fila");
        return;
      }

      // Resetea el estado de generación de PDF y datos
      setIsGenerate(false);
      setPdfData([]);

      // Elimina la fila con el ID especificado y actualiza el estado
      const newItems = items.filter(item => item.id !== id);
      setItems(newItems);

    } catch (err) {
      
      console.error("Error al eliminar fila:", err);
      setPdfError(err instanceof Error ? err.message : "Error al eliminar fila");
    }
  }

  return {
    agregarFila,
    agregarFilaId,
    modificar,
    eliminarFila,
  }
}