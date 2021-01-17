import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon, Ionicons, MaterialIcons } from 'react-native-vector-icons';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function HomeMainButtons(props) {

    return (
        <View style={styles.button}>
            <View style={styles.contentView}>
                <Text style={styles.buttonTitle}>{props.buttonTitle}</Text>
            </View>
            <View style={styles.contentView}>
                <MaterialIcons name={props.buttonType} size={80} color="#000a4c" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: screenWidth * 0.45,
        backgroundColor: '#fff',
        borderRadius: 12,
        height: screenHeight * 0.4,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
        elevation: 12
    },
    buttonTitle: {
        fontWeight: 'bold',
        fontSize: 28,
        color: '#000a4c',
        marginTop: 20,
        maxWidth: 130,
        textAlign: 'center'
    },
    contentView:{
        flex:1,
        justifyContent:'center',
        flexDirection:'column'
    }
});
