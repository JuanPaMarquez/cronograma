import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 18,
    color: '#1a237e',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'black',
    flexGrow: 1,
    textTransform: 'uppercase',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingVertical: 4,
  },
  col: {
    flex: 1,
    paddingHorizontal: 2,
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

const ReportePDF = ({ mes, anio, datos }: IReportePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header con imágenes y título */}
      <View style={styles.header}>
        <Image style={styles.logo} src="/logo.png" />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>PROGRAMA MES DE {mes.toUpperCase()} {anio}</Text>
          <Text style={styles.title}>PROGRAMA MES DE {mes.toUpperCase()} {anio}</Text>
        </View>
        <Image style={styles.logo} src="/logo.png" />
      </View>

      {/* Tabla */}
      <View style={styles.tableHeader}>
        <Text style={styles.col}>FECHA</Text>
        <Text style={styles.col}>HORA</Text>
        <Text style={styles.col}>TIPO</Text>
        <Text style={styles.col}>DIRECTOR</Text>
        <Text style={styles.col}>PREDICADOR</Text>
      </View>

      {datos.map((item, idx) => (
        <View style={styles.tableRow} key={idx}>
          <Text style={styles.col}>{item.fecha}</Text>
          <Text style={styles.col}>{item.hora}</Text>
          <Text style={styles.col}>{item.tipo}</Text>
          <Text style={styles.col}>{item.director}</Text>
          <Text style={styles.col}>{item.predicador}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default ReportePDF;