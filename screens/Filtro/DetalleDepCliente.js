import React, { useEffect, useState, useContext } from 'react';
import { View, ToastAndroid, Text } from 'react-native';
import {
  Button,
  Appbar,
  Card,
  Title,
  Paragraph,
  TextInput
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown'
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import { AppContext } from '../../context/AppContext'

let solicituddes=[
  {label:'Compra',value:'2'},
{label:'Arquiler',value:'1'}]

const DetalleDep = ({ navigation, route }) => {
  // return <Text>{route.params.item.descripcion}</Text>
  const [departamento, setDepartamento] = useState({});
  const [TipoSolicitud, setTipoSolicitud] =useState('')
  const [ver,setVer]=useState(false)
  const { user } = useContext(AppContext);
  console.log(route.params)
  useEffect(() => {

    setDepartamento(route.params.item);
  }, []);

  const SolicituEmpleo = async () => {
   
    try {
      const res = await ClientAxios.post('complementos/insertsolicitudempleado', {
        key: '291290336b75b259b77e181c87cc974f',
        data: {
      
          idUser: user.idUsuario,
          idResi: departamento.idresi,
        
        },
      });

      
      navigation.goBack();
      // console.log(res.data);

    } catch (error) {
      console.log(error);
      alert(error);
    }

  }

  const Solicitud = async () => {
   console.log(JSON.stringify(departamento,null,4))
 
   
    try {
      const res = await ClientAxios.post('complementos/insertsolicitud', {
        key: '291290336b75b259b77e181c87cc974f',
        data: {
          idUser: 6,
          idDepar: departamento.ID_departamento,
          idResi: departamento.idresi,
          iscompra: Number(TipoSolicitud)
        },
      });

     
      navigation.goBack();
      // console.log(res.data);

    } catch (error) {
      console.log(error);
      alert(error);
    }

  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detalle Departamento" />
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
        <Card>
          <Card.Content>
            <Title>
              {departamento.Nombre_departamento + ' - ' + departamento.nombre}
            </Title>
            <Paragraph>Provincia: {departamento.nomprovincia}</Paragraph>
            <Paragraph>Precio Alquiler: {departamento.PrecioAlquiler}</Paragraph>

          </Card.Content>
          <Card.Actions>
            <Button onPress={() => SolicituEmpleo()}>Solicitar Empleo</Button>
         
          </Card.Actions>
        </Card>

        <View style={globalStyles.inputs}>
        <DropDown
          label={'Tipo de solicitud'}
          mode="outlined"
          value={TipoSolicitud}
          list={solicituddes}
          setValue={setTipoSolicitud}
          visible={ver}
          showDropDown={() => setVer(true)}
          onDismiss={() => setVer(false)}
          inputProps={{
            right: <TextInput.Icon name={'menu-down'} />,

          }}
        />
      </View>
      <Button onPress={() => Solicitud()} mode='contained'>Solicitar</Button>

      </View>
    </>
  );
};

export default DetalleDep;
