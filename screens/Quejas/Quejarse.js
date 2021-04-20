import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/core';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import DropDown from 'react-native-paper-dropdown'
import {AppContext} from '../../context/AppContext'
import {useNavigation} from '@react-navigation/native'
const listDirigido = [{ label: 'Administracion', value: '1' }, { label: 'Residente', value: '2' }]
const Quejarse = ({  route }) => {
  const navigation =useNavigation()
  const [descripcion, setDescripcion] = useState('');
  const [dirigido, setDirigido] = useState('');
  const [verDirigido, setVerDirigido] = useState('');
  const [tipoQueja, setTipoQueja] = useState('');
  const [lita, setlista] =useState([])
  const [litaPresun, setListaPresun] =useState([])
  const [verTipo, setVerTipo] = useState(false);
  const [presunto, setPresunto] = useState('');
  const [verPresuntos, setVerPresuntos] = useState(false);
  const { user } = useContext(AppContext);
  const [idResi,setIDResi]=useState(0);
  const [idDepartamento,setIDdepartamento]=useState(0);


  //getquejasbyinqui
// idUser
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        // try {
        //   const resultados = await ClientAxios.post('departamento/user', {
        //     key: '291290336b75b259b77e181c87cc974f',
        //     data: { idUser: user.idUsuario },
        //   });
        //   setIDResi(resultados.data);
        //   // console.log(resultados.data);
        // } catch (error) {
        //   console.log(error);
        // }
        
        try {
          const resultados = await ClientAxios.post('quejas/getquejasbyinqui', {
            key: '291290336b75b259b77e181c87cc974f',
            data: { idUser: user.idUsuario },
          });
          setlista(resultados.data);
          // console.log(resultados.data);
        } catch (error) {
          console.log(error);
        }
        try {
          const resultados = await ClientAxios.post('quejas/cargarpresunto', {
            key: '291290336b75b259b77e181c87cc974f',
            data: { idUser: user.idUsuario },
          });
          setListaPresun(resultados.data);
          // console.log(resultados.data);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
      return () => console.log('on cleanup');
    }, []),
  );
  
    //  useFocusEffect(
    //     React.useCallback(() => {
    //       const getData = async () => {
    //         try {
    //           const resultados = await ClientAxios.post('departamento/listaInquilinos', {
    //             key: '291290336b75b259b77e181c87cc974f',
    //             data: { idResi: idResi },
    //           });
    //           setIDdepartamento(resultados.data);
    //           // console.log(resultados.data);
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       };
    //       getData();
    //       return () => console.log('on cleanup');
    //     }, []),
    //   );
 // const { user } = useContext(AppContext);

//   useEffect(() => {
//     const getData=async()=>{
//       try {
//         const res = await ClientAxios.post('quejas/getquejasbyresidencial', {
//           key: '291290336b75b259b77e181c87cc974f',
//           data: Quejarse,
//         });
//         if (res.data.key === '1') {
//           listTipoqueja = res.data;
//         } else {
//           throw Error('No se ha podido completar');
//         }
//       } catch (error) {
//         console.log(error);
//         alert(error);
//       }
//     }
// getData();
//   }, [])


  const realizarQueja = async () => {
    //validar
    if (descripcion === '' || tipoQueja === '' || presunto === '') {
      alert('Aun existen campos vacios');
      return;
    }
    //declarar objeto
    const Quejarse = {
      descripcion: descripcion,
      idTipoqueja: tipoQueja,
      idUserfrom: user.idUsuario,
      idUserto: presunto,
      idUser:user.idUsuario,
      username:user.userName
      //idUser: user.idUsuario,
       //Obtener de algun metodo con use efect tambien
   //   username: user.userName
    }
    //insert
//     quejas/inserttouserqueja
// idTipoqueja   (el value del dropdown)
// idUserfrom (el id del user)
// idUserto (el value del dropdown )
// descripcion
// idUser: (otra vez el id del usuario)
    try {
      const res = await ClientAxios.post('quejas/inserttouserqueja', {
        key: '291290336b75b259b77e181c87cc974f',
        data: Quejarse,
      });
      if (res.data.key === '1') {
        alert('Se completó');
        navigation.navigate('Home')
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
        
        <Appbar.Content title="Nuevo mantenimiento" />
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
        <ScrollView>
          <View style={globalStyles.inputs}>
              <View style={globalStyles.inputs}>
                <DropDown
                  label={'Dirigido a:'}
                  mode="outlined"
                  value={dirigido}
                  setValue={setDirigido}
                  list={listDirigido}
                  visible={verDirigido}
                  showDropDown={() => setVerDirigido(true)}
                  onDismiss={() => setVerDirigido(false)}
                  inputProps={{
                    right: <TextInput.Icon name={'menu-down'} />,
                  }}
                />
              </View>

            <DropDown
              label={'Tipo de queja'}
              mode="outlined"
              value={tipoQueja}
              setValue={setTipoQueja}
              list={lita}
              visible={verTipo}
              showDropDown={() => setVerTipo(true)}
              onDismiss={() => setVerTipo(false)}
              inputProps={{
                right: <TextInput.Icon name={'menu-down'} />,
              }}
            />
          </View>


          {
            dirigido === '2' ?
              <View style={globalStyles.inputs}>
                <DropDown
                  label={'Departamento presunto'}
                  mode="outlined"
                  value={presunto}
                  setValue={setPresunto}
                  list={litaPresun}
                  visible={verPresuntos}
                  showDropDown={() => setVerPresuntos(true)}
                  onDismiss={() => setVerPresuntos(false)}
                  inputProps={{
                    right: <TextInput.Icon name={'menu-down'} />,
                  }}
                />
              </View> : null
          }

          <TextInput
            label="Descripción"
            placeholder="nombre servicio"
            style={globalStyles.inputs}
            onChangeText={texto => setDescripcion(texto)}
            value={descripcion}
          />

          <Button onPress={() => realizarQueja()}>Realizar queja</Button>
        </ScrollView>
      </View>
    </>
  );
};

export default Quejarse;
