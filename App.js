import {useState} from 'react';
import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, useHeaderHeight} from '@react-navigation/stack';
// import CommonDrawer from './screens/Drawers/CommonDrawer'
// import LoginScreen from './screens/LoginScreen'
// import Registro from './screens/RegisterScreen';
// import Dashboard from './screens/Dashboard';
// import Dropdown from './components/Dropdown'
// import formPrueba from './screens/pruebas/formPrueva';
import NuevoResidencial from './screens/RegistroResidencial';

//importacion de las pruebas de crud

// import inicio from './screens/pruebas/verRegistro';
// import nuevo from './screens/pruebas/formPrueva';
// import detalle from './screens/pruebas/detalles';
import VerResidenciales from './screens/verResidenciales';
import VerApartamentos from './screens/verApartamentos';
import VerTorres from './screens/verTorres';
import NuevaTorre from './screens/torres';
import NuevoDepartamento from './screens/departamentos';
import {AppContextProvider} from './context/AppContext';

//stack
const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const App = () => {
  // options={{
  //               headerShown: false
  //             }}
  return (
    <>
      <AppContextProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="verResidenciales">
              <Stack.Screen
                name="verResidenciales"
                component={VerResidenciales}
              />
              <Stack.Screen name="verTorres" component={VerTorres} />
              <Stack.Screen
                name="verDepartamentos"
                component={VerApartamentos}
              />
              <Stack.Screen
                name="NuevoDepartamento"
                component={NuevoDepartamento}
              />
              <Stack.Screen name="NuevaTorre" component={NuevaTorre} />
              <Stack.Screen
                name="NuevoResidencial"
                component={NuevoResidencial}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </AppContextProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
