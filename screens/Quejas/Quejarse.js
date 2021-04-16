import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import MultiSelect from 'react-native-multiple-select';


const Quejarse = ({ navigation, route }) => {


  const [descripcion, setDescripcion] = useState('');
  const [selectedItem, setMultiselect] = useState('');
  const list = route.params;

  const guardarMantenimieto = async () => {
    //validar
    if (descripcion === '' || selectedItem === '') {
      alert('Aun existen campos vacios');
      return;
    }
    //declarar objeto
    const Quejarse = {
      descripcion: descripcion,
      listidResi: selectedItem,
      idTipoqueja,
      idUserfrom,
      idUserto,
      idUser,
      username
    }
    //insert
    try {
      const res = await ClientAxios.post('quejas/inserttouserqueja', {
        key: '291290336b75b259b77e181c87cc974f',
        data: Quejarse,
      });
      if (res.data.key === '1') {
        alert('Se completó');
        navigation.goBack()
      } else {
        throw Error('No se ha podido completar');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }

  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Nuevo mantenimiento" />
      </Appbar.Header>
      <View style={globalStyles.contenedor}>

        <TextInput
          label="Descripción"
          placeholder="nombre servicio"
          style={globalStyles.inputs}
          onChangeText={texto => setDescripcion(texto)}
          value={descripcion}
        />

        <View style={styles.inputs}>
          <DropDown
            label={'Presunto'}
            mode="outlined"
            value={queja.diriguido}
            setValue={() => setQueja({ diriguido, ...queja })}
            list={listaDirigido}
            visible={verDirigido}
            showDropDown={() => setVerDirigido(true)}
            onDismiss={() => setVerDirigido(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,
            }}
          />
        </View>

        <View style={styles.inputs}>
          <DropDown
            label={'Presunto'}
            mode="outlined"
            value={queja.diriguido}
            setValue={() => setQueja({ diriguido, ...queja })}
            list={listaDirigido}
            visible={verDirigido}
            showDropDown={() => setVerDirigido(true)}
            onDismiss={() => setVerDirigido(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,
            }}
          />
        </View>


      </View>
    </>
  );
};

export default Quejarse;
