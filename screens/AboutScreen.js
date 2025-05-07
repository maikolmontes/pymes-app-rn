import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sobre Nosotros</Text>
            <Text style={styles.text}>
                The Pymes Manager es una plataforma dedicada a fortalecer a las MiPymes de San Juan de Pasto mediante tecnología, visibilidad, y gestión moderna.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold' },
    text: { marginTop: 10, fontSize: 16 },
});
