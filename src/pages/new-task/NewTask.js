import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput } from 'react-native'
import { MyReactNativeForm } from './form'
export default function NewTask() {
    return (
        <SafeAreaView>
            <Text style={styles.newTaskTitle}>Nova tarefa</Text>
            <MyReactNativeForm/>

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