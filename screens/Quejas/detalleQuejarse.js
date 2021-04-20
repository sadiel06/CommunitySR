import React, {useEffect, useState} from 'react';
import {View, ToastAndroid,Text} from 'react-native';
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
  console.log(route.params)
  useEffect(() => {
    setQueja(route.params.item);
  }, []);


//   const Rechazar = async () => {
    
//   try {
//     const res = await ClientAxios.post('queja/aprobar', {
//       key: '291290336b75b259b77e181c87cc974f',
//       data: {idQueja: queja.ID, aprobar:'2'},
//     });
//     if (res.data.key === '1') {
//       console.log(res.data);
//     } else {
//       throw Error('No se ha podido completar');
//     }
//   } catch (error) {
//     console.log(error);
//     alert(error);
//   }
//   ToastAndroid.show('Se Rechazado la Queja. !', ToastAndroid.SHORT);
//   navigation.navigate('verQuejas');
//   //limpiar form
//   //redireccionar
// };
//  nombrepersona, nombreDepartamento, nobrePresunto, nombreResi,i

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={()=>navigation.goBack()}/>
        <Appbar.Content title="Detalle Queja" />
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
        <Card>
          <Card.Content>
            <Title>
              {`desde ${queja.nombre} hacia ${queja.nombrePresunto}`} 
            </Title> 
            <Paragraph>Residencial: {queja.NombreResi}</Paragraph>
            <Paragraph>Ubicacion del presunto: {queja.descripcion}</Paragraph>
            <Paragraph>Nombre del presunto: {queja.nobrePresunto}</Paragraph>

          </Card.Content>
          <Card.Actions>
            <Button onPress={()=>console.log('')}>Resuelto</Button>
            <Button onPress={()=>console.log('')}>Rechazado</Button>
          </Card.Actions>
        </Card>
      </View>
    </>
  );
};

export default DetalleQuejas;
