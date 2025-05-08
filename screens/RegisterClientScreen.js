import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  Image, ScrollView, Dimensions, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function RegisterClientScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'TU_CLIENT_ID_EXPO_GO',
    androidClientId: 'TU_CLIENT_ID_ANDROID',
    iosClientId: 'TU_CLIENT_ID_IOS',
  });

  const handleRegister = () => {
    if (!name || !email || !password || !userType) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los campos.');
      return;
    }
    Alert.alert('Registro exitoso', `Bienvenido ${name} (${userType})`);
  };

  const handleGoogleRegister = () => {
    promptAsync();
  };

  return (
    <View style={styles.container}>
      {/* Parte superior */}
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Register</Text>
      </View>

      {/* Parte inferior */}
      <ScrollView contentContainerStyle={styles.bottomSection} showsVerticalScrollIndicator={false}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Tipo de usuario</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={userType}
            onValueChange={(itemValue) => setUserType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona una opción..." value="" />
            <Picker.Item label="Emprendedor" value="emprendedor" />
            <Picker.Item label="Cliente" value="cliente" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>📝 Registrarse</Text>
        </TouchableOpacity>

        <Text style={styles.separator}>O continuar con</Text>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleRegister}>
          <Image
            source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Registrarse con Google</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topSection: {
    height: height * 0.22,
    backgroundColor: '#0A0E21',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
  },
  title: {
    color: '#fff',
    fontSize: width * 0.08,
    fontWeight: 'bold',
  },
  bottomSection: {
    padding: width * 0.06,
    paddingBottom: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: 10,
    fontWeight: 'bold',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  registerButton: {
    backgroundColor: '#2E86DE',
    width: '100%',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  separator: {
    color: '#666',
    marginBottom: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontWeight: 'bold',
  },
});
