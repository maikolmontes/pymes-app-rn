// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>The Pymes Manager</Text>
            <Text style={styles.subtitle}>
                Empodera tu negocio local. Digitaliza, crece y conecta.
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Registro')}
            >
                <Text style={styles.buttonText}>📋 Registrar Negocio</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => navigation.navigate('Mapa')}
            >
                <Text style={styles.buttonText}>🗺️ Ver negocios cercanos</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2F3640',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#636e72',
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#0984e3',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        elevation: 2,
    },
    buttonSecondary: {
        backgroundColor: '#00b894',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
