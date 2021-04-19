import React, { useState, useContext } from 'react';
import { FlatList, View, TouchableWithoutFeedback } from 'react-native';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import { useFocusEffect } from '@react-navigation/core';
import { Button, List, Headline, FAB, Appbar, Card, Title, } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';
import { Right } from 'native-base';

const verResidenciales = ({ navigation }) => {
  const [pagos, setPagos] = useState([]);
  const { user } = useContext(AppContext);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        // console.log(JSON.stringify(user,null,4))
        // return
        try {
          const resultados = await ClientAxios.post(
            'usuario/cuentaxcobrar',
            {
              key: '291290336b75b259b77e181c87cc974f', data: {
                idUser: 1
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

  const pagar = async() => {
    try {
      const resultados = await ClientAxios.post(
        'usuario/cuentaxcobrar',
        {
          key: '291290336b75b259b77e181c87cc974f', data: {
            idUser: 1
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


      </View>
      <Button mode='contained' >Pagar</Button>
    </>
  );
};

export default verResidenciales;
