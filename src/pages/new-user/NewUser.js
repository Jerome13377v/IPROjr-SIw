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
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [errorRegister, setErrorRegister] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("Email ou senha inválidos");
    const register = () => {

        if(password === passwordConfirm){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                
                var user = userCredential.user;
                var db = firebase.firestore();
                
                db.collection("users").doc(user.uid).set({
                    name: name,
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
                setErrorRegister(true);
                let errorCode = error.code;
                let errorMessage = error.message;
                
            });
        }else{
            setErrorRegister(true);
            setErrorMessage("As senhas não se coincidem");
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.registerScreenTitle}>Criar Conta</Text>
            <TextInput
                style={styles.credentialInput}
                placeholder="Nome"
                type="text"
                value={name}
                onChangeText={(text) => setName(text)}
            />
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
            <TextInput
                style={styles.credentialInput}
                secureTextEntry={true}
                placeholder="Digite a senha novamente"
                type="text"
                value={passwordConfirm}
                onChangeText={(text) => setPasswordConfirm(text)}
            />
            {errorRegister === true
                ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#bdbdbd"
                    />
                    <Text style={styles.warningAlert}>{errorMessage}</Text>
                </View>
                :
                null
            }
            {email === "" || password === "" || name === "" || passwordConfirm === ""
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
                    <Text style={styles.textButtonRegister}>To dentro!!</Text>
                </TouchableOpacity>
            }
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: '#e9ebef',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "ios" ? 0 : 50,
    },
    registerScreenTitle: {
        fontWeight: 'bold',
        fontSize: 36,
        color: '#000a4c',
        marginTop: 10,
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
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#000a4c',
        fontSize: 22
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