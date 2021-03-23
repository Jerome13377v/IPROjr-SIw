import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from 'react-native';

import firebase from '../../../config/firebase';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import 'firebase/firestore';

const screenWidth = Dimensions.get('window').width
export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [idUser, setIdUser] = useState("");
    const [user, setUser] = useState({});


    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setIdUser(user.uid)
                setUser(user);
            } else {

            }
        });
    }, []);
    function sendEmailFirebase() {
        firebase.auth().sendPasswordResetEmail(user.email)
            .then(() => {
                console.log("Email enviado")
                navigation.navigate("MyTabs", { idUser: idUser })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode+": "+errorMessage);
                // ..
            });

            //console.log(user.email);
    }


    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.changePasswrodTitle}>Alterar Senha</Text>

            <Text style={styles.passwordInstructionsMessage}>
                Ao pressionar o botão,
                um link para redefinição de senha será enviado para o seu e-mail
            </Text>

            <TouchableOpacity
                style={styles.buttonSendEmail}
                onPress={sendEmailFirebase}
            >
                <Text style={styles.textButtonLogin}>Enviar E-mail</Text>
            </TouchableOpacity>


        </KeyboardAvoidingView>


    )
}

const styles = StyleSheet.create({
    changePasswrodTitle: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#000a4c',
        marginTop: 40,
        
    },
    container: {
        flex: 1,
        backgroundColor: '#e9ebef',
        alignItems: 'center',
        paddingTop: Platform.OS === "ios" ? 0 : 50,
    },
    passwordInstructionsMessage:{
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        maxWidth:screenWidth *0.8,
        marginTop:10,
    },
    buttonSendEmail: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000a4c',
        borderRadius: 8,
        marginTop: 30,
    },
    textButtonLogin: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24
    },
    contentAlert: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningAlert: {
        paddingLeft: 10,
        color: "#bdbdbd",
        fontSize: 16,
    },
    registration: {
        marginTop: 20,
        color: "#334079",
        fontWeight: 'bold',
    },
    linkSubscribe: {
        color: "#fa570a",
        fontSize: 16,
    }
});