import React, {useEffect, useState} from 'react';
import {View, ToastAndroid} from 'react-native';
import {
  Button,
  Appbar,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';

const DetalleQuejas = ({navigation, route}) => {
  // return <Text>{route.params.item.descripcion}</Text>
  const [queja, setQueja] = useState({});
  
  useEffect(() => {
    setQueja(route.params.item);
  }, []);

  const Aprobar = async () => {
      
    try {
      const res = await ClientAxios.post('queja/aprobar', {
        key: '291290336b75b259b77e181c87cc974f',
        data: {idQueja: queja.ID, aprobar:'1'},
      });
      if (res.data.key === '1') {
        console.log(res.data);
      } else {
        throw Error('No se ha podido completar');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
    ToastAndroid.show('Se completó la Queja. !', ToastAndroid.SHORT);
    navigation.navigate('verQuejas');
    //limpiar form
    //redireccionar
  };

  const Rechazar = async () => {
    
  try {
    const res = await ClientAxios.post('queja/aprobar', {
      key: '291290336b75b259b77e181c87cc974f',
      data: {idQueja: queja.ID, aprobar:'2'},
    });
    if (res.data.key === '1') {
      console.log(res.data);
    } else {
      throw Error('No se ha podido completar');
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
  ToastAndroid.show('Se Rechazado la Queja. !', ToastAndroid.SHORT);
  navigation.navigate('verQuejas');
  //limpiar form
  //redireccionar
};


  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Detalle Queja" />
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
        <Card>
          <Card.Content>
            <Title>
              {queja.nombre + ' - ' + queja.nombreResi} 
            </Title>
            <Paragraph>Descripcion: {queja.descripcion}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => Aprobar()}>Aprobar</Button>
            <Button onPress={() => Rechazar()}>Rechazar</Button>
          </Card.Actions>
        </Card>
      </View>
    </>
  );
};

export default DetalleQuejas;
