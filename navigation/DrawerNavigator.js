import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import RegisterBusinessScreen from '../screens/RegisterBusinessScreen';
import MapScreen from '../screens/MapScreen';
import LoginScreen from '../screens/LoginScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.logoText}>The Pymes Manager</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: { backgroundColor: '#0A0A23' },
                headerStyle: { backgroundColor: '#fff' },
                headerTitleAlign: 'center',
                headerTintColor: '#000',
                drawerLabelStyle: { color: '#fff' },
            }}
        >
            <Drawer.Screen name="Inicio" component={HomeScreen} />
            <Drawer.Screen name="Mapa" component={MapScreen} />
            <Drawer.Screen name="Negocios" component={RegisterBusinessScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Nosotros" component={AboutScreen} />
            <Drawer.Screen name="Contacto" component={ContactScreen} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    logoText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
