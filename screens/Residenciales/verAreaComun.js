import React, {useEffect, useState, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {Appbar, List, Headline, FAB} from 'react-native-paper';
import {FlatList, View, StyleSheet} from 'react-native';
import globalStyles from '../../Styles/global';
import {AppContext} from '../../context/AppContext';
import ClientAxios from '../../helpers/clientAxios';
import {set} from 'react-hook-form';
import ScreenHeader from '../../components/ScreenHeader';

const verAreasComunes = ({navigation, route}) => {
  const [AreasComunes, setTServicios] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {//areas/getAreasbyResidencial
        console.log(route.params)
        try {
          const resultados = await ClientAxios.post('areas/getAreasbyResidencial', {
            key: '291290336b75b259b77e181c87cc974f',
            data: {idResi: route.params.id},
          });
          setTServicios(resultados.data);
          console.log(resultados.data);
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
      <ScreenHeader title="Servicios">
        <View style={globalStyles.contenedor}>
          <Headline style={globalStyles.titulo}>
            {AreasComunes.length > 0
              ? 'Servicios'
              : 'Aún no tiene servicios registrados'}
          </Headline>
          <FlatList
            data={AreasComunes}
            keyExtractor={servicios => servicios.id.toString()}
            renderItem={({item}) => (
              <List.Item
                title={item.Descripcion}
                onPress={() => navigation.navigate('verDepartamentos', {item})}
              />
            )}
          />

          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() =>
              navigation.navigate('NuevoServicio', {id: route.params.id})
            }
          />
        </View>
      </ScreenHeader>
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
export default verAreasComunes;
