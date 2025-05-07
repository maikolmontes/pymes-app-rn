// screens/BusinessListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const categoryIcons = {
    'Restaurante': 'restaurant',
    'Tienda': 'cart',
    'Cafetería': 'cafe',
    'Supermercado': 'basket',
    'Mercado': 'storefront',
    'Frutería': 'leaf',
    'Ferretería': 'hammer',
    'Farmacia': 'medkit',
    'Librería': 'book',
    'Ropa': 'shirt',
    'Zapatería': 'walk',
    'Juguetería': 'game-controller',
    'Papelería': 'document',
    'Barbería': 'cut',
    'Estética': 'color-palette',
};

export default function BusinessListScreen() {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBusinesses = async () => {
            const stored = await AsyncStorage.getItem('negocios');
            const parsed = stored ? JSON.parse(stored) : [];
            setBusinesses(parsed);
            setLoading(false);
        };
        loadBusinesses();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Ionicons
                name={categoryIcons[item.category] || 'business'}
                size={32}
                color="#2196F3"
                style={styles.icon}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.coordinates}>Lat: {item.latitude} | Lon: {item.longitude}</Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2196F3" />
                <Text>Cargando negocios...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={businesses}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 16,
        backgroundColor: '#f4f6f8',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    icon: {
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    category: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },
    coordinates: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 2,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
