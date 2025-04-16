import { StyleSheet } from "@react-pdf/renderer"; 

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

export default styles;