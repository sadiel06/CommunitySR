import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import {
  Text,
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,

} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import DropDown from 'react-native-paper-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ClientAxios from '../../helpers/clientAxios';
import ScreenHeader from '../../components/ScreenHeader';


let listaEmpleados = [];
let listaAreasComunes = [];
let listaMantenimientos = [];

const NuevoResidencial = ({ navigation, route }) => {
  //estados
  const [empleado, setEmpleado] = useState('')
  const [verEmpleados, setVerEmpleados] = useState(false)
  const [AreasComunes, setAreasComunes] = useState('')
  const [verAreas, setVerAreas] = useState(false)
  const [mantenimiento, setMantenimiento] = useState('')
  const [verMantenimiento, setVerMantenimiento] = useState(false)
  const [fecha, setFecha] = useState('');
  const [verFecha, setVerFecha] = useState(false);

  //funciones
  const showDatePicker = () => {
    setVerFecha(true);
  };

  const formatofecha = (date) => {
    const getDateNacimiento = new Date(date);
    const getDay = getDateNacimiento.getDate();
    const getMonth = getDateNacimiento.getMonth() + 1;
    const getYear = getDateNacimiento.getFullYear();
    const res = getDay + '/' + getMonth + '/' + getYear;
    return res;
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFecha(formatofecha(date));
    hideDatePicker();
  };
  //fetch
  useEffect(() => {
    const getdata = async () => {
      try {
        let response = await fetch(
          'http://25.31.135.148/API/complementos/get_provincias',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              key: '291290336b75b259b77e181c87cc974f',
              data: {},
            }),
          },
        );
        provincias = await response.json();
        return provincias;
      } catch (error) {
        console.error(error);
      }
    };
    getdata();
  }, []);

  const agregar = async () => {
      
    try {
      const res = await ClientAxios.post('tarea/completar', {
        key: '291290336b75b259b77e181c87cc974f',
        data: {idTarea: tarea.ID, useremp:'1'},
      });
      if (res.data.key === '1') {
        console.log(res.data);
      } else {
        throw Error('No se ha podido completar');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
    ToastAndroid.show('Se completó la Queja. !', ToastAndroid.SHORT);
    navigation.navigate('verQuejas');
   
  };

  return (
    <ScreenHeader title="Residencial">
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Nuevo Residencial</Headline>

            <View style={styles.inputs}>
              <DropDown
                label={'Empleado'}
                mode="outlined"
                value={empleado}
                list={listaEmpleados}
                setValue={setEmpleado}
                visible={verEmpleados}
                showDropDown={() => setVerEmpleados(true)}
                onDismiss={() => setVerEmpleados(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }}
              />
            </View>

            <View style={styles.inputs}>
              <DropDown
                label="Area común"
                mode="outlined"
                value={AreasComunes}
                setValue={setAreasComunes}
                list={listaAreasComunes}
                visible={verAreas}
                showDropDown={() => setVerAreas(true)}
                onDismiss={() => setVerAreas(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }}
              />
            </View>
            <View style={styles.inputs}>
              <DropDown
                label={'Mantenimiento'}
                mode="outlined"
                value={mantenimiento}
                setValue={setMantenimiento}
                list={listaMantenimientos}
                visible={verMantenimiento}
                showDropDown={() => setVerMantenimiento(true)}
                onDismiss={() => setVerMantenimiento(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }}
              />
            </View>

            <View /* Select fecha */>
              <Text style={styles.label}>fecha </Text>
              <Button mode="contained" onPress={showDatePicker} >{fecha === '' ? 'Selecciona una fecha' : fecha}</Button>
              <DateTimePickerModal
                isVisible={verFecha} 
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                locale='es_ES'
              />
              <Text>{fecha}</Text>

            </View>

            <Button
              icon="pencil-circle"
              mode="contained"
              onPress={() => agregar()}
              style={{ marginBottom: 15 }}>
              Asignar
            </Button>

          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ScreenHeader>
  );
};

const styles = StyleSheet.create({
  inputs: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoResidencial;
