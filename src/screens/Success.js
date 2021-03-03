import React, { useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import sucessoJson from '../../assets/animations/sucesso.json';
import firebase from '../config/firebase';
import { CommonActions } from '@react-navigation/native';


const size = Dimensions.get('window').width * 0.7
export default function Success({ navigation, route }) {

    useEffect(() => {
        
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
        }, 1500);
    }, [])
    return (
        <View style={styles.container}>
            <LottieView style={{ width: size, height: size }} source={sucessoJson} autoPlay resizeMode='contain' />
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