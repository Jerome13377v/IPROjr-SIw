import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
export default function Settings() {
    return (
        <SafeAreaView>
            <Text style={styles.settingsTitle}>Configurações</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    settingsTitle: {
      fontWeight: 'bold',
      fontSize: 32,
      color: '#000a4c',
      marginTop: 40,
      marginLeft: 20
    },
  });