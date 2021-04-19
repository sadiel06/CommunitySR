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

  const aceptar = async()=>{
    try {
      const resultados = await ClientAxios.post(
        'complementos/insertinquilinos',
        { key: '291290336b75b259b77e181c87cc974f', data: { idResi:notificacion.idResidencial, idDepart:notificacion.ID_departamento, idUser: notificacion.ID_usuario,idPerso:notificacion.IdPersona, nomDepartameto:notificacion.Nombre_departamento } },
      );
      
      console.log(JSON.stringify(resultados.data, null, 4))
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
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
              {notificacion.Nombre_departamento}
            </Title>
            <Paragraph>Nombre: {notificacion.nombrepersona}</Paragraph>
            <Paragraph>Contacto: {notificacion.celular}</Paragraph>
            

          </Card.Content>
          <Card.Actions>
            <Button onPress={aceptar}>Aceptar</Button>
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
