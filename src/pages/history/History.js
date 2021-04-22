import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { UserContext } from '../../../App';
import 'firebase/firestore';
import firebase from '../../config/firebase';
import TaskHistoryItem from './task-history-item/taskHistoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width

export default function History() {
    const { idUser, setIdUser } = useContext(UserContext);

    const [userData, setUserData] = useState({});
    const [taskListHistory, setTasklistHistory] = useState([]);


    var data = new Date();
    var curr = new Date(data.valueOf() - data.getTimezoneOffset() * 60000); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 7; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toISOString();
    var lastday = new Date(curr.setDate(last)).toISOString();
    var db = firebase.firestore();

    useEffect(() => {
        let weekStart = new Date(firstday.substring(0, 10));
        let weekEnd = new Date(lastday.substring(0, 10));
        db.collection(idUser).where("iso_date", ">=", weekStart).where("iso_date", "<=", weekEnd).orderBy("iso_date","desc")
        .onSnapshot((querySnapshot) => {
                let taskList = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    taskList.push({ ...doc.data(), id: doc.id });
                });
                setTasklistHistory(taskList);
            })
           
        console.log(taskListHistory)
    }, []);

    return (
        <SafeAreaView>
            <Text style={styles.historyTitle}>Histórico</Text>
            <FlatList
                style={styles.FlatlistView}
                data={taskListHistory}
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <TaskHistoryItem idUser={idUser} taskId={item.id} title={item.title} date={item.date} observation={item.observation} time={item.time} />}
            />
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
    FlatlistView: {
        alignSelf: 'center',
        height: height - 130,
        width: width,
    }
});