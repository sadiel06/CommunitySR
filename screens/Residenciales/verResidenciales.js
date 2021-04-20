import React, { useState, useContext } from 'react';
import { FlatList, View, TouchableWithoutFeedback } from 'react-native';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import { useFocusEffect } from '@react-navigation/core';
import { Button, List, Headline, FAB, Appbar, Card, Title, } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';

const verResidenciales = ({ navigation }) => {
  const [residencial, setResidencial] = useState([]);
  const { user } = useContext(AppContext);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {

        try {
          const resultados = await ClientAxios.post(
            'residencial/getresidenciales',
            { key: '291290336b75b259b77e181c87cc974f', data: {idUser:user.idUsuario} },
          );
          setResidencial(resultados.data);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
      return () => console.log('on cleanup');
    }, []),
  );

  const CardResid = ({ item }) => {
    const { nombre,imgPortada } = item;
    //<Button onPress={() => navigation.navigate('', { item })}>Detalles</Button>
    // console.log(item); 
    //  <Button onPress={() => navigation.navigate('verTorres', item)}>Detalles</Button>
    return (
      <TouchableWithoutFeedback>
        <Card onPress={() => navigation.navigate('verTorres', item)} >
          <Card.Content>
            <Card.Cover source={{ uri: imgPortada }} />
            <Title>{nombre}</Title>
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
        <Appbar.Content title="Residenciales" />
      </Appbar.Header>

      <Button onPress={()=>navigation.navigate('Mantenimiento',residencial)}>Mantenimientos Areas comunes</Button>
      <View style={globalStyles.contenedor}>
        <Headline style={globalStyles.titulo}>
          {residencial.length > 0
            ? 'Residenciales'
            : 'Aún no tiene residenciales'}
        </Headline>
        <FlatList
          data={residencial}

          keyExtractor={residencial => residencial.id.toString()}
          renderItem={({ item }) => <CardResid item={item} />}

        />

        <FAB
          icon="plus"
          style={globalStyles.fab}
          onPress={() => navigation.navigate('NuevoResidencial')}
        />
      </View>
    </>
  );
};

export default verResidenciales;
