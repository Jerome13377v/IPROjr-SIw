import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Icon, Ionicons, MaterialIcons } from 'react-native-vector-icons';
import 'firebase/firestore';
import firebase from '../../../config/firebase';

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        height: width / 2.6,
        width: width * 0.8 - 20,
        marginHorizontal: 10,
        borderRadius: 12,
        padding: 15,
        shadowColor: '#171717',
        elevation: 8,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: 20,
        overflow:'hidden'
    },
    headerCardView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom: 20,
    },
    activityTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000a4c',
        
    },
    removeTaskButton:{
        height:'100%',
        
        right:-15,
        top:-2,
        alignItems:'center',
        flexDirection:'column',
        padding:5,
        borderRadius:5
    },
    removeTaskButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 24,
        textAlign: 'center'
    },
    activityObservation: {
        fontWeight: '500',
        fontSize: 16,
        color: '#000a4c',
        marginBottom: 20,
    },
    activityTime: {
        fontWeight: '500',
        fontSize: 18,
        color: '#000a4c',
        alignSelf: 'flex-end',
    },
    activityDate: {
        fontWeight: '500',
        fontSize: 18,
        color: '#000a4c',
        alignSelf: 'flex-end',
    },
    activityDateAndTimeView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }

});

export default function TaskHistoryItem(props) {
    const [formatedDate, setFormatedDate] = useState("");
    const [ deleted, setDeleted ] = useState(false);
    var db = firebase.firestore();
    useEffect(() => {
        let dateString = props.date[8] + props.date[9] + "/" + props.date[5] + props.date[6] //2021-11-21
        setFormatedDate(dateString);
    }, [])

    function deleteTask(){
        var document = db.collection(props.idUser).doc(props.taskId).delete().then(() => {
            console.log("Tarefa Deletada com sucesso");
            console.log(props.taskId)
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        
    }
    return (
        <View style={ styles.card}>
            <View style={styles.headerCardView}>
                <Text style={styles.activityTitle}>{props.title}</Text>

                <Pressable onPress={deleteTask}style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? '#e9ebef'
                            : '#fff'
                    },
                    styles.removeTaskButton
                ]}>
                    <MaterialIcons name="remove-circle-outline" size={25} color="#ff0228" />
                </Pressable>

            </View>
            <Text style={styles.activityObservation}>{props.observation}</Text>
            <View style={styles.activityDateAndTimeView}>
                <Text style={styles.activityDate}>{formatedDate}</Text>
                <Text style={styles.activityTime}>{props.time}</Text>
            </View>
        </View>
    )
}


