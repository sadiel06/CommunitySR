import React, { useState,useContext } from 'react';
import { View,ToastAndroid } from "react-native";
import { TextInput, Button, } from 'react-native-paper';
import globalStyles from '../../Styles/global';
import AppContext from '../../context/AppContext'
import ClientAxios from '../../helpers/clientAxios/'

const areaComun = ({navigation,route}) => {
    // const {user} = useContext(AppContext);
const [nombre,setNombre]=useState('');
const [descripcion,setDescripcion]=useState('');
const guardarArea=async()=>{
    //validar form
    if(descripcion===''||nombre===''){
        alert('existen campos vacíos')
        return
    }
    //verificar si es modificar o crear una torre

    //crear o modificar
    const areaComun={
        descripcion : descripcion,
        nombre:nombre,
        idResi:route.params.id,
        
    }

    try {
        const res = await ClientAxios.post('areas/insert', {
          key: '291290336b75b259b77e181c87cc974f',
          data: areaComun,
        });
        if (res.data.key === '1') {
          console.log(res.data);
          // ToastAndroid.show('Se completó la avería. !', ToastAndroid.SHORT);
          navigation.goBack();
        } else {
          throw Error('No se ha podido completar');
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }

    //limpiar form

    //redireccionar
  }
    return (
        <View style={globalStyles.contenedor}>
            <TextInput
                label='Nombre del área común'
                style={globalStyles.inputs}
                onChangeText={texto => setNombre(texto)}
                value={nombre}
                
            />

            <TextInput
                mode='outlined'
                placeholder='breve descripción'
                style={globalStyles.inputs}
                onChangeText={texto => setDescripcion(texto)}
                value={descripcion}
                multiline={true}
                numberOfLines={10}
            />
            <Button onPress={() => guardarArea()}>Crear</Button>
        </View>
    );
}

export default areaComun;
