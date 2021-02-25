import React, { useEffect, useState, useContext} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions} from 'react-native'
import { UserContext } from '../../../App';
import 'firebase/firestore';
import firebase from '../../config/firebase';
import TaskHistoryItem from './task-history-item/taskHistoryItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';



const height  = Dimensions.get('window').height;
const width  = Dimensions.get('window').width

export default function History() {
    const { idUser, setIdUser } = useContext(UserContext);
    
    const [userData, setUserData] = useState({});
    const [taskListHistory, setTasklistHistory] = useState([]);


    var db = firebase.firestore();
    useEffect(() => {
        db.collection(idUser).onSnapshot((query) => {
            let taskList = [];
            query.forEach((doc) => {
                taskList.push({ ...doc.data(), id: doc.id })
            })
            setTasklistHistory(taskList);
        });
        console.log(taskListHistory)
    }, []);

    return (
        <SafeAreaView>
            <Text style={styles.historyTitle}>Histórico</Text>
            <FlatList
            style={styles.FlatlistView}
            data={taskListHistory}
            contentContainerStyle={{alignItems:'center', paddingBottom:100}}
            keyExtractor={ item => String(item.id) }
            renderItem={ ({item}) => <TaskHistoryItem title={item.title} observation={item.observation} time={item.time} /> }
            
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
    FlatlistView:{
        alignSelf:'center',
        height:height-130,
        width:width,
    }
});