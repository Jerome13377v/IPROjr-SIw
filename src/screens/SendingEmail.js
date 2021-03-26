import React, { useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import sendingEmailJson from '../../assets/animations/sendingEmail.json';
import firebase from '../config/firebase';
import { CommonActions } from '@react-navigation/native';


const size = Dimensions.get('window').width * 0.7
export default function SendingEmail({ navigation, route }) {

    useEffect(() => {
        firebase.auth().sendPasswordResetEmail(route.params.emailUser)
            .then(() => {
                console.log("Email enviado")
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode+": "+errorMessage);
                // ..
            });
        setTimeout(() =>{
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'MyTabs',
                      params: { idUser: route.params.idUser },
                    },
                  ],
                })
              );
        }, 3000);
    }, [])
    return (
        <View style={styles.container}>
            <LottieView style={{ width: size, height: size }} source={sendingEmailJson} autoPlay resizeMode='contain' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
});