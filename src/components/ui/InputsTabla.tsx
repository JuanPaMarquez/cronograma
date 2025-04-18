import { IItem, IModificar } from "../../schemas/schemas";
import { participantes } from "../../utils/data";

export function InputTabla({ 
  item, 
  modificar, 
  type, 
  campo,
  className = 'w-28',
  placeholder,
}:{ 
  item: IItem; 
  modificar: IModificar; 
  type: string; 
  campo: keyof IItem 
  className?: string
  placeholder?: string;
}){
  return (
    <input
      className={className}
      type={type}
      value={item[campo]}
      placeholder={placeholder}
      onChange={(e) => modificar(e, campo, item)}
    />
  )
}

export function SelectTabla({
  item, 
  modificar, 
  campo 
}:{ 
  item: IItem; 
  modificar: IModificar; 
  campo: keyof IItem 
}){
  return (
    <select
      className="focus:outline-none text-center text-lg"
      value={item[campo]}
      name={campo}
      onChange={(e) => modificar(e, campo, item)}
    >
      {
        participantes.map(participante => (
          <option 
            key={`predicador-${participante}-${item.id}`} 
            value={participante}
          >
            {participante}
          </option>
        ))
      }
    </select>
  )
}