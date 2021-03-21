import React from 'react';
import {
  Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, StyleSheet
} from 'react-native';
import { Button } from 'react-native-elements';

const loginScree = () => {
  return (
    <>
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Community SR</Text>
              <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
              <Button
                buttonStyle={styles.loginButton}
                // onPress={() => this.onLoginPress()}
                title="Login"
              />
                <Button buttonStyle={styles.SinginButton}
                type='outline'
                // onPress={() => this.onLoginPress()}
                title="Sing in">

                </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({

  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,

  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 20,
    height: 45,
    marginTop: 10,
  },
  SinginButton: {
     
    borderWidth: 3,
    borderColor: '#3897f1',
    borderRadius: 20,
    height: 45,
    marginTop: 10,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },




});

export default loginScree;
