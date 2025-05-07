import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContactScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contáctanos</Text>
            <Text style={styles.text}>
                Email: soporte@pymesmanager.com{'\n'}
                Teléfono: +57 317 000 0000{'\n'}
                Dirección: San Juan de Pasto, Nariño, Colombia
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold' },
    text: { marginTop: 10, fontSize: 16 },
});
