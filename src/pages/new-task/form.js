import React, { useState, useEffect } from 'react';
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
import { UserContext } from '../../../App';
import 'firebase/firestore';
import firebase from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContext } from 'react-navigation';



export default function TaskForm(props) {
    const [idUser, setIdUser] = useState(props.idUser);
    var database = firebase.firestore();
    const [krData, setKrData] = useState([]);
    
    useEffect(() => {
        var userDoc = database.collection("users").doc(idUser);

        userDoc.get().then((doc) => {
            let docData = doc.data();
            setKrData(docData.krs.filter(function (el){
                return el.description != "";
            }));
           
        })


    }, []);
    // Titulo da atividade
    const [title, setTitle] = useState("")
    // Tipo de atividade
    const [typeActivity, setTypeActivity] = useState("none");



    // Data atual, outra data
    let data = new Date();
    const todaysDate = new Date(data.valueOf() - data.getTimezoneOffset() * 60000)
    const [selectedDate, setSelectedDate] = useState(todaysDate);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    // DUração
    const [time, setTime] = useState("00:00");

    // O.K.R
    const [okr, setOkr] = useState("none");

    // Modal de observação =================================
    // 
    // Mostrar e esconder
    const [modalVisible, setModalVisible] = useState(false);
    // Dados de observação
    const [observation, setObservation] = useState("");
    // =====================================================

    const onChange = (event, selectedDateTime) => {
        const currentDate = selectedDateTime || date;
        setShow(Platform.OS === 'ios');
        let auxTime = currentDate.toLocaleTimeString([], { timeStyle: 'short' });
        auxTime = auxTime.slice(0, 4 + 1);
        console.log('A data: ' + auxTime);
        setDate(currentDate);
        setTime(auxTime);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showTimepicker = () => {
        showMode('time');
    };

    function FormataStringData(data) {
        //Função que formata datas
        var dia = data.split("/")[0];
        var mes = data.split("/")[1];
        var ano = data.split("/")[2];

        return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
        // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
    }
    function compare(wordOne, wordTwo) {
        return wordOne[4] === wordTwo[4];
    }

    function enviarDados() {
        //console.log("CRU:"+selectedDate);

        let dateStringFormated;
        if (typeof (selectedDate) == 'object') {
            dateStringFormated = selectedDate.toISOString();
        } else {
            dateStringFormated = selectedDate;
        }
        console.log("BEFORE :" + dateStringFormated);
        if (dateStringFormated[4] == '-') {
            dateStringFormated = dateStringFormated.toString().substring(0, 10);
            //console.log("IF :"+dateStringFormated);
        } else {
            dateStringFormated = FormataStringData(dateStringFormated);
            //console.log("ELSE :"+dateStringFormated)
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
        //console.log(object);
        props.navigation.navigate("Success", { idUser: props.idUser });
    }
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}

            style={styles.formContainer}>
            <Text style={styles.textInputTitle}>Atividade</Text>
            <TextInput
                onChangeText={(title) => setTitle(title)}
                value={title}
                style={styles.textInput}
            />
            <Text style={styles.textInputTitle}>Tipo de Atividade</Text>
            <Picker style={styles.pickerField}
                selectedValue={typeActivity}
                onValueChange={(itemValue, itemIndex) =>
                    setTypeActivity(itemValue)
                }>
                <Picker.Item label="Funções do cargo" value="Funções do cargo" />
                <Picker.Item label="Reuniões do setor/coordenadoria" value="Reuniões do setor/coordenadoria" />
                <Picker.Item label="Reuniões fora do escopo" value="Reuniões fora do escopo" />
                <Picker.Item label="RA e RG" value="RA e RG" />
                <Picker.Item label="AGO" value="AGO" />
                <Picker.Item label="Propsecção Ativa" value="Propsecção Ativa" />
                <Picker.Item label="Execução de projetos" value="Execução de projetosa" />
                <Picker.Item label="Palestras e/ou capacitações" value="Palestras e/ou capacitações" />
                <Picker.Item label="Processo seletivo" value="Processo seletivo" />
                <Picker.Item label="Interações MEJ" value="Interações MEJ" />
            </Picker>

            <View style={styles.dateAndDurationContainer}>
                <View style={styles.dateAndDurationContainerChild}>
                    <Text style={styles.textInputTitle}>Data</Text>
                    <DatePicker
                        style={styles.dateInputField}
                        date={selectedDate}
                        mode="date"
                        placeholder="select date"
                        format="DD/MM/YYYY"
                        minDate="1/10/2021"
                        maxDate="31/12/2050"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                display: 'none',
                                position: 'absolute',
                                left: 0,
                                marginLeft: 0,
                            }, dateInput: {
                                borderWidth: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },

                        }}
                        onDateChange={(date) => { setSelectedDate(date) }}
                    />
                </View>
                <View style={styles.dateAndDurationContainerChild}>
                    <Text style={styles.textInputTitle}>Duração</Text>
                    <TouchableOpacity onPress={showTimepicker} >
                        <TextInput
                            editable={false}
                            value={time}
                            style={styles.timeTextInput}
                        />
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}

                            is24Hour={true}
                            display="default"
                            onChange={onChange}

                        />
                    )}
                </View>
            </View>


            <View style={styles.observationAndOkrContainer}>
                <View style={styles.observationAndOkrContainerChild}>
                    <View style={styles.dateAndOkrContainerChild}>
                        <Text style={styles.textInputTitle}>O.K.R</Text>
                        <Picker style={styles.pickerFieldOkr}
                            selectedValue={okr}
                            onValueChange={(itemValue, itemIndex) =>
                                setOkr(itemValue)
                            }>
                            {krData.map((KR, index) => {
                                return (
                                    <Picker.Item data-id={index} label={`${KR.number} - ${KR.description}`} value={`${KR.number} - ${KR.description}`} />

                                );
                            })}
                            {/*<Picker.Item label="1.2 - Funções do cargo" value="Funções do cargo" />
                            <Picker.Item label="1.3 -Reuniões do setor/coordenadoria" value="Reuniões do setor/coordenadoria" />
                            <Picker.Item label="1.1 - Reuniões fora do escopo" value="Reuniões fora do escopo" />
                            <Picker.Item label="2.1 - RA e RG" value="RA e RG" />
                            <Picker.Item label="3.1 - AGO" value="AGO" />
                            <Picker.Item label="3.2 - Propsecção Ativa" value="Propsecção Ativa" />
                            <Picker.Item label="3.3 - Execução de projetos" value="Execução de projetosa" />
                            <Picker.Item label="4.1 - Palestras e/ou capacitações" value="Palestras e/ou capacitações" />
                            <Picker.Item label="4.2 - Processo seletivo" value="Processo seletivo" />
                        <Picker.Item label="4.3 - Interações MEJ" value="Interações MEJ" />*/}
                        </Picker>
                    </View>
                </View>
                <View style={styles.observationAndOkrContainerChild}>
                    <Pressable
                        style={[styles.openerModalButton]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textStyle}>Observação</Text>
                    </Pressable>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Observação</Text>
                                <TextInput
                                    multiline
                                    onChangeText={(observation) => setObservation(observation)}

                                    value={observation}
                                    style={styles.textInputInsideModal}
                                />
                                <Pressable
                                    style={[styles.buttonInsideModal]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Pronto</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                </View>
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
                }}>Ok!</Text>
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
        borderRadius: 8,
        alignSelf: 'center',
        padding: 8,
        elevation: 2,
        marginBottom: 10,
    },
    pickerField: {
        backgroundColor: '#fff',
        height: 50,
        width: "100%",
        borderRadius: 12,
        alignSelf: 'center',
        padding: 8,
        elevation: 1,
        marginBottom: 10,
        color: '#000a4c',
    },
    dateInputField: {
        backgroundColor: '#fff',
        height: 50,
        fontSize: 24,
        borderRadius: 6,
        padding: 5,
        elevation: 1,
        marginBottom: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    timeTextInput: {
        backgroundColor: '#fff',
        fontWeight: "bold",
        color: "#000a4c",
        height: 50,
        fontSize: 24,
        width: "100%",
        borderRadius: 6,
        alignSelf: 'center',
        padding: 8,
        elevation: 1,
        marginBottom: 10,
    },
    dateAndDurationContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-evenly'
    },
    dateAndDurationContainerChild: {
        flex: 1,
    },
    observationAndOkrContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-evenly'
    },
    observationAndOkrContainerChild: {
        flex: 1,
    },
    pickerFieldOkr: {
        backgroundColor: '#fff',
        height: 50,
        width: "90%",
        borderRadius: 12,
        padding: 8,
        elevation: 1,
        marginBottom: 10,
        color: '#000a4c',
    },



    modalView: {
        margin: 5,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

    },
    openerModalButton: {
        borderRadius: 6,
        padding: 5,
        elevation: 2,
        backgroundColor: "#000a4c",
        flex: 1,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonInsideModal: {
        borderRadius: 6,
        padding: 5,
        elevation: 2,
        backgroundColor: "#000a4c",
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textInputInsideModal: {
        backgroundColor: '#fff',
        borderColor: "#000a4c",
        borderWidth: 1,
        fontSize: 20,
        width: "100%",
        borderRadius: 6,
        alignSelf: 'center',
        padding: 8,

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


