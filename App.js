import { useState } from 'react';
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack'
import CommonDrawer from './screens/Drawers/CommonDrawer'
import LoginScreen from './screens/LoginScreen'
import Registro from './screens/RegisterScreen';
import Dashboard from './screens/Dashboard';
import Dropdown from './components/Dropdown'
import formPrueba from './screens/pruebas/formPrueva';
import NuevoResidencial from './screens/RegistroResidencial'

//importacion de las pruebas de crud


import inicio from './screens/pruebas/verRegistro';
import nuevo from './screens/pruebas/formPrueva';
import detalle from './screens/pruebas/detalles';

//stack
const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='formPrueba'>
            <Stack.Screen name='Inicio' component={inicio} options={{
              headerShown: false
            }} />
            <Stack.Screen name='formPrueba' component={nuevo} options={{
              headerShown: false
            }}/>
            <Stack.Screen name='detalles' component={detalle} options={{
              headerShown: false
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>

    </>
  );
};

const styles = StyleSheet.create({


});

export default App;
