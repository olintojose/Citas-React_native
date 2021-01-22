import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Cita from './components/Cita'
import Formulario from './components/Formulario'

const App: () => React$Node = () => {
  //DEfinir el state de citas

  const [citas, setCitas] = useState([
    {id: '1', paciente: 'Hulk', propietario: 'Oliver', sintomas: 'Come mucho'},
    {
      id: '2',
      paciente: 'Thor',
      propietario: 'Valery',
      sintomas: 'Duerme mucho',
    },
    {
      id: '3',
      paciente: 'Loki',
      propietario: 'Victoria',
      sintomas: 'Ladra mucho',
    },
    {
      id: '4',
      paciente: 'Ironman',
      propietario: 'Yenny',
      sintomas: 'Ladra mucho',
    },
  ]);

  //Elimina los pacientes del state
  const eliminarPaciente = id => {
    setCitas ( (citasActuales ) => {
      return citasActuales.filter( cita => cita.id !== id )
    })
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Administrador de citas</Text>
        <Formulario />
        <Text style={styles.title}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, crea una' }</Text>
       
        <FlatList
          data={citas}
          renderItem={({item}) => <Cita item={item} eliminarPaciente={eliminarPaciente} />}
          keyExtractor={(cita) => cita.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3F51B5',
    flex: 1,
  },
  title: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
