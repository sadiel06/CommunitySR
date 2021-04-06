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
import NuevoResidencial from './screens/RegistroResidencial'

//stack
const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={LoginScreen} options={{
              headerShown: false
            }} />
            <Stack.Screen name='Dashboard' component={NuevoResidencial} options={{
              headerShown: false
            }}/>
            <Stack.Screen name='RegistroUsuario' component={Registro} options={{
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
