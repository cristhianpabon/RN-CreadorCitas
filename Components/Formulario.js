import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas,setCitas,setMostrarForm}) => {

  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    // console.log(date);
    const opciones = {year: 'numeric',month: 'long',day:'2-digit'};
    console.log(date.toLocaleDateString('es-ES', opciones));
    setFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    const opciones = {hour: 'numeric',minute: '2-digit'};
    console.log(time.toLocaleString('en-US', opciones));
    setHora(time.toLocaleString('en-US', opciones));
    hideTimePicker();
  };

  const crearNuevaCita = () => {
    if(paciente.trim() === '' || propietario.trim() === '' || hora.trim() === '' || fecha.trim() === '' || sintomas.trim() === '' || telefono.trim() === ''){
      mostratAlerta();
      return;
    }

    const cita = { paciente, propietario, telefono, fecha, hora, sintomas};
    cita.id = shortid.generate();
    const citasNuevo = [...citas,cita];
    setCitas(citasNuevo);
    setMostrarForm(false);
  }

  const mostratAlerta = () => {
    Alert.alert('Error','Todos los campos son obligatorios', [{text: 'Ok'}]);
  }

  return (
    <ScrollView style={styles.formulario}>
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <TextInput
          style={styles.input}
          onChangeText={ texto => setPaciente(texto) }
        />
      </View>
      <View>
        <Text style={styles.label}>Dueño:</Text>
        <TextInput
          style={styles.input}
          onChangeText={ texto => setPropietario(texto) }
        />
      </View>
       <View>
        <Text style={styles.label}>Telefono Contacto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={ texto => setTelefono(texto) }
          keyboardType='numeric'
        />
      </View>
      <View>
        <Text style={styles.label}>Fecha:</Text>
        <Button title="Seleccionar Fecha" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          locale='es_ES'
          headerTextIOS='Elige una Fecha'
          confirmTextIOS='Confirmar'
          cancelTextIOS='Cancelar'
        />
      <Text>{fecha}</Text>
      </View>
      <View>
        <Text style={styles.label}>Hora:</Text>
        <Button title="Seleccionar Hora" onPress={showTimePicker} />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
          locale='es_ES'
          headerTextIOS='Elige una Hora'
          confirmTextIOS='Confirmar'
          cancelTextIOS='Cancelar'
        />
      <Text>{hora}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintomas:</Text>
        <TextInput
          multiline
          style={styles.input}
          onChangeText={ texto => setSintomas(texto) }
        />
      </View>
       <View>
        <TouchableHighlight onPress={ () => crearNuevaCita() } style={styles.btnSubmit}>
          <Text style={styles.textoSubmit}>Agregar nueva cita</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 30,
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    color: '#3d3d3d',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoSubmit: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default Formulario;
