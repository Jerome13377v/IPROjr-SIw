import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput,KeyboardAvoidingView, } from 'react-native'
import TaskForm  from './form'
export default function NewTask() {
    return (
        <SafeAreaView>
        
            <Text style={styles.newTaskTitle}>Nova tarefa</Text>
            <TaskForm/>
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