
export function Columna({ children, color = "#fff" }: { children: React.ReactNode, color?: string }) {
  console.log(color)
  return (
    <td 
      className="border-2 text-center align-middle"
      style={{ backgroundColor: color }}
    >
      {children}
    </td>
  )
}