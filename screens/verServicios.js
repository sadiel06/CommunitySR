import React, {useEffect, useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {Button, List, Headline, FAB} from 'react-native-paper';
import {FlatList, View, StyleSheet} from 'react-native';
import globalStyles from '../Styles/global';
import {AppContext} from '../context/AppContext';
import ClientAxios from '../helpers/clientAxios';
import {set} from 'react-hook-form';

const verTorre = ({navigation, route}) => {
  const [servicios, setTServicios] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const resultados = await ClientAxios.post('servicios/getservicios', {
            key: '291290336b75b259b77e181c87cc974f',
            data: {id: route.params.item.id},
          });
          setTServicios(resultados.data);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
      return () => console.log('on cleanup');
    }, []),
  );

  return (
    <>
      <View style={globalStyles.contenedor}>
        <Button
          icon="plus-circle"
          onPress={() =>
            navigation.navigate('NuevoServicio', route.params.item.id)
          }>
          Nuevo Servicio
        </Button>
        <Headline style={globalStyles.titulo}>
          {servicios.length > 0 ? 'Servicios' : 'Aún no tiene servicios registrados'}
        </Headline>
        <FlatList
          data={servicios}
          keyExtractor={servicios => servicios.id.toString()}
          renderItem={({item}) => (
            <List.Item
              title={item.nombre}
              onPress={() => navigation.navigate('verDepartamentos', {item})}
            />
          )}
        />
        <Button icon="plus-circle" onPress={() => console.log('servicios')}>
          Servicios
        </Button>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() =>
            navigation.navigate('NuevoServicio', route.params.residencial, {
              setConsultar,
            })
          }
        />
      </View>
    </>
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
