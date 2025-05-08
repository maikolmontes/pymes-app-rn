import React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import {
    Image,
    View,
    Text,
    StyleSheet,
} from 'react-native';

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
                <Image source={require('../assets/logoW.png')} style={styles.logo} />
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
            <Drawer.Screen
                name="Mapa"
                component={MapScreen}
                options={{
                    drawerIcon: () => (
                        <Image source={require('../assets/logo2.png')} style={styles.icon} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Negocios"
                component={RegisterBusinessScreen}
                options={{
                    drawerIcon: () => (
                        <Image source={require('../assets/logo3.png')} style={styles.icon} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    drawerIcon: () => (
                        <Image source={require('../assets/logo1.png')} style={styles.icon} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Nosotros"
                component={AboutScreen}
                options={{
                    drawerIcon: () => (
                        <Image source={require('../assets/logo4.png')} style={styles.icon} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Contacto"
                component={ContactScreen}
                options={{
                    drawerIcon: () => (
                        <Image source={require('../assets/logo5.png')} style={styles.icon} />
                    ),
                }}
            />
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
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
});
