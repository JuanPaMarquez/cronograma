export interface IItem {
  id: number
  fecha: string,
  hora: string,
  tipo: string,
  director: string,
  predicador: string
  color: string
}

export type IModificar = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, campo: keyof IItem, item: IItem) => void;