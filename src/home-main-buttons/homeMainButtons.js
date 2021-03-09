import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon, Ionicons, MaterialIcons } from 'react-native-vector-icons';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function HomeMainButtons(props) {

    return (
        <View style={styles.button}>
            <View style={styles.contentViewIcon}>
                <MaterialIcons name={props.buttonType} size={70} color="#000a4c" />
            </View>
            <View style={styles.contentView}>
                <Text style={styles.buttonTitle}>{props.buttonTitle}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: screenWidth * 0.40,
        backgroundColor: '#fff',
        borderRadius: 12,
        height: screenWidth * 0.40,
        alignItems: 'center',
        flexDirection:'column',
        alignContent: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
        elevation: 12,
        marginTop:20
    },
    buttonTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        maxWidth:'90%',
        flexWrap:'wrap',
        color: '#000a4c',
        textAlign: 'center',

    },
    contentView:{
        justifyContent:'center',
        flexDirection:'column',
        flexBasis:'auto',
        flexShrink:1,
        flexGrow:1,
        //backgroundColor:'green',
        marginBottom:30


    },
    contentViewIcon:{
        justifyContent:'center',
        flexDirection:'column',
        flexBasis:100,
        flexShrink:0,
        flexGrow:2,
        //backgroundColor:'red'

    }
});
