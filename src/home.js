import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeHorizontalList from './home-horizontal-list/homeHorizontalList'
import HomeMainButtons from './home-main-buttons/homeMainButtons';
import NewTask from './pages/new-task/NewTask';
import History from './pages/history/History';
import { UserContext } from '../App';
import 'firebase/firestore';
import firebase from './config/firebase';
const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window')


function SecondHome() {
  const data = [
    {
      title: 'Relatório Semanal',
      observation: 'Estive fazendo o relatorio da semana',
      time: '1h25min'
    },
    {
      title: 'Leitura de e-mails',
      observation: 'Estive lendo emails',
      time: '45min'
    },
    {
      title: 'Respondendo Telegram',
      observation: 'Repondi muitas mensagens',
      time: '1h'
    }
  ]


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.homeTitle}>Olá, Gabriel</Text>
      <StatusBar style="auto" />
      <View style={styles.mainButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('NewTask')}>
          <HomeMainButtons buttonType="add-alarm" buttonTitle="Nova Tarefa" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <HomeMainButtons buttonType="history" buttonTitle="Histórico" />
        </TouchableOpacity>
      </View>
      <Text style={styles.todayActivityTitle}>Atividades de hoje</Text>
      <HomeHorizontalList data={data} style={styles.horizontalActivityList} />
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();
export default function Home() {
  const { idUser, setIdUser } = useContext(UserContext);

  const [ userData, setUserData ] = useState({});
  var db = firebase.firestore();

  useEffect(() => {
    // Create a reference to the cities collection
    var docRef = db.collection("users").doc(idUser);
    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setUserData(doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  })

  return (
    <Stack.Navigator>
      <Stack.Screen name="SecondHome" component={SecondHome} options={{ headerShown: false }} />
      <Stack.Screen name="NewTask" component={NewTask} options={{ headerShown: false }} />
      <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#e9ebef',
  },
  homeTitle: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#000a4c',
    marginTop: 20,
    marginLeft: 20
  },
  mainButtonsContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
  },
  todayActivityTitle: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#000a4c',
    marginLeft: 20,
    marginBottom: width * 0.05,
  }
});
