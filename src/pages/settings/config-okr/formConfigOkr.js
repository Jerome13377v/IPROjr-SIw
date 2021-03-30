import React, { useState } from 'react';
import {
    StyleSheet,
    Button, TextInput,
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Modal,
    Pressable,
    DrawerLayoutAndroidBase,
    useContext
} from 'react-native';
import { Formik, Field } from 'formik';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import { UserContext } from '../../../../App';
import 'firebase/firestore';
import firebase from '../../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContext } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';





const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width
export default function FormConfigOkr(props) {
    const [idUser, setIdUser] = useState(props.idUser);
    var database = firebase.firestore();


    const [krNumber, setKrNumber] = useState(0);
    const [krText, setKrText] = useState(0);

    const [krData11, setKrData11] = useState({ number: '1.1', description: "" });
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

    function updateInputNumber(index, number){
        setKrData([...krData, krData[index].number = number]);
        console.log(krData[index]);
    }
    function updateInputDescription(index, description){
        setKrData([...krData, krData[index].description = description]);
        console.log(krData[index]);
    }


    function updateTest(description) {
        setKrData11({ ...krData11, description: description })
        console.log(krData11);
    }
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
                                    onChangeText={(number)=>{updateInputNumber(index, number)}}
                                    value={input.number}
                                    style={styles.numberKrInput}
                                    keyboardType='numeric'
                                />
                                <TextInput
                                    onChangeText={(description) => {updateInputDescription(index, description)}}
                                    value={input.description}
                                    style={styles.textKrInput}
                                />
                            </View>
                        );
                    })
                }

                


















            </ScrollView>
            <Pressable style={({ pressed }) => [
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
    }
});


