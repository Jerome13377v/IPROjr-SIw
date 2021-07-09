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





const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width
export default function FormConfigOkr(props) {
    const [idUser, setIdUser] = useState(props.idUser);
    var db = firebase.firestore();


    const [krNumber, setKrNumber] = useState(0);
    const [krText, setKrText] = useState(0);

    const[ isDataFieldUpdated, setIsDataFieldUpdated ] = useState(true);
    const [krData, setKrData] = useState([
        { id: 0, number: '1.1', description: "" },
        { id: 1, number: '1.2', description: "" },
        { id: 2, number: '1.3', description: "" },
        { id: 3, number: '1.4', description: "" },

        { id: 4, number: '2.1', description: "" },
        { id: 5, number: '2.2', description: "" },
        { id: 6, number: '2.3', description: "" },
        { id: 7, number: '2.4', description: "" },

        { id: 8, number: '3.1', description: "" },
        { id: 9, number: '3.2', description: "" },
        { id: 10, number: '3.3', description: "" },
        { id: 11, number: '3.4', description: "" },
    ]);
    function addKrFiled(){
        let newStructure = krData;
        let newField = { id: krData[krData.length - 1].id + 1, number: '0.0', description: "" };
        newStructure.push(newField);
        setKrData(newStructure);
        console.log(krData);
        setIsDataFieldUpdated(!isDataFieldUpdated);
    }

    function updateInputNumber(index, number) {
        let newKrData = krData;
        newKrData[index].number = number;
        setKrData([...newKrData]);
        console.log(krData[index]);
    }
    function updateInputDescription(index, description) {
        let newKrData = krData;
        newKrData[index].description = description;
        setKrData([...newKrData]);
        console.log(krData[index]);
    }

    function updateUserKrsWithoutLeaveScreen() {
        var userDoc = db.collection("users").doc(idUser);
        userDoc.update({
            krs: krData,
            isKrSeted: true
        })
    }
    function updateUserKrs() {
        var userDoc = db.collection("users").doc(idUser);
        userDoc.update({
            krs: krData,
            isKrSeted: true
        })
        props.navigation.navigate("Success", { idUser: props.idUser });

        //db.collection("users").doc(idUser).set(userDoc);
    }
    useEffect(() => {
        var userDoc = db.collection("users").doc(idUser);
        userDoc.get().then((doc) => {
            let userDocData = doc.data();
            if (userDocData.isKrSeted  ) {
                setKrData(userDocData.krs.filter(function (el){
                    return  ( el.description != "" && el.id != "0.0" ) || ( el.description == "" && el.id == "" ) ;
                }));
                
            }
        })
    }, [])
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}

            style={styles.formContainer}>
            <View style={styles.tableHeader}>
                <Text style={styles.headerKrNumber}>K.R</Text>
                <Text style={styles.headerKrTitle}>Atividade</Text>
            </View>
            <ScrollView style={{ paddingBottom: 100, height: height - 230, width: width * 0.9, alignSelf: 'center' }}>

                {
                    krData.map((input, index) => {
                        return (
                            <View style={styles.krSection} data-id={index}>
                                <TextInput
                                    onChangeText={(number) => { updateInputNumber(index, number) }}
                                    value={input.number}
                                    style={styles.numberKrInput}
                                    keyboardType='numeric'
                                />
                                <TextInput
                                    onChangeText={(description) => { updateInputDescription(index, description) }}
                                    value={input.description}
                                    style={styles.textKrInput}
                                />
                            </View>
                        );
                    })
                }

                <Pressable onPress={addKrFiled} style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? '#aaa'
                            : '#ccc'
                    },
                    styles.addKrFieldButton
                ]}>
                    <MaterialIcons name="add" size={50} color="#777" />
                </Pressable>

            </ScrollView>
            <Pressable onPress={updateUserKrs} style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? '#bb460b'
                        : '#fa570a'
                },
                styles.submitButton
            ]}>
                <Text style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 24,
                    textAlign: 'center'
                }}>Feito!</Text>
            </Pressable>
        </KeyboardAvoidingView>



    );
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 20,
        width: screenWidth * 0.9,
        height: height - 180,
        alignSelf: 'center',
    },
    tableHeader: {
        flexDirection: 'row',

    },
    headerKrNumber: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
        color: '#000a4c',
        flexBasis: 'auto',
        flexShrink: 1,
        flexGrow: 1
    },
    headerKrTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
        color: '#000a4c',
        flexBasis: 'auto',
        flexShrink: 1,
        flexGrow: 3
    },
    numberKrInput: {
        backgroundColor: '#fff',
        height: 50,
        fontSize: 24,
        width: "25%",
        borderRadius: 6,
        alignSelf: 'center',
        padding: 8,
        elevation: 1,
        marginBottom: 10,
    },
    textKrInput: {
        backgroundColor: '#fff',
        height: 50,
        fontSize: 24,
        width: "73%",
        borderRadius: 6,
        alignSelf: 'center',
        padding: 8,
        elevation: 1,
        marginBottom: 10,
    },
    krSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInputTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
        color: '#000a4c',
    },
    textInput: {
        backgroundColor: '#fff',
        height: 50,
        fontSize: 24,
        width: "100%",
        borderRadius: 6,
        alignSelf: 'center',
        padding: 8,
        elevation: 1,
        marginBottom: 10,
    },



    submitButton: {
        borderRadius: 6,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    addKrFieldButton:{
        
        borderRadius:3,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width:100,
        marginTop:20,
        marginBottom:20,
        alignSelf:'center'

    }
});


