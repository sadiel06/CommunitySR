import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
  DefaultTheme,
  Switch,
} from 'react-native-paper';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import ScreenHeader from '../../components/ScreenHeader'
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import {UPLOADIMG} from '../../helpers/uploadIMG'
const NuevoDepartamento = ({navigation, route}) => {
  //estados
  const [nombre, setNombre] = useState('');
  const [cantHabitaciones, setCantHabitaciones] = useState('');
  const [cantBanos, setCantBanos] = useState('');
  const [amueblado, setAmueblado] = useState(true);
  const [precioAlquiler, setPrecioAlquiler] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [disponibeVenta, setDisponibleVenta] = useState(false);
  const [url,setUrl]=useState('')
  const [response, setResponse] = React.useState(null);
  //   const [mostrarServicios, setMostrarServicios] = useState(false);
  //   //   const [mostrarSector, setMostrarSector] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [alerta1, setAlerta1] = useState(false);
  //funciones

const tomarFoto=()=>{
  launchCamera(
    {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
    },
    async (response) => {
      setResponse(response);
      // alert(JSON.stringify(response, null, 2))
      const respuesta = await UPLOADIMG(response);
      setUrl(respuesta)
      alert(respuesta);
      setAlerta1(false);

    },
  )
}
const seleccionarimg=()=>{
   launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      async (response) => {
        setResponse(response);
        // alert(JSON.stringify(response, null, 2))
        const respuesta = await UPLOADIMG(response);
        alert(respuesta);
        setUrl(respuesta);
        setAlerta1(false);
      },
    )
}
  const guardarDepartamento = async () => {
    //validar
    if (
        nombre === '' ||
        isNaN(cantHabitaciones) ||
        isNaN(cantBanos)||
        isNaN(precioAlquiler)||
        isNaN(precioVenta)
      ) {
        alert('Revise los campos');
        return;
      }
    //declarar objeto
    const departamento = {
        id:Number(route.params),
        nombre,
        preventa:Number(precioVenta),
        prealquiler:Number(precioAlquiler),
        dispoventa:disponibeVenta,
        cantBath:Number(cantBanos),
        cantHabi:Number(cantHabitaciones),
        amueblado:amueblado,
        image:url
      };
    //insert cantidadPisos
    console.log(route.params)
    try {
        const res = await ClientAxios.post('departamento/insert', {
          key: '291290336b75b259b77e181c87cc974f',
          data: departamento,
        });
        if (res.data.key === '1') {
          // alert('Se completó');
          navigation.navigate('verDepartamentos');
        } else {
          throw Error('No se ha podido completar');
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    //redireccionar a otra pantalla
    console.log(departamento);
  };
  //para el switch
  const onToggleSwitch = () => setAmueblado(!amueblado);
  const onToggleSwitch2 = () => setDisponibleVenta(!disponibeVenta);
  //Para dropdow Condicional
  // const prueva = async (region) => {
  //     list = [{ label: 'klk', value: '4' }]
  //     region === '1' ? list2 = [{ label: 'klk', value: '8' }] : list2 = [{ label: 'klk', value: '8' }, { label: 'klk2', value: '9' }]

  //     return setRegion(region);
  // }
  return (
    <ScreenHeader title='Nuevo Apartamento'>
    <ScrollView>
      <KeyboardAvoidingView>
        <View style={globalStyles.contenedor}>
          <Headline style={globalStyles.titulo}>Nuevo Departamento</Headline>
          <TextInput
            label="Nombre del departamento"
            placeholder="1A"
            style={globalStyles.inputs}
            onChangeText={texto => setNombre(texto)}
            value={nombre}
          />

          <TextInput
            label="Cantidad de habitaciones"
            placeholder="1"
            style={globalStyles.inputs}
            onChangeText={texto => setCantHabitaciones(texto)}
            value={cantHabitaciones}
            keyboardType="numeric"
          />
          <TextInput
            label="Cantidad de boños"
            placeholder="1"
            style={globalStyles.inputs}
            onChangeText={texto => setCantBanos(texto)}
            value={cantBanos}
            keyboardType="numeric"
          />
          <Text>Amueblado</Text>
          <Switch accessibilityLabel='hola' value={amueblado} onValueChange={onToggleSwitch} />

          <Text>Disponible para ventas</Text>
          <Switch value={disponibeVenta} onValueChange={onToggleSwitch2} />

          <TextInput
            label="Precio alquiler"
            placeholder="5000"
            style={globalStyles.inputs}
            onChangeText={texto => setPrecioAlquiler(texto)}
            value={precioAlquiler}
            keyboardType="numeric"
          />
          <TextInput
            label="Precio de venta"
            placeholder="1,000,000"
            style={globalStyles.inputs}
            onChangeText={texto => setPrecioVenta(texto)}
            value={precioVenta}
            keyboardType="numeric"
          />
          <Button
            icon={url?"check":"upload"}
            mode="contained"
            onPress={() => setAlerta1(true)}
            style={{marginBottom: 15}}>
            Subir imagen
          </Button>
          <Button
            icon="pencil-circle"
            mode="contained"
            onPress={() => guardarDepartamento()}
            style={{marginBottom: 15}}>
            Guardar Departamento
          </Button>
          {/* Para campos vacios */}
          <Portal>
            <Dialog visible={alerta} onDismiss={() => setAlerta(false)}>
              <Dialog.Title>Error</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Todos los campos son requeridos</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setAlerta(false)}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={alerta1} onDismiss={() => setAlerta1(false)}>
              <Dialog.Title>Desea seleccionar una foto o tomarla</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Presione el boton correspondiente</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button icon='file-image' onPress={seleccionarimg}>Selecciona</Button>
                <Button icon='camera' onPress={tomarFoto}>captura</Button>

              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
    </ScreenHeader>
  );
};

export default NuevoDepartamento;
