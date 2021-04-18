import React, { useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { Button, List, Headline, FAB, Portal } from 'react-native-paper';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import globalStyles from '../../Styles/global';
//import {AppContext} from '../../context/AppContext';
import ClientAxios from '../../helpers/clientAxios';
import ScreenHeader from '../../components/ScreenHeader';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const Prueba = () => <Text>asdasd</Text>;

const verTorre = ({ navigation, route }) => {
  const [torres, setTorres] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [fabVIsible, setFABVisible] = useState(true)
  //const { user } = useContext(AppContext);
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const resultados = await ClientAxios.post('torre/gettorres', {
  //         key: '291290336b75b259b77e181c87cc974f',
  //         data: { id: route.params.id },
  //       });
  //       console.log(resultados.data)
  //       setTorres(resultados.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData();

  // }, [])
  useFocusEffect(
    React.useCallback(() => {
      // console.log(route)

      const getData = async () => {
        try {
          const resultados = await ClientAxios.post('torre/gettorres', {
            key: '291290336b75b259b77e181c87cc974f',
            data: { id: route.params.id },
          });
          setTorres(resultados.data);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
      setFABVisible(true);
      return () => {
        setFABVisible(false);
        console.log('on cleanup')
      };
    }, []),
  );

  // return(
  //   <Tab.Navigator>
  //     <Tab.Screen name="Home" component={Prueba} />
  //     <Tab.Screen name="Settings" component={Prueba} />
  //   </Tab.Navigator>
  // )

  return (
    <ScreenHeader title="Torres">
      <View style={globalStyles.contenedor}>        
        <Headline style={globalStyles.titulo}>
          {torres.length > 0 ? 'Torres' : 'Aún no tiene torres registradas'}
        </Headline>
        <FlatList
          data={torres}
          keyExtractor={torres => torres.id.toString()}
          renderItem={({ item }) => (
            <List.Item
              title={item.nombre}
              // navigation.navigate('verDepartamentos', {item})
              onPress={() => navigation.navigate('verDepartamentos', { item })}
            />
          )}
        />
        
        {fabVIsible ? <Portal>
          <FAB.Group
            open={isOpen}
            icon={true ? 'wrench-outline' : 'plus'}
            actions={[
              {
                label: 'Queja',
                icon: 'account-alert-outline',
                onPress: () => navigation.navigate('VerQueja', route.params)
              }, {
                label: 'Servicios',
                icon: 'room-service-outline',
                onPress: () => navigation.navigate('verServicios', route.params.item),
                // small: false,
              },
              {
                label: 'Nueva Torre',
                icon: 'plus',
                onPress: () => navigation.navigate('NuevaTorre', route.params)
              },

              {
                icon: 'tree-outline',
                label: 'Areas Comunes',
                onPress: () => navigation.navigate('AreasComunes', route.params.item),
              },

              {
                icon: 'pencil-outline',
                label: 'Editar Residencial',
                onPress: () => navigation.navigate('NuevoResidencial', route.params),
              },
              
            ]}
            onStateChange={() => setIsOpen(!isOpen)}
            onPress={() => {
              // setIsOpen(false); 
              // if (open) {
              //   // do something if the speed dial is open
              // }
            }}
          />
        </Portal> : null}
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
