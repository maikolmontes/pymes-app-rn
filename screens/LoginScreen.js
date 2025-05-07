import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.text}>Aquí irá el formulario de inicio de sesión.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold' },
    text: { marginTop: 10, fontSize: 16 },
});
