export function BotonPrimary ({ icons, funcion, valor }: { icons: any, funcion: (valor: number) => void, valor: number }) {
    
  return (
    <button
      className="h-full flex justify-center items-center w-full cursor-pointer"
      onClick={() => funcion(valor)}
    >
      {icons}
    </button>
  )
}