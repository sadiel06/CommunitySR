import React, { useState, Component } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import MultiSelect from 'react-native-multiple-select';

// const items = [{
//     id: '92iijs7yta',
//     name: 'Ondo'
// }, {
//     id: 'a0s0a8ssbsd',
//     name: 'Ogun'
// }, {
//     id: '16hbajsabsd',
//     name: 'Calabar'
// }, {
//     id: 'nahs75a5sg',
//     name: 'Lagos'
// }, {
//     id: '667atsas',
//     name: 'Maiduguri'
// }, {
//     id: 'hsyasajs',
//     name: 'Anambra'
// }, {
//     id: 'djsjudksjd',
//     name: 'Benue'
// }, {
//     id: 'sdhyaysdj',
//     name: 'Kaduna'
// }, {
//     id: 'suudydjsjd',
//     name: 'Abuja'
// }
// ];

const NuevoMantenimiento = ({ navigation, route }) => {
  const [descripcion, setDescripcion] = useState('');
  const [selectedItem, setMultiselect] = useState([])
  const [dias, setDias] = useState('')
  const list = route.params;


  const guardarMantenimieto = async () => {
    //validar
    if (descripcion === '' || dias === '' || selectedItem.length <= 0) {
      alert('Aun existen campos vacios');
      return;
    }
    //declarar objeto
    const mantenimiento = {
      descripcion: descripcion,
      dias: dias,
      listidResi: selectedItem
    }
    //insert
    try {
      const res = await ClientAxios.post('mantenimientos/insert', {
        key: '291290336b75b259b77e181c87cc974f',
        data: mantenimiento,
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

        <TextInput
          label="Margen de Dias para el mantenimiento"
          placeholder="Residencia"
          style={globalStyles.inputs}
          onChangeText={texto => setDias(texto)}
          value={dias}
          keyboardType="numeric"
        />

        <View style={{ flex: 1 }}>
          <MultiSelect
            hideTags
            items={list}
            uniqueKey="id"
            displayKey="nombre"
            onSelectedItemsChange={setMultiselect}
            selectedItems={selectedItem}
            selectText="Residenciales"
            searchInputPlaceholderText="Buscar..."
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />
          <Button mode='contained' onPress={() => guardarMantenimieto()}>Crear</Button>
        </View>


      </View>
    </>
  );
};

export default NuevoMantenimiento;
