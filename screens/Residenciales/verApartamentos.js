import React, { useEffect, useState } from 'react';
import { Text, Button, List, Headline, FAB, Portal } from 'react-native-paper';
import { FlatList, View, StyleSheet } from 'react-native';
import axios from 'axios';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import { useFocusEffect } from '@react-navigation/core';
import ScreenHeader from '../../components/ScreenHeader';

const verApartamento = ({ navigation, route }) => {
  const [departamento, setDepartamento] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [fabVIsible, setFABVisible] = useState(true)
  
 
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const resultados = await ClientAxios.post(
            'departamento/getdepartamentos',
            {
              key: '291290336b75b259b77e181c87cc974f',
              data: { id: route.params.item.id },
            },
          );
          setDepartamento(resultados.data);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
      setFABVisible(true);
      return () => {
        setFABVisible(false);
        console.log('on cleanup')
      }
    }, []),
  );

  return (
    <>
      <ScreenHeader title={`Torre: ${route.params.item.nombre}`}>
        <View style={globalStyles.contenedor}>
         

          <Headline style={globalStyles.titulo}>
            {departamento.length > 0
              ? 'Apartamentos'
              : 'No hay Apartamentos registrados'}
          </Headline>

          <FlatList
            data={departamento}
            keyExtractor={departamento => departamento.id.toString()}
            renderItem={({ item }) => (
              <List.Item
                title={item.Nombre_departamento}
                onPress={() => navigation.navigate('detalleDepartamento',{item})}
              />
            )}
          />

          {fabVIsible ? <Portal>
            <FAB.Group
              open={isOpen}
              icon={true ? 'cogs' : 'plus'}
              actions={[

                {
                  label: 'Nuevo Departamento',
                  icon: 'plus',
                  onPress: () =>  navigation.navigate('NuevoDepartamento', route.params.item.id)
                },

                {
                  icon: 'pencil-outline',
                  label: 'Editar Torre',
                  onPress: () => navigation.navigate('NuevaTorre', route.params),
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
    </>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 20,
  },
});
//setTorres
export default verApartamento;
