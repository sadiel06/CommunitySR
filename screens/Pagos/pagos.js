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

const PagosResidente = ({navigation, route}) => {
  // return <Text>{route.params.item.descripcion}</Text>
  const [residente, setResidente] = useState({});
  
  useEffect(() => {
    setResidente(route.params.item);
  }, []);

  const Completar = async () => {
      
    try {
      const res = await ClientAxios.post('tarea/completar', {
        key: '291290336b75b259b77e181c87cc974f',
        data: {idPago: residente.ID, userRes:'1'},
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

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Detalle Queja" />
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
        <Card>
          <Card.Content>
            <Title>
              {residente.nombre + ' - ' + residente.nombreArea} 
            </Title>
            <Paragraph>Descripcion: {residente.cantDias}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => Completar()}>Completar</Button>
          </Card.Actions>
        </Card>
      </View>
    </>
  );
};

export default PagosResidente;
