import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import {useFocusEffect} from '@react-navigation/core';
import {Button, List, Headline, FAB, Appbar} from 'react-native-paper';


const verResidenciales = ({navigation}) => {
  const [residencial, setResidencial] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const resultados = await ClientAxios.post(
            'residencial/getAllResidencial',
            {key: '291290336b75b259b77e181c87cc974f', data: {}},
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
    const {nombreResidencial, imgResi, nombreuser, nombrerent, fecha,  cantDias, ID_Usuario } = item;

    // console.log(item);
    return (
        <TouchableWithoutFeedback>
            <Card onPress={() => navigation.navigate('', { item, user })}>
                <Card.Content>
                    <Card.Cover source={{ uri: 'https://i.picsum.photos/id/863/700/700.jpg?hmac=0CH3HWqzcDYHNml_TBbqPWK1AY1te1JTmJXbb5UZpFY' }} />
                    <Title>{nombreResidencial}</Title>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => navigation.navigate('', { item })}>Detalles</Button>
                </Card.Actions>
            </Card>
        </TouchableWithoutFeedback>
    );
};


  return (
    <>
      <Appbar.Header> 
        <Appbar.Content title="Residenciales"/> 
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
        <Button
          icon="plus-circle"
          onPress={() => navigation.navigate('NuevaTorre')}>
          Nueva torre
        </Button>

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
