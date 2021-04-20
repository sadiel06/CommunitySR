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
const detalleDepartamento = ({ navigation, route }) => {
  // return <Text>{route.params.item.descripcion}</Text>
  const [apartamento, setApartamento] = useState({});



  useEffect(() => {
    setApartamento(route.params.item);
  }, []);
 



  const [response, setResponse] = React.useState(null);
  
  const handlePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      async (response) => {
        setResponse(response);
        // alert(JSON.stringify(response, null, 2))
        const respuesta = await UPLOADIMG(response);
        alert(respuesta);
      },
    )
  } 



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
              {apartamento.Nombre_departamento}
            </Title>
            <Paragraph>Precio alquiler: {apartamento.PrecioAlquiler}$</Paragraph>
            <Paragraph>{apartamento.VentaDiponible ? 'Disponible para ventas' : 'No disponible para ventas'}</Paragraph>
            <Paragraph> {apartamento.VentaDiponible ? 'Preacio de venta: $' + apartamento.PrecioVenta : ''}</Paragraph>


          </Card.Content>
          <Card.Actions>
            <Button onPress={handlePicker}>Agregar imagen</Button>
            <Button onPress={() => navigation.navigate('agregarServicios', apartamento)}>Ver servicios</Button>
          </Card.Actions>
        </Card>
        {response && (
          <View style={styles.imageContainer}>
            <Image
              style={{ width: 200, height: 200 }}
              source={{ uri: response.uri }}
            />
          </View>
        )}
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
export default detalleDepartamento;
