import React, {useEffect, useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {Button, List, Headline, FAB} from 'react-native-paper';
import {FlatList, View, StyleSheet} from 'react-native';
import globalStyles from '../../Styles/global';
import {AppContext} from '../../context/AppContext';
import ClientAxios from '../../helpers/clientAxios';
import ScreenHeader from '../../components/ScreenHeader';


const verTorre = ({navigation, route}) => {
  const [torres, setTorres] = useState([]);
  const { user } = useContext(AppContext);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const resultados = await ClientAxios.post('torre/gettorres', {
            key: '291290336b75b259b77e181c87cc974f',
            data: {id: route.params.item.id},
          });
          setTorres(resultados.data);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
      return () => console.log('on cleanup');
    }, []),
  );

  return (
    <ScreenHeader title="Torres">
      <View style={globalStyles.contenedor}>
        <View >
        <Button
          icon="plus-circle"
          onPress={() =>
            navigation.navigate('NuevoResidencial', route.params.item)
          }>
          Editar Residencial
        </Button>
        <Button
          icon="plus-circle"
          onPress={() =>
            navigation.navigate('AreasComunes',route.params.item)
          }>
          áreas Comunes
        </Button>
        </View>


        <Headline style={globalStyles.titulo}>
          {torres.length > 0 ? 'Torres' : 'Aún no tiene torres registradas'}
        </Headline>
        <FlatList
          data={torres}
          keyExtractor={torres => torres.id.toString()}
          renderItem={({item}) => (
            <List.Item
              title={item.nombre}
              // navigation.navigate('verDepartamentos', {item})
              onPress={() => navigation.navigate('verDepartamentos', {item})}
            />
          )}
        />
        <Button
          icon="plus-circle"
          onPress={() =>
            navigation.navigate('verServicios', route.params.item)
          }>
          Servicios
        </Button>
        <Button
          icon="plus-circle"
          onPress={() => navigation.navigate('verQuejas', route.params.item)}>
          Quejas
        </Button>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() =>
            navigation.navigate('NuevoResidencial', route.params.item)
          }
        />
      </View>
    </ScreenHeader>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 55,
    right: 0,
    bottom: 0,
  },
});
export default verTorre;
