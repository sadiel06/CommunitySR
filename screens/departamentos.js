import React, { useState, useEffect } from 'react';
import { View, StyleSheet,Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import {  TextInput, Headline, Button, Paragraph, Dialog, Portal, DefaultTheme, Switch } from 'react-native-paper'
import globalStyles from '../Styles/global';
import axios from 'axios';
import DropDown from 'react-native-paper-dropdown';
let listaSector = [];
let provincias = [];
let municipios = [];
let sectores = [];
let list2 = [];
const NuevoDepartamento = ({navigate,route}) => {
   

    //estados
    const [nombre, setNombre] = useState('');
    const [nivel, setNivel] = useState('');
    const [cantHabitaciones, setCantHabitaciones] = useState('');
    const [cantBanos, setCantBanos] = useState('');
    const [amueblado, setAmueblado] = useState(true);
    const [precioAlquiler, setPrecioAlquiler] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [servicios, setServicios] = useState('');
    const [mostrarServicios, setMostrarServicios] = useState(false);
    //   const [mostrarSector, setMostrarSector] = useState(false);
    const [alerta, setAlerta] = useState(false);
    const [alerta1, setAlerta1] = useState(false);
    //funciones

    //fetch
    // useEffect(() => {
    //     const getdata = async () => {
    //         try {
    //             let response = await fetch(
    //                 'http://10.0.0.12:8080/API/residencial/get_provincias',
    //                 {
    //                     method: 'POST',
    //                     headers: {
    //                         'Accept': 'application/json',
    //                         'Content-Type': 'application/json'
    //                     },
    //                     body: JSON.stringify({ key: '291290336b75b259b77e181c87cc974f', data: {} })
    //                 }
    //             );
    //             provincias = await response.json();
    //             return provincias
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     getdata();

    // }, []);



    const guardarDepartamento = () => {
        //validar

        //enviar datos a la api

        //limpiar form 

        //redireccionar a otra pantalla
        console.log('ok');
    }
    //para el switch
    const onToggleSwitch = () => setIsSwitchOn(!amueblado);

    //Para dropdow Condicional
    // const prueva = async (region) => {
    //     list = [{ label: 'klk', value: '4' }]
    //     region === '1' ? list2 = [{ label: 'klk', value: '8' }] : list2 = [{ label: 'klk', value: '8' }, { label: 'klk2', value: '9' }]

    //     return setRegion(region);
    // }
    return (
        
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style={globalStyles.contenedor}>
                        <Headline style={globalStyles.titulo}>Nuevo Departamento</Headline>
                        <TextInput
                            label='Nombre del departamento'
                            placeholder='1A'
                            style={globalStyles.inputs}
                            onChangeText={texto => setNombre(texto)}
                            value={nombre}
                        />

                        <TextInput
                            label='Cantidad de niveles'
                            placeholder='1'
                            style={globalStyles.inputs}
                            onChangeText={texto => setNivel(texto)}
                            value={nivel}
                            keyboardType={'numeric'}
                        />
                        <TextInput
                            label='Cantidad de habitaciones'
                            placeholder='1'
                            style={globalStyles.inputs}
                            onChangeText={texto => setCantHabitaciones(texto)}
                            value={cantHabitaciones}
                            keyboardType='numeric'
                        />


                        <TextInput
                            label='Cantidad de boños'
                            placeholder='1'
                            style={globalStyles.inputs}
                            onChangeText={texto => setCantBanos(texto)}
                            value={cantBanos}
                            keyboardType='numeric'
                        />

                        <Text>Amueblado</Text>  <Switch value={amueblado} onValueChange={onToggleSwitch} />

                  <TextInput
                            label='Precio alquiler'
                            placeholder='5000'
                            style={globalStyles.inputs}
                            onChangeText={texto => setPrecioAlquiler(texto)}
                            value={precioAlquiler}
                            keyboardType='numeric'
                        />

                        <TextInput
                            label='Precio de venta'
                            placeholder='1,000,000'
                            style={globalStyles.inputs}
                            onChangeText={texto => setPrecioVenta(texto)}
                            value={precioVenta}
                            keyboardType='numeric'
                        />

                      

                        <Button icon='pencil-circle' mode='contained' onPress={
                            () => guardarResidencial()
                        } style={{ marginBottom: 15 }}>Guardar Departamento</Button>

                        <Button icon='pencil-circle' mode='contained' onPress={
                            () => setAlerta1(true)
                        } style={{ marginBottom: 15 }}>enviar</Button>


                        {/* Para campos vacios */}
                        <Portal>
                            <Dialog
                                visible={alerta}
                                onDismiss={() => setAlerta(false)}
                            >
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
                            <Dialog
                                visible={alerta1}
                                onDismiss={() => setAlerta1(false)}
                            >
                                <Dialog.Title>Error</Dialog.Title>
                                <Dialog.Content>
                                    <Paragraph>Todo bien</Paragraph>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={() => setAlerta1(false)}>OK</Button>
                                </Dialog.Actions>

                            </Dialog>
                        </Portal>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        
    );
}



export default NuevoDepartamento;