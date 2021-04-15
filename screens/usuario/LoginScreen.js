import React, { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
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
import {useNavigation} from '@react-navigation/core';
import { NavigationActions } from 'react-navigation';
import { AppContext } from '../../context/AppContext';
import ClientAxios from '../../helpers/clientAxios';





export default function LoginScreen({}) {

  const navigation = useNavigation();
  const { user, setUser } = useContext(AppContext);
  const [usuario, setUsuario] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const onLoginPressed = async() => {
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
      
      if (JSON.stringify(resultados.data) === '{}') {
        alert('Usuario/Contraseña incorrectos');
      } else {
        setUser(resultados.data);
        console.log(resultados.data);
        navigation.navigate('ModoUser');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }

  };



  return (
    <ScrollView>
      <Background>
        <Logo />
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
       
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegistroUsuario')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </ScrollView>
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
