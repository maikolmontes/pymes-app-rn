import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const categoryIcons = {
  Restaurante: 'restaurant',
  Tienda: 'cart',
  Cafetería: 'cafe',
  Supermercado: 'basket',
  Mercado: 'storefront',
  Frutería: 'leaf',
  Ferretería: 'hammer',
  Farmacia: 'medkit',
  Librería: 'book',
  Ropa: 'shirt',
  Zapatería: 'walk',
  Juguetería: 'game-controller',
  Papelería: 'document',
  Barbería: 'cut',
  Estética: 'color-palette',
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
        size={width * 0.08}
        color="#2196F3"
        style={styles.icon}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.coordinates}>
          Lat: {item.latitude} | Lon: {item.longitude}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>Cargando negocios...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={businesses}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: width * 0.04,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: width * 0.04,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: width * 0.038,
    color: '#777',
    marginTop: 4,
  },
  coordinates: {
    fontSize: width * 0.035,
    color: '#aaa',
    marginTop: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
