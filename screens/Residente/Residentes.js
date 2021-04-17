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
  const [residentes, setResidentes] = useState([]);
  
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        // console.log(route.params)
        try {
          const resultados = await ClientAxios.post('residencial/getresidentes', {
            key: '291290336b75b259b77e181c87cc974f',
            data: { id:residencia },
          });
          setResidentes(resultados.data);
         
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
      <ScreenHeader title={residencial+" - Residentes"}>
        <View style={globalStyles.contenedor}>
          <Headline style={globalStyles.titulo}>
            {residentes.length > 0
              ? ''
              : 'Aún no tienes inquilinos en este residencial'}
          </Headline>
          <FlatList
            data={residentes}
            keyExtractor={residente => residente.id.toString()}
            renderItem={({ item }) => (
              <List.Item
                title={item.nombre}
                onPress={() => navigation.navigate('DetalleResidente')}
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
