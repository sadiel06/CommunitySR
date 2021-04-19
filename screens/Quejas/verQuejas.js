import React, { useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { Button, List, Headline, FAB,Text } from 'react-native-paper';
import { FlatList, View, StyleSheet } from 'react-native';
import globalStyles from '../../Styles/global';
import { AppContext } from '../../context/AppContext';
import ClientAxios from '../../helpers/clientAxios';
import ScreenHeader from '../../components/ScreenHeader';


const verQuejas = ({ navigation, route }) => {
  const [quejas, setQuejas] = useState([]);
 
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const resultados = await ClientAxios.post('quejas/getquejasbyresidencial', {
            key: '291290336b75b259b77e181c87cc974f',
            data: { idResi: route.params.id },
          });
          setQuejas(resultados.data);
          // console.log(resultados.data)
        } catch (error) {
          console.log(error);
        }
      };
      getData();
      return () => console.log('on cleanup');
    }, []),
  );

  return (

    <ScreenHeader title="quejas">
      <View style={globalStyles.contenedor}>
        <Headline style={globalStyles.titulo}>
          {quejas.length > 0 ? 'Quejas' : 'Aún no tiene quejas registradas'}
        </Headline>
        <FlatList
          data={quejas}
          keyExtractor={queja => queja.ID_TipoQuejas.toString()}
          renderItem={({ item }) => (
            <List.Item
              title={item.descripcion}
              onPress={() =>navigation.navigate('DetalleQueja',{item, idResi:route.params.id})}
            />
          )}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() =>
            navigation.navigate('NuevaQueja', route.params)
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
export default verQuejas;
