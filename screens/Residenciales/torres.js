import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/core';

import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios'
import ScreenHeader from '../../components/ScreenHeader';
const nuevaTorre = ({navigation,route}) => {
  const [isEditando, setIsEditando] = useState(false);
  const [IdTorre,setIdTorre]=useState()
  const [nombre, setNombre] = useState('');
  const [cantidadPisos, setCantidad] = useState('');
  console.log(route.params)

  useFocusEffect(
    React.useCallback(() => {
      if (
        route.params?.item
      ) {
        setIdTorre(route.params?.item.id)
        // console.log(
        //   JSON.stringify(
        //     route.params, null, 4
        //   )
        // )
        setNombre(route.params.item.nombre)
        setCantidad(route.params.item.cantidadniveles.toString())
        setIsEditando(true)
      }
      return () => console.log('on cleanup');
    }, []),
  );

  const guardarTorre = async () => {
    //validar form
    if (
      nombre === '' ||
      isNaN(cantidadPisos)
    ) {
      alert('Revise los campos');
      return;
    }
    //verificar si es modificar o crear una torre

    //crear o modificar
    const torres = {
      nombre,
      idresidencial:Number(isEditando? route.params.item.idresidencial : route.params.id),
      niveles: Number(cantidadPisos),
      id:Number(IdTorre)
    };
    
    
    //insert
    try {
      const res = await ClientAxios.post(`torre/${isEditando?'update':'insert'}`, {
        key: '291290336b75b259b77e181c87cc974f',
        data: torres,
      });
      if (res.data.key === '1') {
        // alert('Se completó');
        navigation.navigate('verTorres');
      } else {
        throw Error('No se ha podido completar');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
    
    //limpiar form
    //redireccionar
  };

  return (
    <ScreenHeader title={isEditando?'Editando':'Nueva torre'}>
    <View style={globalStyles.contenedor}>
      <TextInput
        label="Nombre de la torre"
        placeholder="Residencia"
        style={globalStyles.inputs}
        onChangeText={texto => setNombre(texto)}
        value={nombre}
      />
      <TextInput
        label="Cantidad de pisos"
        placeholder="Residencia"
        style={globalStyles.inputs}
        onChangeText={texto => setCantidad(texto)}
        value={cantidadPisos}
        keyboardType="numeric"
      />
      <Button onPress={() => guardarTorre()} mode='contained'>{isEditando?'Editar':'Crear'}</Button>
    </View>
    </ScreenHeader>
  );
};

export default nuevaTorre;
