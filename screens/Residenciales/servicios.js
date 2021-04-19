import React, {useState,useEffect} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import ScreenHeader from '../../components/ScreenHeader';
import {useFocusEffect} from '@react-navigation/core';

const NuevoServicio = ({navigation, route}) => {
  const [descripcion, setDescripcion] = useState('');
  const [cobro, setCobro] = useState('');
  const [pago, setPago] = useState('');
  const [isEditando, setIsEditando] =useState(false);
  
  useFocusEffect(
    React.useCallback(() => {
      if (
        route.params?.item
      ) {
        setDescripcion(route.params.item.Descripcion)
        setCobro(route.params.item.cobro.toString())
        setPago(route.params.item.pago.toString())
        setIsEditando(true)
      }
      return () => console.log('on cleanup');
    }, []),
  );

  const guardarServicios = async () => {
    //validar
    // console.log(JSON.stringify(route.params,null,4))
    if (
      descripcion === '' ||
        isNaN(cobro) ||
        isNaN(pago)
      ) {
        alert('Revise los campos');
        return;
      }
    //declarar objeto
    const servicio = {
      descripcion,
      cobro:Number(cobro),
      pago:Number(pago),
      idResi:Number(route.params.idResidencial),
      idresidencial:Number(route.params.idResidencial),
      id:route.params.item?.id
      };
   
    //insert cantidadPisos 
    try {
        const res = await ClientAxios.post(`servicios/${isEditando?'update':'insert'}`, {
          key: '291290336b75b259b77e181c87cc974f',
          data: servicio,
        });
        if (res.data.key === '1') {
          // alert('Se completó');
          // navigation.navigate('verDepartamentos');
          navigation.goBack()
        } else {
          throw Error('No se ha podido completar');
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    //redireccionar a otra pantalla
    console.log(servicio);
  };

  return (
    <ScreenHeader title='Nuevo Servicio'>
    <View style={globalStyles.contenedor}>
      <TextInput
        label="Descripción"
        placeholder="nombre servicio"
        style={globalStyles.inputs}
        onChangeText={texto => setDescripcion(texto)}
        value={descripcion}
      />
      <TextInput
        label="Costo del servicio"
        placeholder="Residencia"
        style={globalStyles.inputs}
        onChangeText={texto => setPago(texto)}
        value={pago}
        keyboardType="numeric"
      />
      <TextInput
        label="Cobro por el servicio"
        placeholder="Residencia"
        style={globalStyles.inputs}
        onChangeText={texto => setCobro(texto)}
        value={cobro}
        keyboardType="numeric"
      />

      <Button mode='contained' onPress={() => guardarServicios()}>{isEditando?'Editar':'Crear'}</Button>
    </View>
    </ScreenHeader>
  );
};

export default NuevoServicio;
