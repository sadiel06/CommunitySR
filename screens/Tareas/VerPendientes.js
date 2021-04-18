import React, { useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { Appbar, List, Headline, FAB } from 'react-native-paper';
import { FlatList, View, StyleSheet } from 'react-native';
import globalStyles from '../../Styles/global';
import { AppContext } from '../../context/AppContext';
import ClientAxios from '../../helpers/clientAxios';
import { set } from 'react-hook-form';
import ScreenHeader from '../../components/ScreenHeader';

const VerPendientes = ({ navigation, route }) => {
  const [Tareas, setTareas] = useState([]);
  
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {//areas/getAreasbyResidencial
        console.log(route.params)
        try {
          const resultados = await ClientAxios.post('tareas/getTareas', {
            key: '291290336b75b259b77e181c87cc974f',
            data: { id:user_empleado },
          });
          setTareas(resultados.data);
         
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
      <ScreenHeader title="TareasPendientes">
        <View style={globalStyles.contenedor}>
          <Headline style={globalStyles.titulo}>
            {Tareas.length > 0
              ? 'Tareas Pendientes'
              : 'Aún no tiene tareas pendientes'}
          </Headline>
          <FlatList
            data={Tareas}
            keyExtractor={AreasComunes => AreasComunes.ID_areaComunes.toString()}
            renderItem={({ item }) => (
              <List.Item
                title={item.nombre}
                onPress={() => navigation.navigate('verDepartamentos', { item })}
              />
            )}
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
export default VerPendientes;
