// screens/MapScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapScreen() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [negocios, setNegocios] = useState([]);

    useEffect(() => {
        // Obtener la ubicación del usuario
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'Se requiere acceso a la ubicación para usar el mapa.');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
            setLoading(false);
        })();

        // Obtener los negocios registrados desde AsyncStorage
        (async () => {
            const storedNegocios = JSON.parse(await AsyncStorage.getItem('negocios')) || [];
            setNegocios(storedNegocios);
        })();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2196F3" />
                <Text>Cargando mapa...</Text>
            </View>
        );
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
            followUserLocation={true}
        >
            {/* Mostrar los negocios guardados */}
            {negocios.map((negocio, index) => (
                <Marker
                    key={index}
                    coordinate={{ latitude: negocio.latitude, longitude: negocio.longitude }}
                    title={negocio.name}
                    description={negocio.category}
                />
            ))}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
