import React, { useEffect, useState } from 'react';
import { View, ToastAndroid, Text } from 'react-native';
import {
  Button,
  Appbar,
  Card,
  Title,
  Paragraph,
  Portal,
  Modal,
  TextInput

} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/core';
import DropDown from 'react-native-paper-dropdown';
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
  const [listaDeSuscripciones, setlistaDeSuscripciones] = useState([])
  const [suscripcion, setSuscripcion] = useState('');
  const [verSuscripcion, setVerSuscripcion] = useState(false);


  const [visible, setVisible] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setNotificacion(route.params.item);
      const getData = async () => { 
       console.log(route)
        try {
          const resultados = await ClientAxios.post(
            'complementos/listaplanes',
            { key: '291290336b75b259b77e181c87cc974f', data: { idResi: route.params.item.idResidencial } },
          );
          setlistaDeSuscripciones(resultados.data);
          console.log(JSON.stringify(resultados.data, null, 4))
        } catch (error) {
          console.log(error);
        }
      };
      getData();
      return () => console.log('on cleanup');
    }, []),
  );

  
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  
  const aceptar = async () => {
// console.log(notificacion)
if(suscripcion===''){
  alert('suscripcion')
  return
}
//     return
    try {
      const resultados = await ClientAxios.post(
        'complementos/insertinquilinos',
        { key: '291290336b75b259b77e181c87cc974f', data: { idPlan:suscripcion,idResi: notificacion.idResidencial, idDepart: notificacion.ID_departamento, idUser: notificacion.ID_usuario, idPerso: notificacion.IdPersona, nomDepartameto: notificacion.Nombre_departamento } },
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
            <Button onPress={()=>showModal()}>Aceptar</Button>
          </Card.Actions>
        </Card>

      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', paddingVertical: 100, paddingHorizontal: 10 }} style={{
          paddingHorizontal: 10
        }}>
          <View >
            <Text style={{ marginBottom: 10, fontWeight: 'bold', }}>Selecione su modo de inicio</Text>
            <DropDown
              label={'Selecciona su modo de'}
              mode="outlined"
              value={suscripcion}
              setValue={e => {
                //alert(e)

                setSuscripcion(e)
              }}
              list={listaDeSuscripciones}
              visible={verSuscripcion}
              showDropDown={() => setVerSuscripcion(true)}
              onDismiss={() => setVerSuscripcion(false)}
              inputProps={{
                right: <TextInput.Icon name={'menu-down'} />,
              }}

            />
            <Button mode='contained' style={{ marginTop: 10 }} onPress={() => {
              // setUser({ ...dataResult, rol: sector });
              aceptar()
              hideModal()
              navigation.replace('Stack');
            }}>Ok</Button>
          </View>

        </Modal>
      </Portal>

    </>
  );
};


export default detalleNotificacion;
