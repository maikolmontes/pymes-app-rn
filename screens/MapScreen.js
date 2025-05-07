// screens/MapScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [negocios, setNegocios] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

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

  // Filtrar negocios por categoría seleccionada
  const negociosFiltrados = selectedCategory
    ? negocios.filter(n => n.category === selectedCategory)
    : negocios;

  return (
    <View style={styles.container}>
      {/* Botón Filtrar */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setIsFilterModalVisible(true)}
      >
        <Text style={styles.filterButtonText}>Filtrar</Text>
      </TouchableOpacity>

      {/* Mapa */}
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
        {negociosFiltrados.map((negocio, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: negocio.latitude, longitude: negocio.longitude }}
            title={negocio.name}
            description={negocio.category}
          />
        ))}
      </MapView>

      {/* Modal de Filtro */}
      <Modal visible={isFilterModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecciona una categoría:</Text>

            {['Restaurante', 'Tienda', 'Cafetería', 'Supermercado', 'Mercado',
        'Frutería', 'Ferretería', 'Farmacia', 'Librería', 'Ropa',
        'Zapatería', 'Juguetería', 'Papelería', 'Barbería', 'Estética'
    ].map(category => (
              <TouchableOpacity
                key={category}
                style={styles.categoryButton}
                onPress={() => {
                  setSelectedCategory(category);
                  setIsFilterModalVisible(false);
                }}
              >
                <Text>{category}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSelectedCategory(null); // Mostrar todos
                setIsFilterModalVisible(false);
              }}
            >
              <Text style={{ color: 'red' }}>Mostrar todos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
  },
  clearButton: {
    marginTop: 10,
    alignItems: 'center',
  },
});
