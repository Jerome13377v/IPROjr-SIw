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



export default function FormConfigOkr(props) {
    const [idUser, setIdUser] = useState(props.idUser);
    var database = firebase.firestore();


    const [ krNumber, setKrNumber ] = useState(0);
    const [ krText, setKrText ] = useState(0);


    


   

    function enviarDados() {
        console.log("CRU:" + selectedDate);

        let dateStringFormated;
        if (typeof (selectedDate) == 'object') {
            dateStringFormated = selectedDate.toISOString();
        } else {
            dateStringFormated = selectedDate;
        }
        console.log("BEFORE :" + dateStringFormated);
        if (dateStringFormated[4] == '-') {
            dateStringFormated = dateStringFormated.toString().substring(0, 10);
            console.log("IF :" + dateStringFormated);
        } else {
            dateStringFormated = FormataStringData(dateStringFormated);
            console.log("ELSE :" + dateStringFormated)
        }
        var ISODate = new Date(dateStringFormated);
        let object = {
            title: title,
            typeActivity: typeActivity,
            date: dateStringFormated,
            iso_date: ISODate,
            time: time,
            okr: okr,
            observation: observation
        }
        database.collection(idUser).add(object);
        console.log(object);
        props.navigation.navigate("Success", { idUser: props.idUser });
    }
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}

            style={styles.formContainer}>
            <View style={styles.tableHeader}>
                <Text style={styles.headerKrNumber}>K.R</Text>
                <Text style={styles.headerKrTitle}>Atividade</Text>
            </View>
            <View style={styles.krSection}>
                <TextInput
                    onChangeText={(title) => setKrNumber(title)}
                    value={krNumber}
                    style={styles.numberKrInput}
                    keyboardType='numeric'
                />
                <TextInput
                    onChangeText={(title) => setKrText(title)}
                    value={krText}
                    style={styles.textKrInput}
                />
            </View>
            <View style={styles.krSection}>
                <TextInput
                    onChangeText={(title) => setKrNumber(title)}
                    value={krNumber}
                    style={styles.numberKrInput}
                    keyboardType='numeric'
                />
                <TextInput
                    onChangeText={(title) => setKrText(title)}
                    value={krText}
                    style={styles.textKrInput}
                />
            </View>
            <View style={styles.krSection}>
                <TextInput
                    onChangeText={(title) => setKrNumber(title)}
                    value={krNumber}
                    style={styles.numberKrInput}
                    keyboardType='numeric'
                />
                <TextInput
                    onChangeText={(title) => setKrText(title)}
                    value={krText}
                    style={styles.textKrInput}
                />
            </View>




            <Pressable onPress={enviarDados} style={({ pressed }) => [
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
        alignSelf: 'center',
    },
    tableHeader:{
        flexDirection:'row',

    },
    headerKrNumber:{
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
        color: '#000a4c',
        flexBasis:'auto',
        flexShrink:1,
        flexGrow:1
    },
    headerKrTitle:{
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
        color: '#000a4c',
        flexBasis:'auto',
        flexShrink:1,
        flexGrow:3
    },
    numberKrInput:{
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
    textKrInput:{
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
    krSection:{
        flexDirection:'row',
        justifyContent:'space-between'
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


