import React, {useState,useEffect} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import ScreenHeader from '../../components/ScreenHeader';
import {useFocusEffect} from '@react-navigation/core';
import MultiSelect from 'react-native-multiple-select';

const NuevoServicio = ({navigation, route}) => {
  const [descripcion, setDescripcion] = useState('');
  const [isEditando, setIsEditando] =useState(false);
  const [selectedItem, setMultiselect] = useState([])
  const [listaServicios, setListaServicios] = useState([])
  useFocusEffect(
    React.useCallback(() => {
      // console.log(route)

      const getData = async () => {
        // console.log(route.params.idResidencial)  
        // return
        try {
          const resultados = await ClientAxios.post('residencial/getservicios', {
            key: '291290336b75b259b77e181c87cc974f',
            data: { idResi:route.params.idResidencial},
          });
          setListaServicios(resultados.data);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
      
      return () => {
        
        console.log('on cleanup')
      };
    }, []),
  );
//   useFocusEffect(
//     React.useCallback(() => {
//       if (
//         route.params?.item
//       ) {
//         setDescripcion(route.params.item.Descripcion)
//         setCobro(route.params.item.cobro.toString())
//         setPago(route.params.item.pago.toString())
//         setIsEditando(true)
//       }
//       return () => console.log('on cleanup');
//     }, []),
//   );

  const guardarServicios = async () => {
    //validar
    // console.log(JSON.stringify(route.params,null,4))
    if (
      descripcion === ''
      ) {
        alert('Revise los campos');
        return;
      }
    //declarar objeto
    const servicio = {
        tipo:descripcion,
        list:selectedItem,
      idResi:Number(route.params.idResidencial),
      id:route.params.item?.id
      };
   
    //insert cantidadPisos 
//     residencial/insertpredeterminados
// idResi
// tipo
// list
    try {
        const res = await ClientAxios.post('residencial/insertpredeterminados', {
          key: '291290336b75b259b77e181c87cc974f',
          data: servicio,
        });
        if (res.data.key === '1') {
          // alert('Se completó');
          // navigation.navigate('verDepartamentos');
          navigation.goBack()
        } else {
          throw Error('No se ha podido completar');
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    //redireccionar a otra pantalla
    console.log(servicio);
  };

  return (
    <ScreenHeader title='Nuevo Servicio'>
    <View style={globalStyles.contenedor}>
      <TextInput
        label="Tipo"
        placeholder="nombre servicio"
        style={globalStyles.inputs}
        onChangeText={texto => setDescripcion(texto)}
        value={descripcion}
      />
       <View style={{ flex: 1 }}>
          <MultiSelect
            hideTags
            items={listaServicios}
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
          
        </View>

      <Button mode='contained' onPress={() => guardarServicios()}>{isEditando?'Editar':'Crear'}</Button>
    </View>
    </ScreenHeader>
  );
};

export default NuevoServicio;
