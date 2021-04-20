import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/core';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import DropDown from 'react-native-paper-dropdown'
const listaDirigido = [{ label: 'La administración', value: '1' }, { label: 'Un residente', value: '2' }]
const NuevaQueja = ({ navigation, route }) => {
  const [queja, setQueja] = useState({ descripcion: '', cantAdvertencia: 1, limite: 5, costo: '', idResi: '' })
  const [dirigido,setDirigido] =useState('')
  const [verDirigido, setVerDirigido] = useState(false);
  const [isEditando,setIsEditando] = useState(false)
  const [idResi,setIdResi]=useState(-1)
  useFocusEffect(
    React.useCallback(() => {
      if (
        route.params?.item
      ) {
        setDescripcion(route.params.item.Descripcion)
        
        setIsEditando(true)
      }
      return () => console.log('on cleanup');
    }, []),
  );
  const guardarQueja = async () => {
    //validar

    //declarar objeto
    // setQueja({  ...queja ,idResi: route.params.id,})

     setQueja({...queja, idResi:route.params.id})
    const Queja ={
      ...queja,
      diriguido:dirigido
    }
   
 
    
    try {
        const res = await ClientAxios.post('quejas/insert', {
          key: '291290336b75b259b77e181c87cc974f',
          data: Queja,
        });
        if (res.data.key === '1') {
        //   alert('Se completó');
        //   navigation.navigate('verDepartamentos');
          navigation.goBack()
        } else {
          throw Error('No se ha podido completar');
        }
      } catch (error){
        console.log(error);
        alert(error);
      }
    //redireccionar a otra pantalla

    
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={()=>navigation.goBack()}/>
        <Appbar.Content title="Nueva queja" />
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
        <TextInput
          label="Descripción"
          placeholder=""
          style={globalStyles.inputs}
          onChangeText={texto => setQueja({ ...queja, descripcion: texto })}
          value={queja.descripcion}
        />
        <TextInput
          label="Multa"
          placeholder="Residencia"
          style={globalStyles.inputs}
          onChangeText={texto => setQueja({  ...queja ,costo: texto})}
          value={queja.costo}
          keyboardType="numeric"
        />
        <TextInput
          label="Cantidad de advertencias"
          style={globalStyles.inputs}
          onChangeText={texto => setQueja({  ...queja ,cantAdvertencia: texto})}
          value={queja.cantAdvertencia}
          keyboardType="numeric"
        />

        <TextInput
          label="Limite"
          style={globalStyles.inputs}
          onChangeText={texto => setQueja({ ...queja, limite: texto  })}
          value={queja.limite}
          keyboardType="numeric"
        />

        <View style={globalStyles.inputs}>
          <DropDown
            label={'Dirigido a:'}
            mode="outlined"
            value={dirigido}
            setValue={setDirigido}
            list={listaDirigido}
            visible={verDirigido}
            showDropDown={() => setVerDirigido(true)}
            onDismiss={() => setVerDirigido(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,
            }}
          />
        </View>

        <Button mode='contained' onPress={() => guardarQueja()}>Crear</Button>
      </View>
    </>
  );
};

export default NuevaQueja;
