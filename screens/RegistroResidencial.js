
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from 'react';
import { View, StyleSheet , ScrollView} from 'react-native'
import { Dropdown, Text, TextInput, Headline, Button, Paragraph, Dialog, Portal, DefaultTheme } from 'react-native-paper'
import globalStyles from '../Styles/global';
import axios from 'axios';
import DropDown from 'react-native-paper-dropdown';


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
  const list = [{ label: 'Santiago', value: 'santiago' }, { label: 'Samana', value: 'samana' }];
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
  //funciones
  const guardarResidencial = () => {
    console.log(theme)
  }


  return (
    <>
    <ScrollView>
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
            setValue={setRegion}
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
            list={list}
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
            list={list}
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
            list={list}
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
        } style={{marginBottom:15}}>Guardar cliente</Button>
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

      </View>
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