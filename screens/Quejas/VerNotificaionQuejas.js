import React, { useState, useContext } from 'react';
import { FlatList, View, TouchableWithoutFeedback } from 'react-native';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import { useFocusEffect } from '@react-navigation/core';
import { Button, List, Headline, FAB, Appbar, Card, Title, Text } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';

const verNotQuejas = ({ navigation }) => {
  const [Notificaciones, setNotificaciones] = useState([]);
  const { user } = useContext(AppContext);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const resultados = await ClientAxios.post(
            'quejas/listaquejasbyuser',
            { key: '291290336b75b259b77e181c87cc974f', data: { idUser: user.idUsuario } },
          );
          setNotificaciones(resultados.data);
          console.log(JSON.stringify(resultados.data, null, 4))
        } catch (error) {
          console.log(error);
        }
      };
      getData();
      return () => console.log('on cleanup');
    }, []),
  );

  const CardResid = ({ item }) => {
    const { nombrepersona, nombreDepartamento, nobrePresunto, nombreResi, } = item;
    //<Button onPress={() => navigation.navigate('', { item })}>Detalles</Button>
    // console.log(item);
    return (
      <TouchableWithoutFeedback>
        <Card onPress={() => navigation.navigate('DetalleNotificacionesQuejas', { item }) } >
          <Card.Content>
            <Title>Nombre: {nombrepersona}</Title>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('DetalleNotificacionesQuejas', { item })}>Detalles</Button>

          </Card.Actions>
        </Card>
      </TouchableWithoutFeedback>
    );
  };


  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Notificaciones" />
      </Appbar.Header>
      <View style={globalStyles.contenedor}>

        <FlatList
          data={Notificaciones}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <CardResid item={item} />}

        />


      </View>
    </>
  );
};

export default verNotQuejas;
