import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Platform,
} from 'react-native';

import Cita from './Components/Cita';
import Formulario from './Components/Formulario';

const App = () => {

  const [ mostrarForm, setMostrarForm ] = useState(false);

  const [ citas,setCitas ] = useState([
    {id:1,paciente: 'Cristhian', propietario: 'Accenture', sintomas: 'Dolor de espalda'},
      {id:2,paciente: 'Lizeth', propietario: 'Accenture', sintomas: 'Dolor de cuello'},
        {id:3,paciente: 'Augusto', propietario: 'Accenture', sintomas: 'Dolor de cabeza'},
    ]);

  const eliminarPaciente = (id) => {
    setCitas( citasActuales => {
      return citasActuales.filter( cita => cita.id !== id);
      });
  }

  const mostrarFormulario = (id) => {
    setMostrarForm(!mostrarForm);
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo} >Administrador de Citas</Text>

      <View>
       <TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnMostrarForm}>
         <Text style={styles.textoMostrarForm}>Crear nueva cita</Text>
       </TouchableHighlight>
      </View>

      <View style={styles.contenido}>
        { mostrarForm ? (
          <>
            <Text style={styles.titulo} >Nueva Cita</Text>
            <Formulario
              citas={citas}
              setCitas={setCitas}
              setMostrarForm={setMostrarForm}/>
          </>
        ) : (
          <>
            <Text style={styles.titulo} >{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>
            <FlatList
              style={styles.listado}
              data={citas}
              renderItem={ ({item}) => <Cita cita={item} eliminarPaciente={eliminarPaciente} /> }
              keyExtractor={ cita => cita.id }
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  titulo: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom:20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFF',
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default App;
