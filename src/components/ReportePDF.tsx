import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { formatearFecha, formatearHora } from '../lib/filtros';

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
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  titleContainer: {
    position: 'relative',
    textAlign: 'center',
  },
  titleShadow: {
    fontSize: 26,
    fontFamily: 'Times-Roman',
    fontWeight: 'bold',
    position: 'absolute',
    color: '#000', // Color del borde (negro)
    left: 1, // Desplazamiento horizontal
    top: 1, // Desplazamiento vertical
  },
  title: {
    fontSize: 26,
    fontFamily: 'Times-Roman',
    fontWeight: 'bold',
    color: '#FFF07D', // Color interno (amarillo suave)
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000', // Color del borde
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000', // Color del borde
    justifyContent: 'center',
    alignItems: 'center',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  colFecha: {
    flex: 1, // Más pequeña
  },
  colHora: {
    flex: 1, // Más pequeña
  },
  colTipo: {
    flex: 3, // Más larga
  },
  colDirector: {
    flex: 2, // Mediana
    backgroundColor: 'blue',
  },
  colPredicador: {
    flex: 2, // Mediana
  },
});

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

const ReportePDF = ({ mes, anio, datos }: IReportePDFProps) => {
  datos = datos.map((item) => {
    return {
      ...item,
      fecha: item.fecha ? formatearFecha(item.fecha) : "",
      hora: item.hora ? formatearHora(item.hora) : "",
    };
  })
  return (
  <Document>
    <Page size="LETTER" orientation='landscape' style={styles.page}>
      {/* Header con imágenes y título */}
      <View style={styles.header}>
        <Image style={styles.logo} src="/logo.png" />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleShadow}>IGLESIA CRISTIANA</Text>
            <Text style={styles.title}>IGLESIA CRISTIANA</Text>
          </View>
          {/* <Text style={[styles.title, {color: 'yellow'}]}>IGLESIA CRISTIANA</Text> */}
          <Text style={[styles.title, {color: 'blue'}]}>CUADRANGULAR EL ZULIA</Text>
          <Text style={[styles.title, {color: 'green'}]}>PROGRAMA MES DE <Text style={{color: 'red'}}>{mes.toUpperCase()}</Text> {anio}</Text>
        </View>
        <Image style={styles.logo} src="/logo.png" />
      </View>

      {/* Tabla */}
      <View style={styles.tableHeader}>
        <Text style={[styles.col, styles.colFecha]}>FECHA</Text>
        <Text style={[styles.col, styles.colHora]}>HORA</Text>
        <Text style={[styles.col, styles.colTipo]}>TIPO</Text>
        <Text style={[styles.col, styles.colDirector]}>DIRECTOR</Text>
        <Text style={[styles.col, styles.colPredicador]}>PREDICADOR</Text>
      </View>

      {datos.map((item, idx) => (
        <View style={styles.tableRow} key={idx}>
          <Text style={[styles.col, styles.colFecha]}>{item.fecha}</Text>
          <Text style={[styles.col, styles.colHora]}>{item.hora}</Text>
          <Text style={[styles.col, styles.colTipo]}>{item.tipo}</Text>
          <Text style={[styles.col, styles.colDirector]}>{item.director}</Text>
          <Text style={[styles.col, styles.colPredicador]}>{item.predicador}</Text>
        </View>
      ))}
    </Page>
  </Document>
)};

export default ReportePDF;