import React, { useEffect, useState } from 'react';
import { Text, Button, List, Headline, FAB } from 'react-native-paper';
import { FlatList, View, StyleSheet } from 'react-native';
import axios from 'axios';
import globalStyles from '../Styles/global';

const verTorre = ({ navigation,route }) => {
    const [torres, setTorres] = useState([]);
    const [consultar, setConsultar] = useState(true)
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const resultados = await axios.get('http://localhost:3000/datos');
                setTorres(resultados.data);
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

                <Button icon="plus-circle" onPress={() => navigation.navigate("NuevaTorre", { setConsultar })}>
                    Nueva torre
                </Button>
                <Headline style={globalStyles.titulo}>{torres.length > 0 ? 'Torres' : 'Aún no tiene torres regiistradas'}</Headline>
                <FlatList
                    data={torres}
                    keyExtractor={torres => (torres.id).toString()}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.nombre}
                            onPress={() => navigation.navigate('NuevoResidencial', { item })}
                        />
                    )}
                />

                <FAB
                    icon='plus'
                    style={globalStyles.fab}
                    onPress={() => navigation.navigate("verDepartamentos", route.params.residencial,{ setConsultar })}
                />
            </View>
        </>
    );

}


export default verTorre;