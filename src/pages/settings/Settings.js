import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import firebase from '../../config/firebase';
import 'firebase/firestore';


export default function Settings({ navigation }) {
    function logout(){
        firebase.auth().signOut().then(() => {
           
            navigation.navigate("Login");
            // Sign-out successful.
          }).catch((error) => {
            console.log(error);
          });
    }
    return (
        <SafeAreaView>
            <Text style={styles.settingsTitle}>Configurações</Text>
            <TouchableOpacity
                style={styles.buttonRegister}
                onPress={()=>logout()}
            >
                <Text style={styles.textButtonRegister}>Sair</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonRegister}
                onPress={()=>navigation.navigate("ConfigOkr")}
            >
                <Text style={styles.textButtonRegister}>Configurar O.K.Rs</Text>
            </TouchableOpacity>
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
    buttonRegister: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000a4c',
        borderRadius: 8,
        marginTop: 30,
    },
    textButtonRegister: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24
    },
});