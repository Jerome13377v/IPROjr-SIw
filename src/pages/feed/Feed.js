import React, { useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import astronautaPerdidoJson from '../../../assets/animations/astronautaPerdido.json'
const size = Dimensions.get('window').width * 0.7
export default function Feed() {
    return (
        <SafeAreaView>
            <Text style={styles.feedTitle}>Feed</Text>
            <View style={styles.container}>
                <LottieView style={{ width: size, height: size }} source={astronautaPerdidoJson} autoPlay loop resizeMode='contain' />
                <Text style={styles.mimo}>Obras no espaço!</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    feedTitle: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#000a4c',
        marginTop: 40,
        marginLeft: 20
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    mimo:{
        fontWeight:'bold',
        color:'#000a4c',
        fontSize:24,
    }
});