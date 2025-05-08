import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>The Pymes Manager</Text>
        <View style={styles.line} />
        <Text style={styles.paragraph}>
          EXPLICACIÓN DE LA PÁGINA: El negocio, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat...
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.06, // Aproximadamente 22px
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: width * 0.05,
  },
  line: {
    height: 2,
    backgroundColor: '#2196F3',
    width: '30%',
    alignSelf: 'center',
    marginVertical: width * 0.03,
  },
  paragraph: {
    fontSize: width * 0.045, // Aproximadamente 15px
    textAlign: 'justify',
    lineHeight: 26,
    color: '#333',
  },
});
