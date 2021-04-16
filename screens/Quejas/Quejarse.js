import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import AppContext from '../../context/AppContext'
const listTipoqueja = []
const listPresuntos = []

const Quejarse = ({ navigation, route }) => {

  const [descripcion, setDescripcion] = useState('');
  const [tipoQueja, setTipoQueja] = useState('');
  const [verTipo, setVerTipo] = useState(false);
  const [presunto, setPresunto] = useState('');
  const [verPresuntos, setVerPresuntos] = useState(false);
  const { user } = useContext(AppContext);

 

  list = route.params;

  const realizarQueja = async () => {
    //validar
    if (descripcion === ''||tipoQueja===''||presunto==='') {
      alert('Aun existen campos vacios');
      return;
    }
    //declarar objeto
    const Quejarse = {
      descripcion: descripcion,
      idTipoqueja:tipoQueja,
      idUserfrom:user.idUsuario,
      idUserto:presunto,
      idUser:user.idUsuario,
      idResi,
      username:user.userName
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
            label={'Tipo de queja'}
            mode="outlined"
            value={tipoQueja}
            setValue={setTipoQueja}
            list={listTipoqueja}
            visible={verTipo}
            showDropDown={() => setVerTipo(true)}
            onDismiss={() => setVerTipo(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,
            }}
          />
        </View>

        <View style={styles.inputs}>
          <DropDown
            label={'Presunto'}
            mode="outlined"
            value={presunto}
            setValue={setPresunto}
            list={listPresuntos}
            visible={verPresuntos}
            showDropDown={() => setVerPresuntos(true)}
            onDismiss={() => setVerPresuntos(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,
            }}
          />
        </View>

        <Button onPress={() => realizarQueja()}>Realizar queja</Button>

      </View>
    </>
  );
};

export default Quejarse;
