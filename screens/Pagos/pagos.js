import React, { useState, useContext } from 'react';
import { FlatList, View, TouchableWithoutFeedback } from 'react-native';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import { useFocusEffect } from '@react-navigation/core';
import { Button, Text,List, Headline, FAB, Appbar, Card, Title, Portal, Modal } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';
import { Right } from 'native-base';

const verResidenciales = ({ navigation }) => {
  const [pagos, setPagos] = useState([]);
  const { user } = useContext(AppContext);
  const showModal = () => setVisible(true);
  const [visible, setVisible] = React.useState(false);
  const hideModal = () => setVisible(false);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {

        try {
          const resultados = await ClientAxios.post(
            'usuario/cuentaxcobrar',
            {
              key: '291290336b75b259b77e181c87cc974f', data: {
                idUser: user.idUsuario
              }
            },
          );
          setPagos(resultados.data);

        } catch (error) {
          console.log(error);
        }
      };
      getData();
      return () => console.log('on cleanup');
    }, []),
  );

  const pagar = async () => {
    try {
      const resultados = await ClientAxios.post(
        'usuario/simulacionpago',
        {
          key: '291290336b75b259b77e181c87cc974f', data: {
            idUser: user.idUsuario
          }
        },
      );
      setPagos(resultados.data);

    } catch (error) {
      console.log(error);
    }

  }


  const Cartas = ({ item }) => {
    const { definicion, monto } = item;

    return (
      <TouchableWithoutFeedback>
        <Card onPress={() => console.log('carta')} >
          <Card.Content>
            <Title>{definicion + ' - $' + monto}</Title>

          </Card.Content>
          <Card.Actions>
          </Card.Actions>
        </Card>
      </TouchableWithoutFeedback>
    );
  };


  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Pagos pendientes" />
      </Appbar.Header>

      <View style={globalStyles.contenedor}>

        <FlatList
          data={pagos}

          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <Cartas item={item} />}

        />
        <Title >Total:{ }</Title>

      </View>
      <Button mode='contained' onPress={() => showModal()}>Pagar</Button>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', paddingVertical: 100, paddingHorizontal: 10 }} style={{
          paddingHorizontal: 10
        }}>
          <View >
            <Text style={{ marginBottom: 10, fontWeight: 'bold', }}>Pago Stripe</Text>

            <Button mode='contained' style={{ marginTop: 10 }} onPress={() => {
             pagar();
              hideModal();

            }}>Pago Stripe</Button>
          </View>

        </Modal>
      </Portal>

    </>
  );
};

export default verResidenciales;
