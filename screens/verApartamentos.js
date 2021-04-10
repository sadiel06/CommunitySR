import React, { useEffect, useState } from 'react';
import { Text, Button, List, Headline, FAB } from 'react-native-paper';
import { FlatList, View,StyleSheet } from 'react-native';
import axios from 'axios';
import globalStyles from '../Styles/global';

const verApartamento = ({navigation,route}) => {
    const [departamento, setDepartamento] = useState([]);
    const [consultar, setConsultar] = useState(true)
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const resultados = await axios.get('http://localhost:3000/datos');
                setDepartamento(resultados.data);
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
                <Button icon="plus-circle" onPress={()=>navigation.navigate("NuevoDepartamento",{setConsultar})}>
                    Nuevo departamento
                </Button>

                <Headline style={globalStyles.titulo}>{departamento.length > 0 ? 'Apartamentos' : 'No hay Apartamentos registrados'}</Headline>

                <FlatList
                    data={departamento}
                    keyExtractor={departamento => (departamento.id).toString()}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.entrada}
                            description={item.combo1}
                            onPress={()=>navigation.navigate('detalleDepartamento',{item})}
                        />
                    )}
                />

                <FAB
                 icon='plus'
                 style={styles.fab}
                 onPress={()=>navigation.navigate("NuevaTorre",{setConsultar})}
                />
            </View>
        </>
    );

}
const styles=StyleSheet.create({
    fab:{
        position:'absolute',
        margin:20,
        right:0,
        bottom:20
    }
})

export default verApartamento;