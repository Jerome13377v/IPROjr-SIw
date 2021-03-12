import React, {  useContext } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput,KeyboardAvoidingView, } from 'react-native'
import FormConfigOkr  from './formConfigOkr'
import { UserContext } from '../../../../App';



export default function ConfigOkr({ navigation}) {
    const { idUser, setIdUser } = useContext(UserContext);
    return (
        <SafeAreaView>
        
            <Text style={styles.newTaskTitle}>Configurar K.Rs</Text>
            <FormConfigOkr  idUser={idUser} navigation={navigation}/>
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