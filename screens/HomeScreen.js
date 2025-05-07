// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>The Pymes Manager</Text>
            <View style={styles.line} />
            <Text style={styles.paragraph}>
                EXPLICACIÓN DE LA PÁGINA: El negocio, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat...
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    line: {
        height: 2,
        backgroundColor: '#000',
        width: 100,
        alignSelf: 'center',
        marginVertical: 10,
    },
    paragraph: {
        fontSize: 15,
        textAlign: 'justify',
        lineHeight: 24,
        color: '#333',
    },
});
