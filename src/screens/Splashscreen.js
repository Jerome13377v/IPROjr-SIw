import React, { useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import foguetaoJson from '../../assets/animations/foguetao.json';
import firebase from '../config/firebase';
import { CommonActions } from '@react-navigation/native';


const size = Dimensions.get('window').width * 0.9
export default function Splashscreen({ navigation }) {

    useEffect(() => {
        setTimeout(() =>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                navigation.navigate("MyTabs", { idUser: user.uid })
            } else {
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        { name: 'Login' },
                      ],
                    })
                  );

            }
        });
            
        }, 4000);
    }, [])
    return (
        <View style={styles.container}>
            <LottieView style={{ width: size, height: size }} source={foguetaoJson} autoPlay loop resizeMode='contain' />
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