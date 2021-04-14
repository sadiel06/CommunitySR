import { useState } from 'react';
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton, Text, TextInput as PaperInput } from 'react-native-paper';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import ReadMeExampleSingle from '../../components/Datapiker';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDown from 'react-native-paper-dropdown';
import ClientAxios from '../../helpers/clientAxios';
import { useNavigation } from '@react-navigation/core';
import globalStyles from '../../Styles/global'
const list = [
  { label: 'Administrador', value: '1' },
  { label: 'Cliente', value: '4' },
];

const listaSexo = [
  { label: 'Masculino', value: '1' },
  { label: 'Femenino', value: '2' },
  { label: 'otros', value: '3' },
];

const Registro = ({ }) => {
  const navigation = useNavigation();
  const [name, setName] = useState({ value: '', error: '' });
  const [apellido, setApellido] = useState({ value: '', error: '' });
  const [nameuser, setNameUser] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [fecha, setFecha] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tipoCuenta, setTipoCuenta] = useState('');
  const [mostrarTipoCuenta, setMostrarTipoCuenta] = useState(false);
  const [sexo, setSexo] = useState('');
  const [mostrarSexo, setMostrarSexo] = useState(false);

  //{funciones datapiker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const formatofecha = date => {
    const getDateNacimiento = new Date(date);
    const getDay = getDateNacimiento.getDate();
    const getMonth = getDateNacimiento.getMonth() + 1;
    const getYear = getDateNacimiento.getFullYear();
    const res = getDay + '/' + getMonth + '/' + getYear;
    return res;
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setFecha(formatofecha(date));
    hideDatePicker();
  };

  //}

  const onSignUpPressed = async () => {
    alert('Entro');
    //validacion
    // const nameError = nameValidator(name.value)
    // const emailError = emailValidator(email.value)
    // const passwordError = passwordValidator(password.value)
    // if (passwordError || nameError || fecha === '') {
    //   setName({ ...name, error: nameError })
    //   setEmail({ ...email, error: emailError })
    //   setPassword({ ...password, error: passwordError })
    //   return
    // }
    //usuario
    const usuario = {
      nombre: name.value,
      apellido: apellido.value,
      sexo: sexo,
      numCuenta:'',
      user: nameuser.value,
      pass: password.value,
    };
    //insertar
    try {
      const res = await ClientAxios.post('usuario/insert', {
        key: '291290336b75b259b77e181c87cc974f',
        data: usuario,
      });
      console.log(res.data)
      if (res.data.key === '1') {
        alert('Se completó');
        console.log(res.data);
        navigation.goBack();
      } else {
        throw Error('No se ha podido completar');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }

    console.log(usuario);
  };


  return (
    <>
      <ScrollView>
        <View style={styles.container} >
          <BackButton />
          <Logo />
          <Header>Create Account</Header>

          <TextInput
            label="Nombre"
            returnKeyType="next"
            value={name.value}
            onChangeText={text => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
          />
          <TextInput
            label="Apellido"
            returnKeyType="next"
            value={apellido.value}
            onChangeText={text => setApellido({ value: text, error: '' })}
            error={!!apellido.error}
            errorText={apellido.error}
          />
          <View>
            <Text style={styles.label}>fecha</Text>
            <Button mode="contained" onPress={showDatePicker}>
              Selecciona una fecha
            </Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              locale="es_ES"
            />
            <Text>{fecha}</Text>
          </View>

          <TextInput
            label="Nombre de usuario"
            returnKeyType="next"
            value={nameuser.value}
            onChangeText={text => setNameUser({ value: text, error: '' })}
            error={!!nameuser.error}
            errorText={nameuser.error}
          />

          <TextInput
            label="Contraseña"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />


          <View style={globalStyles.inputs}>
            <DropDown
              label={'Tipo de cuenta '}
              mode="outlined"
              value={tipoCuenta}
              setValue={setTipoCuenta}
              list={list}
              visible={mostrarTipoCuenta}
              showDropDown={() => setMostrarTipoCuenta(true)}
              onDismiss={() => setMostrarTipoCuenta(false)}
              inputProps={{
                right: <PaperInput.Icon name={'menu-down'} />,
              }}
              theme={theme}
            />
          </View>

          <View style={globalStyles.inputs} >
            <DropDown
              label={'Sexo'}
              mode="outlined"
              value={sexo}
              setValue={setSexo}
              list={listaSexo}
              visible={mostrarSexo}
              showDropDown={() => setMostrarSexo(true)}
              onDismiss={() => setMostrarSexo(false)}
              inputProps={{
                right: <PaperInput.Icon name={'menu-down'} />,
              }}
              theme={theme}
            />
          </View>


          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ marginTop: 24 }}>
            Sign Up
          </Button>
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default Registro;
