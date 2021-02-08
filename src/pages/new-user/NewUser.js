import React, { useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import firebase from '../../config/firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import 'firebase/firestore';

export default function NewUser({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorRegister, setErrorRegister] = useState(false);
    const register = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
        
                var user = userCredential.user;
                var db = firebase.firestore();

                db.collection("users").doc(user.uid).set({
                    name: "Gabriel",
                    course: "Software Engineering"
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
                navigation.navigate("MyTabs",  { idUser: user.uid});
            
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                
            });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.newTaskTitle}>Criar Conta</Text>
            <TextInput
                style={styles.credentialInput}
                placeholder="Digite o seu e-mail"
                type="text"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                style={styles.credentialInput}
                secureTextEntry={true}
                placeholder="Digite sua senha"
                type="text"
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            {errorRegister === true
                ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#bdbdbd"
                    />
                    <Text style={styles.warningAlert}>Email ou senha inválidos</Text>
                </View>
                :
                null
            }
            {email === "" || password === ""
                ?
                <TouchableOpacity
                    disabled={true}
                    style={styles.buttonRegister}
                >
                    <Text style={styles.textButtonRegister}>Login</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={register}
                >
                    <Text style={styles.textButtonRegister}>Login</Text>
                </TouchableOpacity>
            }
        </KeyboardAvoidingView>
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
    container: {
        flex: 1,
        backgroundColor: '#e9ebef',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "ios" ? 0 : 50,
    },
    loginScreenTitle: {
        fontWeight: 'bold',
        fontSize: 36,
        color: '#000a4c',
        marginTop: 40,
        marginBottom: 10,
    },
    credentialInput: {
        width: 300,
        marginTop: 10,
        padding: 10,
        height: 50,
        borderColor: "#000a4c",
        borderWidth: 1,
        borderRadius: 8,
        //borderBottomWidth:1,
        //borderBottomColor:'#000a4c',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#000a4c',
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