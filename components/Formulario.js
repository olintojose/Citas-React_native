import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = (citasActuales, setCitas, guardarMostrarForm) => {
  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarDueno] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');
  const [sintomas, guardarSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    // console.log(date);
    //  const opciones = {year: 'numeric', month: 'short', day: 'numeric'};
    //console.log(date.toLocaleDateString('es-ES', opciones));
    guardarFecha(getDateString(date));
    //  console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  function getDateString(date) {
    if (Platform.OS === 'ios')
      return date.toLocaleDateString('en-US', {
        weekday: 'short',

        day: 'numeric',

        month: 'long',

        year: 'numeric',
      });
    else {
      var dayOfWeek = [
          'Lunes',
          'Martes',
          'Miercoles',
          'Jueves',
          'Viernes',
          'Sabado',
          'Domingo',
        ],
        monthName = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',

          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        utc = date.getTime() + date.getTimezoneOffset() * 60000,
        US_time = utc + 3600000 * -4,
        US_date = new Date(US_time);

      return (
        dayOfWeek[US_date.getDay() - 1] +
        ', ' +
        US_date.getDate() +
        ' de ' +
        monthName[US_date.getMonth()] +
        ', del ' +
        US_date.getFullYear()
      );
    }
  }
  /////// Muestra u oculta el time piker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = (hora) => {
    //console.warn('A date has been picked: ', date);
    const opcionesHora = {hour: 'numeric', minute: '2-digit', is24Hour: false};
    hideTimePicker();
    guardarHora(hora.toLocaleTimeString('en-EN', opcionesHora));
  };

  //Crear nueva cita
  const crearNuevaCita = () => {
    console.log('Crear nueva cita');
    //Validar
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      mostrarAlerta();
      console.log('Algo Fallo');
      return;
    }
    //crear una nueva cita
    const cita = {paciente, propietario, telefono, fecha, hora, sintomas};

    cita.id = shortid.generate();

    //Agregar al State
    console.log(citasActuales);
    //const citasNuevo = [...citas, cita];
    //setCitas(citasNuevo);
    setCitas((citasNuevo) => [...citasActuales, cita]);

    // // // //Ocultar el formulario

    guardarMostrarForm(false);

    // console.log('5');

    //reset al formulario
  };

  // Muestra alerta si falla validacion

  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //Titulo
      'Todos los campos son obligatorios', // DEscripcion
      [
        {
          text: 'Ok', // Arreglo de botones
        },
      ],
    );
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => guardarPaciente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => guardarDueno(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Telefono contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => guardarTelefono(texto)}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige una hora"
            cancelTextIOS="Cancelar"
            ConfirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
          />
          <Text>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => guardarSintomas(texto)}
            multiline
          />
        </View>

        <TouchableHighlight
          onPress={() => crearNuevaCita()}
          style={styles.btnSubmit}>
          <Text style={styles.textoSubmit}> Guardar</Text>
        </TouchableHighlight>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#2E2E3A',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
    color: '#BBB8B2',
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#BBB8B2',
    borderWidth: 1,
    borderStyle: 'solid',
    color: '#fff',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#BC5D2E',
    marginVertical: 10,
  },
  textoSubmit: {
    color: '#BBB8B2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
