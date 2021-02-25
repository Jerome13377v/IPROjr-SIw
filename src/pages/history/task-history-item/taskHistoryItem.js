import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        height: width / 2.6,
        width: width * 0.8 - 20,
        marginHorizontal: 10,
        borderRadius: 12,
        padding: 8,
        shadowColor: '#171717',
        elevation: 8,
        flexDirection: 'column',
        justifyContent:'space-evenly',
        marginTop:20,
    },
    activityTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000a4c'
    },
    activityObservation: {
        fontWeight: '500',
        fontSize: 20,
        color: '#000a4c'
    },
    activityTime: {
        fontWeight: '500',
        fontSize: 18,
        color: '#000a4c'
    }

});
export default function TaskHistoryItem(props) {
    return (
        <View style={styles.card}>
            <Text style={styles.activityTitle}>{props.title}</Text>
            <Text style={styles.activityObservation}>{props.observation}</Text>
            <Text style={styles.activityTime}>{props.time}</Text>
        </View>
    )
}


