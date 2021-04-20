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
import { Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { UPLOADIMG } from '../../helpers/uploadIMG';
const detalleSolicitudEmpleo = ({ navigation, route }) => {
  // return <Text>{route.params.item.descripcion}</Text>
  const [Solicitud, setSolicitud] = useState({});



  useEffect(() => {
    setSolicitud(route.params.item);
  }, []);
 
  const Aceptar= async(si)=>{
  //  console.log(Solicitud)

    try {
        const resultados = await ClientAxios.post(
          `complementos/${si?"convertirempleado":"rechazarempleado"}`,
          { key: '291290336b75b259b77e181c87cc974f', data: {idUser : Solicitud.idUser , idResi:Solicitud.idResidencial} },
        );
          navigation.goBack();
      //   console.log(JSON.stringify(resultados.data, null, 4))
      } catch (error) {
        console.log(error);
      }
}


  const [response, setResponse] = React.useState(null);
  
  // const handlePicker = () => {
  //   launchImageLibrary(
  //     {
  //       mediaType: 'photo',
  //       includeBase64: true,
  //       maxHeight: 200,
  //       maxWidth: 200,
  //     },
  //     async (response) => {
  //       setResponse(response);
  //       // alert(JSON.stringify(response, null, 2))
  //       const respuesta = await UPLOADIMG(response);
  //       alert(respuesta);
  //     },
  //   )
  // } 



  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detalle Solicitud" />
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
        <Card>
          <Card.Content>
            <Title>
              {Solicitud.nombre}
            </Title>
            <Paragraph>Residencial al que solicita:{Solicitud.nombreResi}</Paragraph>
            <Paragraph>Telefono: {Solicitud.celular}</Paragraph>
            


          </Card.Content>
          <Card.Actions>
            <Button onPress={()=>Aceptar(true)}>Aceptar</Button>
            <Button onPress={()=>Aceptar(false)}>Rechazar</Button>
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
export default detalleSolicitudEmpleo;
