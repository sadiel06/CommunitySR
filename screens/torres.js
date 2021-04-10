import React, { useState } from 'react';
import { View } from "react-native";
import { TextInput, Button, } from 'react-native-paper';
import globalStyles from '../Styles/global';


const nuevaTorre = () => {
  const [nombre, setNombre]=useState('');
  const [cantidadPisos, setCantidad]=useState('');

  const guardarTorre=()=>{
    //validar form
    //verificar si es modificar o crear una torre
    //crear o modificar
    //limpiar form
    //redireccionar
  }

  return (
    <View style={globalStyles.contenedor}>
      <TextInput
        label='Nombre de la torre'
        placeholder='Residencia'
        style={globalStyles.inputs}
        onChangeText={texto => setNombre(texto)}
        value={nombre}
      />

      {/*cantidad de pisos  */}

      <TextInput
        label='Cantidad de pisos'
        placeholder='Residencia'
        style={globalStyles.inputs}
        onChangeText={texto => setCantidad(texto)}
        value={cantidadPisos}
      />
      <Button onPress={() => guardarTorre()}>Crear</Button>

    </View>
  );
}

export default nuevaTorre;

