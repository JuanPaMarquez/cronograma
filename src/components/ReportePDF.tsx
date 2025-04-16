import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { formatearFecha, formatearHora } from '../lib/filtros';
import { IItem } from '../schemas/schemas';
import styles from '../styles/stylesPDF';

interface IReportePDFProps {
  mes: string;
  anio: string;
  datos: IItem[];
}

const ReportePDF = ({ mes, anio, datos }: IReportePDFProps) => {
  datos = datos.map((item) => {
    return {
      ...item,
      fecha: item.fecha ? formatearFecha(item.fecha) : "01/01 Lun",
      hora: item.hora ? formatearHora(item.hora) : "00:00 AM",
      tipo: item.tipo || "Culto",
    };
  });
  
  return (
    <Document>
      <Page size="LETTER" orientation='landscape' style={styles.page}>
        {/* Header con imágenes y título */}
        <View style={styles.header}>
          <Image style={styles.logo} src="/logo.png" />
          <View style={styles.titleContainer}>
            <Text style={styles.titleIglesia}>IGLESIA CRISTIANA</Text>
            <Text style={styles.titleCuadrangular}>CUADRANGULAR EL ZULIA</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.titlePrograma}>PROGRAMA MES DE </Text>
              <Text style={styles.titleMes}>{mes.toUpperCase()} </Text>
              <Text style={styles.titleAnio}>{anio}</Text>
            </View>
          </View>
          <Image style={styles.logo} src="/logo.png" />
        </View>

        {/* Tabla con bordes colapsados */}
        <View style={styles.tableContainer}>
          {/* Encabezado de la tabla */}
          <View fixed style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colFecha]}>FECHA</Text>
            <Text style={[styles.tableHeaderCell, styles.colHora]}>HORA</Text>
            <Text style={[styles.tableHeaderCell, styles.colTipo]}>TIPO</Text>
            <Text style={[styles.tableHeaderCell, styles.colDirector]}>DIRECTOR</Text>
            <Text style={[styles.tableHeaderCell, styles.colPredicador]}>PREDICADOR</Text>
          </View>

          {/* Filas de datos */}
          <View style={styles.tableBody}>
            {datos.map((item, idx) => (
              <View style={styles.tableRow} key={idx} wrap={false}>
                <Text style={[styles.tableCell, styles.colFecha, {backgroundColor: `${item.color}`}]}>{item.fecha}</Text>
                <Text style={[styles.tableCell, styles.colHora, {backgroundColor: `${item.color}`}]}>{item.hora}</Text>
                <Text style={[styles.tableCell, styles.colTipo, {backgroundColor: `${item.color}`}]}>{item.tipo}</Text>
                <Text style={[styles.tableCell, styles.colDirector, {backgroundColor: `${item.color}`}]}>{item.director}</Text>
                <Text style={[styles.tableCell, styles.colPredicador, {backgroundColor: `${item.color}`}]}>{item.predicador}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={styles.footerText}>Cronograma Aprobado por los Pastores Armando Marquez Y Stella Pulido.</Text>
      </Page>
    </Document>
  );
};

export default ReportePDF;