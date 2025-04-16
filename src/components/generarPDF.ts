import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { formatearFecha, formatearHora } from '../lib/filtros';

interface IItem {
  id: number;
  fecha: string;
  hora: string;
  tipo: string;
  director: string;
  predicador: string;
}

interface IReportePDFProps {
  mes: string;
  anio: string;
  datos: IItem[];
}

export async function generarPDF({ mes, anio, datos }: IReportePDFProps) {
  datos = datos.map((item) => {
      return {
        ...item,
        fecha: item.fecha ? formatearFecha(item.fecha) : "",
        hora: item.hora ? formatearHora(item.hora) : "",
      };
    })

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([792, 612]); // Carta horizontal

  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 50;

  // Cargar las imágenes desde la carpeta public
  const logo1Bytes = await fetch('/logo.png').then((res) => res.arrayBuffer());
  const logo1Image = await pdfDoc.embedPng(logo1Bytes);

  // Dibujar las imágenes en el PDF
  page.drawImage(logo1Image, { x: 10, y: y-60, width: 100, height: 100 });
  page.drawImage(logo1Image, { x: width - 110, y: y-60, width: 100, height: 100 });

  // Título con sombra
  const titulo = 'IGLESIA CRISTIANA';
  const textWidth = boldFont.widthOfTextAtSize(titulo, 24);
  const centerX = (width - textWidth) / 2;

  page.drawText(titulo, {
    x: centerX + 1,
    y: y - 5,
    size: 24,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  page.drawText(titulo, {
    x: centerX,
    y: y - 4,
    size: 24,
    font: boldFont,
    color: rgb(1, 0.94, 0.49), // Amarillo suave
  });

  y -= 40;
  page.drawText('CUADRANGULAR EL ZULIA', {
    x: (width - boldFont.widthOfTextAtSize('CUADRANGULAR EL ZULIA', 18)) / 2,
    y,
    size: 18,
    font: boldFont,
    color: rgb(0, 0, 1),
  });

  y -= 25;
  page.drawText(`PROGRAMA MES DE ${mes.toUpperCase()} ${anio}`, {
    x: (width - boldFont.widthOfTextAtSize(`PROGRAMA MES DE ${mes.toUpperCase()} ${anio}`, 16)) / 2,
    y,
    size: 16,
    font: boldFont,
    color: rgb(0, 0.5, 0),
  });

  // Tabla
  const cols = ['FECHA', 'HORA', 'TIPO', 'DIRECTOR', 'PREDICADOR'];
  const colWidths = [80, 80, 200, 160, 160];
  const startX = 50;
  const rowHeight = 20;
  let tableY = y - 40;

  // Función para dibujar celda con borde
  const drawCell = (
    text: string,
    x: number,
    y: number,
    width: number,
    height: number,
    font: any,
    fontSize: number,
    bold = false
  ) => {
    // Dibujar el borde de la celda
    page.drawRectangle({
      x,
      y,
      width,
      height,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    // Calcular el ancho del texto
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    // Calcular la posición X para centrar horizontalmente
    const textX = x + (width - textWidth) / 2;

    // Calcular la posición Y para centrar verticalmente
    const textY = y + (height - fontSize) / 2;

    // Dibujar el texto centrado
    page.drawText(text, {
      x: textX,
      y: textY,
      size: fontSize,
      font: bold ? boldFont : font,
      color: rgb(0, 0, 0),
      maxWidth: width - 10,
    });
  };

  // Header de tabla
  let x = startX;
  cols.forEach((col, i) => {
    drawCell(col, x, tableY, colWidths[i], rowHeight, boldFont, 12, true);
    x += colWidths[i];
  });

  tableY -= rowHeight;

  // Filas de datos
  datos.forEach((item) => {
    const fila = [item.fecha, item.hora, item.tipo, item.director, item.predicador];
    x = startX;
    fila.forEach((val, i) => {
      drawCell(val, x, tableY, colWidths[i], rowHeight, font, 10);
      x += colWidths[i];
    });
    tableY -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
