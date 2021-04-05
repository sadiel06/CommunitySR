import { useState } from 'react';
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import CommonDrawer from './screens/Drawers/CommonDrawer'
import LoginScreen from './screens/LoginScreen'
import Registro from './screens/RegisterScreen';
import Dropdown from './components/Dropdown'
import NuevoResidencial from './screens/RegistroResidencial'
const App = () => {

  return (
    <>
      <PaperProvider>
        <NuevoResidencial />
      </PaperProvider>

    </>
  );
};

const styles = StyleSheet.create({


});

export default App;
