// screens/RegisterBusinessScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';

export default function RegisterBusinessScreen() {
    const [form, setForm] = useState({
        name: '',
        category: '',
        description: '',
        location: '',
    });

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        console.log('Negocio registrado:', form);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Nombre del negocio:</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('name', text)} />

            <Text style={styles.label}>Categoría:</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('category', text)} />

            <Text style={styles.label}>Descripción:</Text>
            <TextInput
                style={styles.input}
                multiline
                numberOfLines={3}
                onChangeText={text => handleChange('description', text)}
            />

            <Text style={styles.label}>Ubicación:</Text>
            <TextInput style={styles.input} onChangeText={text => handleChange('location', text)} />

            <Button title="Registrar" onPress={handleSubmit} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#999',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
});
