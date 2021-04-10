import React, { useEffect, useState } from 'react';
import { Text, Button, List, Headline, FAB } from 'react-native-paper';
import { FlatList, View, StyleSheet } from 'react-native';
import axios from 'axios';
import ClientAxios from "../helpers/clientAxios";
import globalStyles from '../Styles/global';

const verResidenciales = ({ navigation, route }) => {
    const [residencial, setResidencial] = useState([]);
    const [consultar, setConsultar] = useState(true)
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const resultados =  await ClientAxios.post('residencial/getAllResidencial',{ key: '291290336b75b259b77e181c87cc974f', data: {} });
                setResidencial(resultados.data);
                setConsultar(false);
            } catch (error) {
                console.log(error);
            }
        }
        if (consultar) {
            obtenerDatos();
        }


    }, [consultar]);


    return (
        <>
            <View style={globalStyles.contenedor}>
                {/* <Button icon="plus-circle" onPress={() => navigation.navigate("NuevaTorre", { setConsultar })}>
                    Nueva torre
                </Button> */}
                <Headline style={globalStyles.titulo}>{residencial.length > 0 ? 'Residenciales' : 'Aún no tiene residenciales'}</Headline>
                <FlatList
                    data={residencial}
                    keyExtractor={residencial => (residencial.id).toString()}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.nombre}
                            onPress={() => navigation.navigate('verTorres', { item })}
                        />
                    )}
                />

                <FAB
                    icon='plus'
                    style={globalStyles.fab}
                    onPress={() => navigation.navigate("NuevoResidencial", { setConsultar })}
                />
            </View>
        </>
    );

}


export default verResidenciales;