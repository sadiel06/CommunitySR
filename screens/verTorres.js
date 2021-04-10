import React, {useEffect, useState, useContext} from 'react';
import {Button, List, Headline, FAB} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import globalStyles from '../Styles/global';
import {AppContext} from '../context/AppContext';
import ClientAxios from '../helpers/clientAxios';

const verTorre = ({navigation, route}) => {
  const {user} = useContext(AppContext);

  const [torres, setTorres] = useState([]);

  const [residencial, setResidencial] = useState({});

  useEffect(() => {
    setResidencial(route.params.item);
    const getData = async () => {
      try {
        const response = await ClientAxios.post('torre/gettorres', {
          key: '291290336b75b259b77e181c87cc974f',
          data: {id: route.params.item.id},
        });
        console.log(response.data);
        setTorres(response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    getData();
  }, [route.params.item]);

  return (
    <>
      <View style={globalStyles.contenedor}>
        <Button
          icon="plus-circle"
          onPress={() => navigation.navigate('NuevaTorre', {setConsultar})}>
          Nueva torre
        </Button>
        <Headline style={globalStyles.titulo}>
          Tu eres el usuario {user.nombre}
          Nombre: {residencial.nombre}
          {torres.length > 0 ? 'Torres' : 'Aún no tiene torres regiistradas'}
        </Headline>
        <FlatList
          data={torres}
          keyExtractor={torres => torres.id.toString()}
          renderItem={({item}) => (
            <List.Item
              title={item.descripcion}
              onPress={() => navigation.navigate('NuevoResidencial', {item})}
            />
          )}
        />

        <FAB
          icon="plus"
          style={globalStyles.fab}
          onPress={() =>
            navigation.navigate('verDepartamentos', route.params.residencial, {
              setConsultar,
            })
          }
        />
      </View>
    </>
  );
};

export default verTorre;
