import {Text} from 'react-native';
import React, {useContext} from 'react';
import VerResidenciales from './screens/verResidenciales';
import VerApartamentos from './screens/verApartamentos';
import NuevoResidencial from './screens/RegistroResidencial';
import {createStackNavigator} from '@react-navigation/stack';
import VerTorres from './screens/verTorres';
import NuevaTorre from './screens/torres';
import NuevoDepartamento from './screens/departamentos';
import Servicios from './screens/servicios';
import VerServisios from './screens/verServicios';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppContext} from './context/AppContext';
import Login from './screens/usuario/LoginScreen'
import DashBoard from './screens/usuario/Dashboard'
import RegistroUser from './screens/usuario/RegisterScreen'
//stack
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const Routes = () => {
  const {user} = useContext(AppContext);

  const pantallasDrawer = [
    {
      name: 'Home',
      component: () => <DashBoard/>,
      rol: [1],
    },
    {
      name: 'ListaResidenciales',
      component: () => <StackScreensResidenciales />,
      rol: [2, 4],
    },
    {
      name: '2',
      component: () => <Text>Quejas</Text>,
      rol: [3, 2, 4],
    },
    {
      name: '3',
      component: () => <Text>Configuraciones</Text>,
      rol: [1, 4],
    },
  ];

  return (
    <>
      <Drawer.Navigator initialRouteName="Home">
        {pantallasDrawer.map(pantalla => {
          if (pantalla.rol.includes(user.rol)) {
            return <Drawer.Screen name={pantalla.name} component={pantalla.component} />;
          }
          return;
        })}
      </Drawer.Navigator>
    </>
  );
};

function StackScreensResidenciales() {
  return (
    <Stack.Navigator
      initialRouteName="verResidenciales"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="verResidenciales" component={VerResidenciales} />
      <Stack.Screen name="verTorres" component={VerTorres} />
      <Stack.Screen name="verDepartamentos" component={VerApartamentos} />
      <Stack.Screen name="NuevoDepartamento" component={NuevoDepartamento} />
      <Stack.Screen name="NuevaTorre" component={NuevaTorre} />
      <Stack.Screen name="NuevoResidencial" component={NuevoResidencial} />
      <Stack.Screen name="NuevoServicio" component={Servicios} />
      <Stack.Screen name="verServicios" component={VerServisios} />
    </Stack.Navigator>
  );
}
function StackScreensUser() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Stack" component={Routes} />
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="RegistroUsuario" component={RegistroUser} />
    </Stack.Navigator>
  );
}



export default StackScreensUser;
