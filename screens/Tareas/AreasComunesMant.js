import React, { useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { Appbar, List, Headline, FAB } from 'react-native-paper';
import { FlatList, View, StyleSheet } from 'react-native';
import globalStyles from '../../Styles/global';
import { AppContext } from '../../context/AppContext';
import ClientAxios from '../../helpers/clientAxios';
import ScreenHeader from '../../components/ScreenHeader';

const AreasComunesMant = ({ navigation, route }) => {
  const [AreasComunes, setTServicios] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {//areas/getAreasbyResidencial
        console.log(route.params)
        try {
          const resultados = await ClientAxios.post('areas/getAreasbyResidencial', {
            key: '291290336b75b259b77e181c87cc974f',
            data: { idResi: route.params.id },
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
      <ScreenHeader title="Areas Comunes">
        <View style={globalStyles.contenedor}>
          <Headline style={globalStyles.titulo}>
            {AreasComunes.length > 0
              ? 'Areas Comunes'
              : 'Aún no tiene areas comunes registradas'}
          </Headline>
          <FlatList
            data={AreasComunes}
            keyExtractor={AreasComunes => AreasComunes.ID_areaComunes.toString()}
            renderItem={({ item }) => (
              <List.Item
                title={item.nombre}
                onPress={() => navigation.navigate('', { item })}
              />
            )}
          />


         
        </View>
      </ScreenHeader>
    </>
  );
};

export default AreasComunesMant;
