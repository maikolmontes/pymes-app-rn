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
  TextInput,
  FlatList,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [negocios, setNegocios] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [radiusKm, setRadiusKm] = useState('');
  const [showCategoryList, setShowCategoryList] = useState(false);

  const categories = [
    'Restaurante',
    'Tienda',
    'Cafetería',
    'Supermercado',
    'Mercado',
    'Frutería',
    'Ferretería',
    'Farmacia',
    'Librería',
    'Ropa',
    'Zapatería',
    'Juguetería',
    'Papelería',
    'Barbería',
    'Estética',
  ];

  useEffect(() => {
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

    (async () => {
      const storedNegocios = JSON.parse(await AsyncStorage.getItem('negocios')) || [];
      setNegocios(storedNegocios);
    })();
  }, []);

  const handleRadiusChange = (text) => {
    const onlyNumbers = text.replace(/[^0-9]/g, '');
    setRadiusKm(onlyNumbers);
  };

  const negociosFiltrados = negocios.filter(n => {
    const isCategoryMatch = !selectedCategory || n.category === selectedCategory;
    const isInRadius =
      !radiusKm ||
      getDistanceKm(location.latitude, location.longitude, n.latitude, n.longitude) <=
        parseFloat(radiusKm);
    return isCategoryMatch && isInRadius;
  });

  if (loading || !location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>Cargando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botón Filtro */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setIsFilterModalVisible(true)}
      >
        <Text style={styles.filterButtonText}>Filtrar</Text>
      </TouchableOpacity>

      {/* Botón Volver al inicio */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Inicio')}
      >
        <Text style={styles.homeButtonText}>🏠 Inicio</Text>
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
        showsUserLocation={false}
        followUserLocation={true}
      >
        {/* Marcador personalizado para tu ubicación */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Estás aquí"
          description="Mi ubicación actual"
          pinColor="blue"
        />

        {negociosFiltrados.map((negocio, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: negocio.latitude, longitude: negocio.longitude }}
            title={negocio.name}
            description={negocio.category}
          />
        ))}
      </MapView>

      {/* Modal Filtros */}
      <Modal visible={isFilterModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filtrar negocios</Text>

            <Text style={styles.modalSubtitle}>Categoría:</Text>
            <TouchableOpacity
              style={styles.selectorButton}
              onPress={() => setShowCategoryList(true)}
            >
              <Text>{selectedCategory || 'Selecciona una categoría'}</Text>
            </TouchableOpacity>

            {/* Lista de categorías */}
            <Modal visible={showCategoryList} transparent animationType="fade">
              <View style={styles.modalOverlay}>
                <View style={styles.categoryListModal}>
                  <FlatList
                    data={categories}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.categoryItem}
                        onPress={() => {
                          setSelectedCategory(item);
                          setShowCategoryList(false);
                        }}
                      >
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => {
                      setSelectedCategory(null);
                      setShowCategoryList(false);
                    }}
                  >
                    <Text style={{ color: 'red' }}>Limpiar categoría</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* Radio */}
            <Text style={styles.modalSubtitle}>Radio (km):</Text>
            <TextInput
              placeholder="Ej. 2"
              value={radiusKm}
              onChangeText={handleRadiusChange}
              keyboardType="numeric"
              style={styles.input}
              maxLength={4}
            />

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSelectedCategory(null);
                setRadiusKm('');
                setIsFilterModalVisible(false);
              }}
            >
              <Text style={{ color: 'red' }}>Mostrar todos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.categoryButton, { backgroundColor: '#2196F3' }]}
              onPress={() => {
                if (radiusKm && parseInt(radiusKm) <= 0) {
                  Alert.alert('Radio inválido', 'Por favor ingresa un número positivo.');
                  return;
                }
                setIsFilterModalVisible(false);
              }}
            >
              <Text style={{ color: 'white' }}>Aplicar filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  filterButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
  },
  filterButtonText: { color: 'white', fontWeight: 'bold' },
  homeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 2,
    backgroundColor: '#00b894',
    padding: 10,
    borderRadius: 8,
  },
  homeButtonText: { color: 'white', fontWeight: 'bold' },
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
  modalTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  modalSubtitle: { marginTop: 15, fontWeight: 'bold' },
  selectorButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
    borderRadius: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 5,
    borderRadius: 6,
  },
  clearButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  categoryButton: {
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 6,
  },
  categoryListModal: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '70%',
  },
  categoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});
