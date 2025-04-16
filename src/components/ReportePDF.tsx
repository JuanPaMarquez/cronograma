import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { formatearFecha, formatearHora } from '../lib/filtros';
import { IItem } from '../schemas/schemas';
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

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 19.5,
  },
  logo: {
    width: 100,
    height: 100,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'blue',
  },
  titleIglesia: {
    fontSize: 26,
    fontFamily: 'Times-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#DAA520', // Gold color
    marginBottom: 5,
  },
  titleCuadrangular: {
    fontSize: 28,
    fontFamily: 'Times-Bold', 
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4682B4', // Blue color
    marginBottom: 5,
  },
  titlePrograma: {
    fontSize: 26,
    fontFamily: 'Times-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50', // Green color
  },
  titleMes: {
    fontSize: 26,
    fontFamily: 'Times-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF8C00', // Orange color
  },
  titleAnio: {
    fontSize: 26,
    fontFamily: 'Times-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50', // Green color
  },
  // Table styles with fix for page breaks
  tableContainer: {
    width: '100%',
    border: '1pt solid black',
    borderBottom: 0,
  },
  tableBody: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    backgroundColor: '#f0f0f0', // Light gray background for header
    fontWeight: 'bold',
  },
  tableHeaderCell: {
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 5,
    fontFamily: 'Helvetica-Bold',
  },
  tableCell: {
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 5,
  },
  colFecha: {
    flex: 1.2, // Más pequeña
  },
  colHora: {
    flex: 1.1, // Más pequeña
  },
  colTipo: {
    flex: 3, // Más larga
  },
  colDirector: {
    flex: 2, // Mediana
  },
  colPredicador: {
    flex: 2, // Mediana
  },
  footerText: {
    fontStyle: 'italic', 
    fontSize: 16, 
    textAlign: 'center', 
    marginTop: 3
  }
});