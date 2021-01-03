import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import iprojr from './assets/ipro.png';
export default function App() {
  return (
    <View style={styles.container}>
      <View>

        <Image source={require('./assets/ipro.png')}
          style={{ width: 400, height: 400 }}
        />
      </View>
      <Text>AHHH MLK</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
