import React, { useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { Appbar, List, Headline, FAB, Button, TextInput } from 'react-native-paper';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import globalStyles from '../../Styles/global';
import { AppContext } from '../../context/AppContext';
import ClientAxios from '../../helpers/clientAxios';
import { set } from 'react-hook-form';
import ScreenHeader from '../../components/ScreenHeader';

import DropDown from 'react-native-paper-dropdown'

// let listadoServicios = [
//   {
//     "ID_servicio": 1,
//     "ID_Departamento": 1,
//     "Nombre": "agua"
//   },
//   {
//     "ID_servicio": 2,
//     "ID_Departamento": 1,
//     "Nombre": "luz"
//   },
//   {
//     "ID_servicio": 3,
//     "ID_Departamento": 1,
//     "Nombre": "cable"
//   }
// ]

const AgregarServicio = ({ navigation, route }) => {
  const [servicios, setServicios] = useState([])
  const [service, setService] = useState('');
  const [verService, setVerService] = useState(false);
  const [verDropDown, setVerDropDown] = useState(false)
  const [idResidencial, setidRsesidencial] = useState({})
  const [listaServicios, setListaServicios] = useState([])
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {//areas/getAreasbyResidencial
        console.log(route.params)
        try {
          const resultados = await ClientAxios.post('departamento/serviciosdepartamento', {
            key: '291290336b75b259b77e181c87cc974f',
            data: { idDeparmento: route.params.id },
          });
          setServicios(resultados.data);
          console.log('listado servicios' + JSON.stringify(resultados.data, null, 2))
        } catch (error) {
          console.log(error);
        }
        //id residencial

        try {
          const resultados1 = await ClientAxios.post('departamento/getresidencial', {
            key: '291290336b75b259b77e181c87cc974f',
            data: { idDepa: route.params.id },

          });

          setidRsesidencial(resultados1.data.idresi)

          const resultados2 = await ClientAxios.post('departamento/getservicios', {
            key: '291290336b75b259b77e181c87cc974f',
            data: { idResi: resultados1.data.idresi },
          });
          setListaServicios(resultados2.data)
          // console.log('id' + JSON.stringify(resultados2.data, null, 2))
        } catch (error) {
          console.log(error);
        }

        // try {

        //   listaServicios = resultados2.data;
        //   console.log(resultados2.data);
        // } catch (error) {
        //   console.log(error);
        // }
      };
      getData()
      return () => console.log('on cleanup');
    }, []),
  );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const getData = async () => {

  //     };
  //     getData();
  //     return () => console.log('on cleanup');
  //   }, []),
  // );

  const guardarServicio = async () => {
    if(service===''){
      alert('seleccione un servicio');
      return
    }
    try {
      const resultados = await ClientAxios.post('departamento/insertserviciosDepartamento', {
        key: '291290336b75b259b77e181c87cc974f',
        data: { idServicio:service,
          idDepartamento:route.params.id }
      });
      navigation.goBack();
      console.log('bien '+JSON.stringify(resultados.data,null,2));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ScreenHeader title="Servicios del departamento">
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          <Headline style={globalStyles.titulo}>
            {servicios.length > 0
              ? 'Servicios del departamento'
              : 'Aún no tiene areas comunes registradas'}
          </Headline>
          {verDropDown ?
            <View style={styles.inputs}>
              <DropDown
                label={'Seleccione un servicio'}
                mode="outlined"
                value={service}
                list={listaServicios}
                setValue={setService}
                visible={verService}
                showDropDown={() => setVerService(true)}
                onDismiss={() => setVerService(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }}
              />
              <Button style={{ marginTop: 10 }} onPress={() => guardarServicio()}>Guardar</Button>
            </View> : null}
          {
            servicios.length > 0 ?
              <FlatList style={{ marginBottom: 10 }}
                data={servicios}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => (
                  <List.Item
                    title={item.nombre}
                    onPress={() => console.log('')}
                  />
                )}
              /> : null
          }
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() =>
              setVerDropDown(!verDropDown)
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
export default AgregarServicio;
