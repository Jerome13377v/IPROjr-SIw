import React, { useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput, KeyboardAvoidingView, } from 'react-native'
import TaskForm from './form'
import 'firebase/firestore';
import firebase from '../../config/firebase';



export default function NewTask({ navigation, route }) {
    var db = firebase.firestore();
    useEffect(() => {
        var docRef = db.collection("users").doc(route.params.idUser);

        docRef.get().then((doc) => {
            if (doc.exists) {
                let docData = doc.data();
                if(!docData.isKrSeted){
                    navigation.navigate("NeedToConfigOkr");
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [])
    return (
        <SafeAreaView>

            <Text style={styles.newTaskTitle}>Nova tarefa</Text>
            <TaskForm idUser={route.params.idUser} navigation={navigation} />
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