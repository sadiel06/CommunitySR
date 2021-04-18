import React, { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';

import { Modal, Portal, Text, Button as PaperButton, Provider , TextInput as PaperInput} from 'react-native-paper';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { userValidator } from '../../helpers/userValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
// import { useNavigation } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { NavigationActions } from 'react-navigation';
import { AppContext } from '../../context/AppContext';
import ClientAxios from '../../helpers/clientAxios';
import DropDown from 'react-native-paper-dropdown';

import DropDownPicker from 'react-native-dropdown-picker';


const LoginScreen=()=> {

  const navigation = useNavigation();
  const [mostrarSector, setMostrarSector] = useState(false)
  const [visible, setVisible] = React.useState(false);
  const [sector, setSector] = useState('');
  const { user, setUser } = useContext(AppContext);
  const [usuario, setUsuario] = useState({ value: 'sadiel', error: '' });
  const [password, setPassword] = useState({ value: '123456', error: '' });
  const [listasPermisos, setListaPermisos] = useState([])
  const [dataResult, setDataResult] = useState({})
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // const containerStyle = { backgroundColor: 'white', padding: 20, paddo };
  const onLoginPressed = async () => {
    // const userError = userValidator(usuario.value);
    // const passwordError = passwordValidator(password.value);
    // if (userError || passwordError) {
    //   setUsuario({ ...usuario, error: userError });
    //   setPassword({ ...password, error: passwordError });
    //   return;
    // }
    try {
      const resultados = await ClientAxios.post('login/iniciarsesion', {
        key: '291290336b75b259b77e181c87cc974f',
        data: {
          username: usuario.value,
          pass: password.value,
        },
      });

      if (resultados.data.key === '-3') {
        alert('Usuario/Contraseña incorrectos');
      } else {
        const {
          idUsuario,
          userName,
          password,
          IdPersona,
          NumeroCuenta,
          idStatusUsuario,
          IsClient,
          isAdmin,
          Permisos,
          cantPermisos,
        } = resultados.data;

        setListaPermisos(Permisos)
        // alert(JSON.stringify(resultados.data, null, 2))
        
        let rol;

        
        if (Number(cantPermisos) === 0) {
          if (isAdmin) {
            rol = 1;
          } else {
            rol = 3;
          }
        } else if (Number(cantPermisos) === 1) {
          rol = Permisos[0].value;
          alert(rol)
        } else {
          // Presentar el dropdown lista permisos
          // Asignar el rol al dropdown
          //setMostrarSector
          setVisible(true)
          setDataResult(resultados.data);
          return;

        }
         
        setUser({ ...dataResult, rol: rol });


        // setDataResult(resultados.data);
        // setUser(dataResult);
        navigation.replace('Stack');
        // submit();
        // 
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }

  };



  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <View style={{alignItems: 'center'}}>
      <Logo  />
      </View>
      <TextInput
        label="Usuario"
        returnKeyType="next"
        value={usuario.value}
        onChangeText={text => setUsuario({ value: text, error: '' })}
        error={!!usuario.error}
        errorText={usuario.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
        </Button>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', paddingVertical: 100, paddingHorizontal: 10 }} style={{
          paddingHorizontal: 10
        }}>
          <View >
            <Text style={{ marginBottom: 10, fontWeight: 'bold', }}>Selecione su modo de inicio</Text>
            <DropDown
              label={'Selecciona su modo de'}
              mode="outlined"
              value={sector}
              setValue={e => {
                //alert(e)
                setSector(e)
              }}
              list={listasPermisos}
              visible={mostrarSector}
              showDropDown={() => setMostrarSector(true)}
              onDismiss={() => setMostrarSector(false)}
              inputProps={{
                right: <PaperInput.Icon name={'menu-down'} />,
              }}

            />
            <PaperButton mode='contained' style={{ marginTop: 10 }} onPress={() => {
              setUser({ ...dataResult, rol: sector });
              hideModal()
             alert(JSON.stringify(user))
              navigation.replace('Stack');
            }}>Guardar</PaperButton>
          </View>

        </Modal>
      </Portal>


      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegistroUsuario')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

    </ScrollView >
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default LoginScreen