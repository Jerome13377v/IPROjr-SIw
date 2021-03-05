import React, { useRef, useEffect, useContext, useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native';
//import Animated from 'react-native-reanimated';
import { Icon, Ionicons, MaterialIcons } from 'react-native-vector-icons';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import { UserContext } from '../../../App';
import 'firebase/firestore';
import firebase from '../../config/firebase';

const { width } = Dimensions.get('screen');
export default function UserProgressBar(props) {

    var data = new Date();
    var curr = new Date(data.valueOf() - data.getTimezoneOffset() * 60000); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 7; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toISOString();
    var lastday = new Date(curr.setDate(last)).toISOString();

    const { idUser, setIdUser } = useContext(UserContext);
    const barWidth = useRef(new Animated.Value(0)).current;
    const [finalWidth, setFinalWidth] = useState(width * 0.85);

    var db = firebase.firestore();
    const [dayHoursArray, setDayHoursArray] = useState([]);
    const [hourSum, setHourSum] = useState(0);
    var DataAtualDeHoje = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    useEffect(() => {
        db.collection(idUser).where("date", "==", DataAtualDeHoje.toISOString().substring(0, 10))
            .get()
            .then((querySnapshot) => {
                let arrayOfDocs = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    arrayOfDocs.push({ ...doc.data(), id: doc.id });
                });
                setDayHoursArray(arrayOfDocs);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        console.log("FirstDay: " + firstday + "Lastday: " + lastday + "Today: " + DataAtualDeHoje.toISOString().substring(0, 10));
        let hours = "00:00";
        for (let index in dayHoursArray) {
            var sum = Date.parse(hours, "hh:mm");
            var someTime = Date.parse(dayHoursArray[index].time.toString, "hh:mm").add({ hour: sum.getHours(), minute: sum.getMinutes() });
            hours = someTime.toString("hh:mm");
        }
        console.log("HORA SOMADA: "+hours);
        Animated.spring(barWidth, {
            toValue: finalWidth,
            bounciness: 10,
            speed: 2,
            useNativeDriver: false
        }).start();
    }, [])
    return (
        <View style={styles.progressBarComponentContainer}>
            <View>
                <Text style={styles.barTitle}>Seu dia</Text>
                <Text style={styles.barDayHourProgress}>02:00 / 03:00</Text>
            </View>
            <View style={styles.barContainer}>
                <Animated.View style={[styles.progressBar, { width: barWidth }]} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    progressBarComponentContainer: {
        margin: 25
    },
    barTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000a4c',
        textAlign: 'left',

    },
    barDayHourProgress: {
        marginTop: 5,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000a4c',
        textAlign: 'left',
    },
    barContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',

        backgroundColor: 'yellow'
    },
    progressBar: {
        backgroundColor: 'purple',
        width: width * 0.85,
        height: 12,
        borderRadius: 15,
    }
});
