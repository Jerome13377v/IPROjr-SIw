import React, { useRef, useEffect, useContext, useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native';
//import Animated from 'react-native-reanimated';
import { Icon, Ionicons, MaterialIcons } from 'react-native-vector-icons';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import { UserContext } from '../../../App';
import 'firebase/firestore';
import firebase from '../../config/firebase';
import { sumTimes } from './somador';
const { width } = Dimensions.get('screen');
export default function UserProgressBarDay(props) {

    var data = new Date();
    var curr = new Date(data.valueOf() - data.getTimezoneOffset() * 60000); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 7; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toISOString();
    var lastday = new Date(curr.setDate(last)).toISOString();

    const { idUser, setIdUser } = useContext(UserContext);
    const barWidth = useRef(new Animated.Value(0)).current;
    const [finalWidth, setFinalWidth] = useState(0);

    var db = firebase.firestore();
    const [dayHoursArray, setDayHoursArray] = useState([]);
    const [loadedData, setLoadedData] = useState(false);
    const [hourSum, setHourSum] = useState("00:00");
    var DataAtualDeHoje = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);

    function configureProgressBar() {
        //console.log("FirstDay: " + firstday + "Lastday: " + lastday + "Today: " + DataAtualDeHoje.toISOString().substring(0, 10));
        let hours = "00:00:00";
        for (let index in dayHoursArray) {
            hours = sumTimes(hours, dayHoursArray[index].time.toString() + ":00");
        }
        setHourSum(hours.substring(0, 5));

        var a = hours.split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        //console.log("Seconds: " + seconds)
        let percentOfBar = ((seconds * (width * 0.85)) / 10800);

        if (seconds >= 10800) {
            setFinalWidth(width * 0.85);
        } else {
            setFinalWidth(percentOfBar);
        }
        //console.log("HORA SOMADA: " + hours + "\nPORCENTAGEM: " + percentOfBar);

    }

    useEffect(() => {
        Animated.spring(barWidth, {
            toValue: finalWidth,
            bounciness: 10,
            speed: 2,
            useNativeDriver: false
        }).start();
        db.collection(idUser).where("date", "==", DataAtualDeHoje.toISOString().substring(0, 10))
        .onSnapshot((querySnapshot) => {
                let arrayOfDocs = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    arrayOfDocs.push({ ...doc.data(), id: doc.id });
                });
                if( !loadedData ){
                    setDayHoursArray(arrayOfDocs);
                    setLoadedData(true);
                }
            })
            
        configureProgressBar();

        //console.log("hourSum: " + hourSum)

    }, [loadedData, dayHoursArray]);

    return (
        <View style={styles.progressBarComponentContainer}>
            <View style={styles.informationContainerText}>
                <Text style={styles.barTitle}>Seu dia</Text>
                <Text style={styles.barDayHourProgress} >{hourSum} / 03:00</Text>
            </View>
            <View style={styles.barContainer}>
                <Animated.View style={[styles.progressBar, { width: barWidth }]} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    progressBarComponentContainer: {
        marginLeft: 25,
        marginRight: 25,
        marginTop: 20,

    },
    barTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000a4c',
        textAlign: 'left',

    },
    barDayHourProgress: {
        marginTop: 5,
        marginBottom: 10,
        fontSize: 20,
        color: '#000a4c',
        textAlign: 'left',
    },
    informationContainerText:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignContent:'center',
        //backgroundColor:'pink'
    },
    barContainer: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: width * 0.85,
        backgroundColor: '#b9bbbf',
    },
    progressBar: {
        backgroundColor: '#247264',
        height: 15,
        borderRadius: 15,
    }
});
