import React, { useEffect, useState } from 'react';
import { View, ToastAndroid, Text } from 'react-native';
import {
  Button,
  Appbar,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { StyleSheet } from 'react-native';
import logo from '../../src/logo10.png'
import { Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { UPLOADIMG } from '../../helpers/uploadIMG';


const detalleNotificacion = ({ navigation, route }) => {
  // return <Text>{route.params.item.descripcion}</Text>
  const [notificacion, setNotificacion] = useState({});

  useEffect(() => {
    setNotificacion(route.params.item);
  }, []);


  //   const [response, setResponse] = React.useState(null);

  //   const handlePicker = () => {
  //     launchImageLibrary(
  //       {
  //         mediaType: 'photo',
  //         includeBase64: true,
  //         maxHeight: 200,
  //         maxWidth: 200,
  //       },
  //       async (response) => {
  //         setResponse(response);
  //         // alert(JSON.stringify(response, null, 2))
  //         const respuesta = await UPLOADIMG(response);
  //         alert(respuesta);
  //       },
  //     )
  //   } 

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detalle Apartamento" />
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
        <Card>
          <Card.Content>
            <Title>
              {notificacion.Nombre_departamento}
            </Title>
            <Paragraph>Precio alquiler: {notificacion.PrecioAlquiler}$</Paragraph>
            <Paragraph>{notificacion.VentaDiponible ? 'Disponible para ventas' : 'No disponible para ventas'}</Paragraph>
            <Paragraph> {notificacion.VentaDiponible ? 'Preacio de venta: $' + notificacion.PrecioVenta : ''}</Paragraph>

          </Card.Content>
          <Card.Actions>
            <Button onPress={handlePicker}>Aceptar</Button>
          </Card.Actions>
        </Card>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  body: { flex: 1 },
});
export default detalleNotificacion;
