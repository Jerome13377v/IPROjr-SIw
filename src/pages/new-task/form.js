import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default function TaskForm(props) {

    const [typeActivity, setTypeActivity] = useState();

    let data = new Date();
    const todaysDate = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    const [selectedDate, setSelectedDate] = useState(todaysDate.toISOString().substring(0, 10));

    const [time, setTime] = useState("00:00");
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [okr, setOkr] = useState();


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
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


    return (
        <Formik
            initialValues={{ email: '' }}
            onSubmit={values => console.log(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.formContainer}>
                    <Text style={styles.textInputTitle}>Atividade</Text>
                    <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
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
                                    style={styles.textInput}
                                />
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="clock"
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
                            </View>
                        </View>
                        <View style={styles.observationAndOkrContainerChild}>
                            <Text style={styles.textInputTitle}>Duração</Text>
                            <TouchableOpacity onPress={showTimepicker} >
                                <TextInput
                                    editable={false}
                                    value={time}
                                    style={styles.textInput}
                                />
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="clock"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </View>
                    <Button onPress={handleSubmit} title="Submit"
                        style={{
                            backgroundColor: '#fa570a',
                            height: 60,
                            fontSize: 30,
                            width: screenWidth * 0.95,
                            borderRadius: 12,
                            alignSelf: 'center',
                            padding: 15,
                            elevation: 10,
                            marginBottom: 10,
                        }} />
                </View>
            )}
        </Formik>

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
        borderRadius: 6,
        alignSelf: 'center',
        padding: 8,
        elevation: 1,
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
    }
});


