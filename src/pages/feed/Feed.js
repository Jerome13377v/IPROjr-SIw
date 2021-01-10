import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
export default function Feed() {
    return (
        <SafeAreaView>
            <Text style={styles.feedTitle}>Feed</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    feedTitle: {
      fontWeight: 'bold',
      fontSize: 32,
      color: '#000a4c',
      marginTop: 40,
      marginLeft: 20
    },
  });