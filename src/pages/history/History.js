import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { UserContext } from '../../../App';
import 'firebase/firestore';
import firebase from '../../config/firebase';
import TaskHistoryItem from './task-history-item/taskHistoryItem';



export default function History() {
    const { idUser, setIdUser } = useContext(UserContext);
    const [userData, setUserData] = useState({});
    const [taskListHistory, setTasklistHistory] = useState([]);

    var db = firebase.firestore();

    useEffect(() => {
        var docRef = db.collection(idUser).onSnapshot((query) => {
            const taskList = [];
            query.forEach((doc) => {
                taskList.push({ ...doc.data, id: doc.id })
            })
            setTasklistHistory(taskList);
        });

    }, []);
    const numbers = [1, 2, 3, 4, 5];
    const listItems =  taskListHistory.map((item) => <TaskHistoryItem title={item.title} observation={item.observation} time={item.time} />)

    return (
        <SafeAreaView>
            <Text style={styles.historyTitle}>Histórico {userData.name}</Text>
            <ScrollView>
                {

                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    historyTitle: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#000a4c',
        marginTop: 40,
        marginLeft: 20
    },
});