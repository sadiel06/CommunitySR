
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Text, TextInput, Headline, Button, Paragraph, Dialog, Portal, DefaultTheme } from 'react-native-paper'
import globalStyles from '../Styles/global';
import Alert from '../components/alert';
import axios from 'axios';
import DropDown from 'react-native-paper-dropdown';
let listaSector = [];
let provincias = [];
let municipios = [];
let sectores = [];
let list2 = [];
const NuevoResidencial = () => {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',


    },
    fonts: {
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    }

  };

  //estados
  const [nombre, setNombre] = useState('');
  const [area, setArea] = useState('');
  const [region, setRegion] = useState('');
  const [mostrarRegion, setMostrarRegion] = useState(false);
  const [provincia, setProvincia] = useState('');
  const [mostrarProvinvia, setMostrarProvincia] = useState(false);
  const [municipio, setMunicipio] = useState('');
  const [mostrarMunicipio, setMostrarMunicipio] = useState(false);
  const [sector, setSector] = useState('');
  const [mostrarSector, setMostrarSector] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [alerta1, setAlerta1] = useState(false);
  //funciones

  //fetch
  useEffect(() => {
    const getdata = async () => {
      try {
        let response = await fetch(
          'http://10.0.0.12:8080/API/residencial/get_provincias',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key: '291290336b75b259b77e181c87cc974f', data: {} })
          }
        );
        provincias = await response.json();
        return provincias
      } catch (error) {
        console.error(error);
      }
    };
    getdata();

  }, []);


  const postdata = async () => {
  
    try {
      let response = await fetch(
        'http://10.0.0.12:8080/API/residencial/test_sending',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ key: '291290336b75b259b77e181c87cc974f', data: { idprovincia: provincia } })
        }
      );




    } catch (error) {
      console.error(error);
    }

    console.log(provincia);
  };

  const guardarResidencial = () => {
    //validar

    //enviar datos a la api

    //limpiar form 

    //redireccionar a otra pantalla
    console.log(getdata());
  }


  //Para dropdow Condicional
  const prueva = async (region) => {
    list = [{ label: 'klk', value: '4' }]
    region === '1' ? list2 = [{ label: 'klk', value: '8' }] : list2 = [{ label: 'klk', value: '8' }, { label: 'klk2', value: '9' }]

    return setRegion(region);
  }
  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Nuevo Residencial</Headline>
            <TextInput
              label='Nombre del residencial'
              placeholder='Residencia'
              style={styles.inputs}
              onChangeText={texto => setNombre(texto)}
              value={nombre}
            />

            <TextInput
              label='Area'
              placeholder='m^2'
              style={styles.inputs}
              onChangeText={texto => setArea(texto)}
              value={area}
            />
            <Text style={globalStyles.titulo}>Ubicación:</Text>
            <View style={styles.inputs}>
              <DropDown
                label={'Región'}
                mode='outlined'
                value={region}
                setValue={prueva}
                list={list}
                visible={mostrarRegion}
                showDropDown={() => setMostrarRegion(true)}
                onDismiss={() => setMostrarRegion(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,

                }} theme={theme}
              />
            </View>
            <View style={styles.inputs}>
              <DropDown
                label={'provincia'}
                mode='outlined'
                value={provincia}

                setValue={setProvincia}
                list={provincias}
                visible={mostrarProvinvia}
                showDropDown={() => setMostrarProvincia(true)}
                onDismiss={() => setMostrarProvincia(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,

                }} theme={theme}
              />
            </View>


            <View style={styles.inputs}>
              <DropDown
                label={'Municipio'}
                mode='outlined'
                value={municipio}
                setValue={setMunicipio}
                list={municipios}
                visible={mostrarMunicipio}
                showDropDown={() => setMostrarMunicipio(true)}
                onDismiss={() => setMostrarMunicipio(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }} theme={theme}
              />
            </View>
            <View style={styles.inputs}>
              <DropDown
                label={'Sector'}
                mode='outlined'
                value={sector}
                setValue={setSector}
                list={sectores}
                visible={mostrarSector}
                showDropDown={() => setMostrarSector(true)}
                onDismiss={() => setMostrarSector(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }} theme={theme}
              />
            </View>

            <Button icon='pencil-circle' mode='contained' onPress={
              () => guardarResidencial()
            } style={{ marginBottom: 15 }}>Guardar residencial</Button>

            <Button icon='pencil-circle' mode='contained' onPress={
              () => setAlerta1(true)
            } style={{ marginBottom: 15 }}>enviar</Button>

            <Portal>
          <Dialog
            visible={alerta}
            onDismiss={() => setAlerta(false)}
          >
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Todos los campos son requeridos</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setAlerta(false)}>OK</Button>
            </Dialog.Actions>

          </Dialog>
        </Portal>



            <Portal>
              <Dialog
                visible={alerta1}
                onDismiss={() => setAlerta1(false)}
              >
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Todo bien</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setAlerta1(false)}>OK</Button>
                </Dialog.Actions>

              </Dialog>
            </Portal>
            
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  inputs: {
    marginBottom: 20,
    backgroundColor: 'transparent'
  }



})

export default NuevoResidencial;