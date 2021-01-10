import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
export default function History() {
    return (
        <SafeAreaView>
            <Text style={styles.historyTitle}>Histórico</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    historyTitle: {
      fontWeight: 'bold',
      fontSize: 32,
      color: '#000a4c',
      marginTop: 40,
      marginLeft: 20
    },
  });