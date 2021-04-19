import React, { useState, useContext } from 'react';
import { FlatList, View, TouchableWithoutFeedback } from 'react-native';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import { useFocusEffect } from '@react-navigation/core';
import { Button, List, Headline, FAB, Appbar, Card, Title, TextInput, Paragraph } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
//import { AppContext } from '../../context/AppContext';

let provincias = [
  { label: 'santiago', value: '25' },
  { label: 'samana', value: '20' },
  { label: 'punta cana', value: '1' },
  { label: 'puerto plata', value: '18' },
  { label: 'Santo Domingo', value: '32' },
];

const verResidenciales = ({ navigation }) => {
  const [residencial, setResidencial] = useState([]);
  const [provincia, setProvincia] = useState('')
  const [mostrarProvinvia, setMostrarProvincia] = useState(false)
  const [maxPrecio, setMaxprecio] = useState('');
  // const { user } = useContext(AppContext);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {

        try {
          const resultados = await ClientAxios.post(
            'solicitud/getfirstlist',
            { key: '291290336b75b259b77e181c87cc974f', data: {} },
          );
          setResidencial(resultados.data);
          console.log(JSON.stringify(residencial, null, 4))
        } catch (error) {
          console.log(error);
        }
      };
      getData();
      return () => console.log('on cleanup');
    }, []),
  );

  const Buscar = async () => {
    if (provincia === '' || maxPrecio === '') {
      alert('llene todos los campos')
      return;

    }
    try {
      const res = await ClientAxios.post('solicitud/getlistfilter', {
        key: '291290336b75b259b77e181c87cc974f',
        data: {
          idPro: provincia,
          precio: maxPrecio
        },
      });
     
        setResidencial(res.data)
        // console.log(res.data);
     
    } catch (error) {
      console.log(error);
      alert(error);
    }

  }

  const CardResid = ({ item }) => {
    const { nombre, Nombre_departamento, nomprovincia, PrecioAlquiler } = item;
    //<Button onPress={() => navigation.navigate('', { item })}>Detalles</Button>
    // console.log(item);
    return (
      <TouchableWithoutFeedback>
        <Card onPress={() => navigation.navigate('DetalleDepCliente', {item})} >
          <Card.Content>
            <Card.Cover source={{ uri: 'https://i.picsum.photos/id/863/700/700.jpg?hmac=0CH3HWqzcDYHNml_TBbqPWK1AY1te1JTmJXbb5UZpFY' }} />
            <Title>{nombre + ' - ' + Nombre_departamento}</Title>
            <Paragraph>Provincia: {nomprovincia}</Paragraph>
            <Paragraph>Precio de alquiler: {PrecioAlquiler}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('DetalleDepCliente',{ item})}>Detalles</Button>

          </Card.Actions>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Community SR" />
      </Appbar.Header>

      <TextInput
        label="Precio Maximo"
        placeholder="10000"
        style={globalStyles.inputs}
        onChangeText={texto => setMaxprecio(texto)}
        value={maxPrecio}
        keyboardType="numeric"
      />

      <View style={globalStyles.inputs}>
        <DropDown
          label={'provincia'}
          mode="outlined"
          value={provincia}
          list={provincias}
          setValue={setProvincia}
          visible={mostrarProvinvia}
          showDropDown={() => setMostrarProvincia(true)}
          onDismiss={() => setMostrarProvincia(false)}
          inputProps={{
            right: <TextInput.Icon name={'menu-down'} />,

          }}
        />
      </View>

      <Button onPress={() => Buscar()} icon='find-replace'>Buscar</Button>

      <View style={globalStyles.contenedor}>
       
        <FlatList
          data={residencial}
          keyExtractor={residencial => residencial.ID_departamento.toString()}
          renderItem={({ item }) => <CardResid item={item} />}

        />


      </View>
    </>
  );
};

export default verResidenciales;