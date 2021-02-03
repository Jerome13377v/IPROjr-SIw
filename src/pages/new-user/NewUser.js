import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput } from 'react-native'
export default function NewUser() {
    return (
        <SafeAreaView>
            <Text style={styles.newTaskTitle}>Criar Conta</Text>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    newTaskTitle: {
      fontWeight: 'bold',
      fontSize: 32,
      color: '#000a4c',
      marginTop: 40,
      marginLeft: 20
    },
  });