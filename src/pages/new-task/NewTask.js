import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
export default function NewTask() {
    return (
        <SafeAreaView>
            <Text style={styles.newTaskTitle}>Nova tarefa</Text>
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