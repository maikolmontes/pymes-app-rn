import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

export default function RegisterBusinessScreen() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const categories = [
    'Restaurante', 'Tienda', 'Cafetería', 'Supermercado', 'Mercado',
    'Frutería', 'Ferretería', 'Farmacia', 'Librería', 'Ropa',
    'Zapatería', 'Juguetería', 'Papelería', 'Barbería', 'Estética',
  ];

  const handleRegister = async () => {
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      alert('Latitud y longitud válidas son requeridas.');
      return;
    }

    try {
      const newBusiness = {
        name,
        category,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };

      const existing = JSON.parse(await AsyncStorage.getItem('negocios')) || [];
      existing.push(newBusiness);
      await AsyncStorage.setItem('negocios', JSON.stringify(existing));

      alert('Negocio registrado con coordenadas');
      setName('');
      setCategory('');
      setLatitude('');
      setLongitude('');
    } catch (error) {
      console.log(error);
      alert('Error al guardar el negocio');
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso para acceder a la ubicación fue denegado');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
    } catch (error) {
      alert('Error al obtener la ubicación');
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registrar Negocio</Text>

        {/* Nombre */}
        <View style={styles.inputContainer}>
          <Ionicons name="business" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre del negocio"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Categoría */}
        <TouchableOpacity style={styles.inputContainer} onPress={() => setModalVisible(true)}>
          <Ionicons name="pricetag" size={20} color="#666" style={styles.icon} />
          <Text style={styles.input}>{category || 'Selecciona una categoría'}</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.categoryItem}
                    onPress={() => {
                      setCategory(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.categoryText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Latitud */}
        <View style={styles.inputContainer}>
          <Ionicons name="locate" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Latitud (ej: 1.205)"
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numeric"
          />
        </View>

        {/* Longitud */}
        <View style={styles.inputContainer}>
          <Ionicons name="locate" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Longitud (ej: -77.278)"
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numeric"
          />
        </View>

        {/* Botones */}
        <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
          <Text style={styles.locationButtonText}>📍 Usar mi ubicación actual</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>📌 Registrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: width * 0.06,
    paddingTop: 50,
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignSelf: 'center',
  },
  categoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
