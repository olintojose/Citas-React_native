import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App: () => React$Node = () => {
  const [citas, setCitas] = useState([]);
  const [mostrarForm, guardarMostrarForm] = useState(false);
  //DEfinir el state de citas

  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
  };

  //muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };

  //ocultar teclado

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.container}>
        <Text style={styles.title}>Administrador de citas</Text>
        <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>
              {' '}
              {mostrarForm ? 'Ver Citas' : 'Crear citas'}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <Formulario
              citas={citas}
              setCitas={setCitas}
              guardarMostrarForm={guardarMostrarForm}
            />
          ) : (
            <>
              <Text style={styles.title}>
                {citas.length > 0
                  ? 'Administra tus citas'
                  : 'No hay citas, crea una'}
              </Text>

              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({item}) => (
                  <Cita item={item} eliminarPaciente={eliminarPaciente} />
                )}
                keyExtractor={(cita) => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2E2E3A',
    flex: 1,
  },
  title: {
    color: '#BBB8B2',
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 15,
    marginBottom: 7,
    fontSize: 24,
    fontWeight: 'bold',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#F34213',
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
