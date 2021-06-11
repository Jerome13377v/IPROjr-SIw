import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Dimensions,
    Text,
    KeyboardAvoidingView,
    Pressable,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
import 'firebase/firestore';
import firebase from '../../../config/firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon, Ionicons, MaterialIcons } from 'react-native-vector-icons';
import LottieView from 'lottie-react-native';
import userNameJson from '../../../../assets/animations/userName.json';





const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width
const size = Dimensions.get('window').width * 0.7
export default function ChangeUsername({navigation}) {
    const [idUser, setIdUser] = useState("");
    var db = firebase.firestore();

    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState("");
    

    function updateUseName() {
        if( username != "" ){

            var userDoc = db.collection("users").doc(idUser);
            userDoc.update({
                name: username
            })
        }
        navigation.navigate("Success", { idUser: idUser });
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
           
            if (user) {
                setIdUser(user.uid)
            } else {

            }
        });
    }, []);
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}

            style={styles.formContainer}>
            <View style={styles.contentConteiner}>
            <Text style={styles.newTaskTitle}>Trocar nome</Text>
                <TextInput
                    onChangeText={(username) => setUsername(username)}
                    value={username}
                    style={styles.textInput}
                    placeholder="Novo nome"
                />
                {/*<LottieView style={{ width: size, height: size, padding:0, margin:0, }} source={userNameJson} autoPlay resizeMode='contain' />*/}
                <Pressable onPress={updateUseName} style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? '#00093b'
                            : '#000a4c'
                    },
                    styles.submitButton
                ]}>
                    <Text style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 24,
                        textAlign: 'center'
                    }}>Salvar</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>



    );
}

const styles = StyleSheet.create({

    contentConteiner: {
        
        height:height,
        backgroundColor: "#e9ebef",
        justifyContent:'center',
        alignItems: 'center',
       


    },
    tableHeader: {
        flexDirection: 'row',

    },
    newTaskTitle: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#000a4c',
        
        

    },


    textInput: {
        backgroundColor: '#fff',
        height: 50,
        fontSize: 24,
        width: "90%",
        borderRadius: 6,
        alignSelf: 'center',
        padding: 8,
        elevation: 1,
        marginBottom: 5,
        marginTop:20
    },




    submitButton: {
        borderRadius: 6,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        width: width *0.7,
        marginTop:20,
    },
    addKrFieldButton: {

        borderRadius: 3,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center'

    }
});


