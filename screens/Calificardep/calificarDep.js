import React, { useState, useContext } from 'react';
import { FlatList, View, TouchableWithoutFeedback, Image } from 'react-native';
import globalStyles from '../../Styles/global';
import DropDown from 'react-native-paper-dropdown';
import ClientAxios from '../../helpers/clientAxios';
import { useFocusEffect } from '@react-navigation/core';
import AppContext from '../../context/AppContext' 
import {
    Button,
    Text,
    Card,
    Headline,
    FAB,
    Appbar,
    Title,
    Paragraph,
    TextInput

} from 'react-native-paper';


// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const CalificarDep = ({ navigation, route }) => {
    const [calificacion, setCalificacion] = useState('');
    const [departamento,setDepartamento] = useState('');
    const [Resena, setResena] = useState('');
    const { user } = useContext(AppContext);

    console.log(user);
    const item = route.params.item;
  
    //   useFocusEffect(
    //     React.useCallback(() => {
    //       const getData = async () => {
    //         try {
    //           const resultados = await ClientAxios.post('rentcar/getcarrentados', {
    //             key: '416063c3d13d79e6e99a702fcd9cea10',
    //             data: { idUser:user.ID },
    //           });
    //           setCarros(resultados.data);
    //           // console.log(resultados.data);
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       };
    //       getData();
    //       return () => console.log('on cleanup');
    //     }, []),
    //   );

    const Calificar = async () => {

        if (Number(calificacion) <= 0 || Number(calificacion) > 10) {
            alert('ingrese calificacion en un rango del 1 al 10')
            return
        }
        if (calificacion == '') {
            alert('La calificacion no puede estar vacío')
            return
        }
        console.log(item.ID_Carro);

        const CalificacionDep = {
            idUser:user.idUsuario,
            idDepartamento:'', //Con un useEfect obtener enciare ID usuario.
            calificacion:calificacion,
            descripcion:Resena
        }

        try {
            const resultados = await ClientAxios.post('complementos/calificar', {
                key: '291290336b75b259b77e181c87cc974f',
                data: {calificacion: CalificacionDep },
            });
            //setCarros(resultados.data);
            // console.log(resultados.data);
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
        }
    }
    // <Paragraph>alquilado por: {item.nombreuser}</Paragraph>
    //             <Paragraph>fecha de alquiler: {item.fecha}</Paragraph>
    //             <Paragraph>Días rentados: {item.cantDias}</Paragraph>x
    
    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Calificanos" />
            </Appbar.Header>
            <View style={globalStyles.contenedor}>

                <TextInput
                    label="Calificación"
                    style={globalStyles.inputs}
                    onChangeText={texto => setCalificacion(texto)}
                    value={calificacion}
                    keyboardType="number-pad"
                />
                <TextInput
                    label="Breve reseña:"
                    style={globalStyles.inputs}
                    onChangeText={texto => setResena(texto)}
                    value={Resena}
                    multiline
                    numberOfLines={20}

                />
                <Button onPress={() => Calificar()} mode='contained'>Calificar</Button>
            </View>
        </>
    );
};

export default CalificarDep;
