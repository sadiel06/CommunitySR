import React, {useContext} from 'react';
import VerResidenciales from './screens/Residenciales/verResidenciales';
import VerApartamentos from './screens/Residenciales/verApartamentos';
import NuevoResidencial from './screens/Residenciales/RegistroResidencial';
import {createStackNavigator} from '@react-navigation/stack';
import VerTorres from './screens/Residenciales/verTorres';
import NuevaTorre from './screens/Residenciales/torres';
import NuevoDepartamento from './screens/Residenciales/departamentos';
import Servicios from './screens/Residenciales/servicios';
import VerServisios from './screens/Residenciales/verServicios';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppContext} from './context/AppContext';
import Login from './screens/usuario/LoginScreen'
import DashBoard from './screens/usuario/Dashboard'
import RegistroUser from './screens/usuario/RegisterScreen'
import NuevaArea from './screens/Residenciales/areasComunes'
import verArea from './screens/Residenciales/verAreaComun'
import NuevoMantenimiento from './screens/Residenciales/mantenimientos'
import NuevaQueja from './screens/Quejas/NuevaQuejas'
import VerQueja from './screens/Quejas/verQuejas'
import DetalleQueja from './screens/Quejas/detalleQueja'
import Calificar from './screens/Calificardep/calificarDep'
import Quejarse from './screens/Quejas/Quejarse'
import VerPendientes from './screens/Tareas/VerPendientes'
import DetalleTarea from './screens/Tareas/DetalleTarea'
import AreasComunesMant from './screens/Tareas/AreasComunesMant'
import MantenimientoProg from './screens/Tareas/MantenimientoProg'
import AsignarTareas from './screens/Tareas/AsignarTarea'
import detalleDepartamento from './screens/Residenciales/detalleDeparatamento'
import agregarServicios from './screens/Residenciales/agregarServicios'
import AllDepartamentos from './screens/Filtro/AllDepartamentos'
import DetalleDepCliente from './screens/Filtro/DetalleDepCliente'
import VerNotificaciones from './screens/Notificaciones/VerNotificaion'
import Pagos from './screens/Pagos/pagos'
import DetalleNotificaciones from './screens/Notificaciones/DetalleNotificaciones'
import Solicitudesempleo from './screens/Residenciales/solicitudEmpleo'
import detalleSolicitudEmpleo from './screens/Residenciales/detalleSolicitudEmpleo'
import verServiciosPre from './screens/Residenciales/PredeterminadosServicios'
import NuevoServicioPre from './screens/Residenciales/NuevoServicioPre'

//stack
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

function StackScreensDepCli() {
  return (
    <Stack.Navigator
      initialRouteName="AllDepartamentos"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AllDepartamentos" component={AllDepartamentos} />
      <Stack.Screen name="DetalleDepCliente" component={DetalleDepCliente} />
    </Stack.Navigator>
  );
}

const Routes = () => {
  const {user} = useContext(AppContext);

  const pantallasDrawer = [
    {
      name: 'Home',
      component:  <DashBoard/>,
      rol: [1,2,3,4],
    },
    {
      name: 'Tareas Pendientes',
      component:  <StackScreenTareasPen/>,
      rol: [4],
    },
    {
      name: 'Lista de Residenciales',
      component:  <StackScreensResidenciales />,
      rol: [1],
    },
    {
      name: 'Solicitudes de empleo',
      component: <StackScreenSolicitudEmpleo/> ,
      rol: [1],
    },
    {
      name: 'Notificaciones',
      component:  <StackScreenNotificaciones />,
      rol: [1],
    },
    {
      name: 'Asignar Tarea',
      component:  <AsignarTareas/>,
      rol: [1],
    },
    {
      name: 'Pagos pendientes',
      component:  <Pagos/>,
      rol: [2],
    },
    {
      name: 'Quejarse',
      component:  <Quejarse/>,
      rol: [2],
    },
    {
      name: 'Calificar Departamento',
      component:  <Calificar/>,
      rol: [2],
    },
   
    {
      name: 'Buscar Departamentos',
      component:  <StackScreensDepCli/>,
      rol: [3],
    },
  ];

  return (
    <>
      <Drawer.Navigator initialRouteName="Home">
        {pantallasDrawer.map(pantalla => {
          if (pantalla.rol.includes(user.rol)) {
            return <Drawer.Screen name={pantalla.name}  
            key={pantalla.name}
            children={() => pantalla.component}
            />;
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
      <Stack.Screen name="NuevaArea" component={NuevaArea} />
      <Stack.Screen name="AreasComunes" component={verArea} /> 
      <Stack.Screen name="Mantenimiento" component={NuevoMantenimiento} /> 
      <Stack.Screen name="NuevaQueja" component={NuevaQueja} /> 
      <Stack.Screen name="VerQueja" component={VerQueja} /> 
      <Stack.Screen name="DetalleQueja" component={DetalleQueja} />
      <Stack.Screen name="detalleDepartamento" component={detalleDepartamento} />
      <Stack.Screen name="agregarServicios" component={agregarServicios} />
      <Stack.Screen name="verServiciosPre" component={verServiciosPre} />
      <Stack.Screen name="NuevoServicioPre" component={NuevoServicioPre} />
      {/* verServiciosPre NuevoServicioPre*/}
    </Stack.Navigator>
  );
}

function StackScreenNotificaciones() {
  return (
    <Stack.Navigator
      initialRouteName="VerNotificaciones"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="VerNotificaciones" component={VerNotificaciones} />
      <Stack.Screen name="DetalleNotificaciones" component={DetalleNotificaciones} />
    </Stack.Navigator>
  );
}

function StackScreenTareasPen() {
  return (
    <Stack.Navigator
      initialRouteName="TareasPendientes"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="TareasPendientes" component={VerPendientes} />
      <Stack.Screen name="DetallePendiente" component={DetalleTarea} />
    </Stack.Navigator>
  );
}

function StackScreenSolicitudEmpleo() {
  return (
    <Stack.Navigator
      initialRouteName="Solicitudesempleo"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Solicitudesempleo" component={Solicitudesempleo} />
      <Stack.Screen name="detalleSolicitudEmpleo" component={detalleSolicitudEmpleo} />
    </Stack.Navigator>
  );
}


export default StackScreensUser;
