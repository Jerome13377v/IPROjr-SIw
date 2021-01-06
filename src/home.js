import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeHorizontalList from './home-horizontal-list/homeHorizontalList'

const Tab = createBottomTabNavigator();

export default function Home() {
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
        <HomeHorizontalList data={data} style={styles.horizontalActivityList} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    backgroundColor: '#e9ebef',
  },
  homeTitle:{
    fontWeight:'bold',
    fontSize:32,
    color:'#000a4c',
    marginTop: 20,
    marginLeft:20
  },
  horizontalActivityList: {

  }
});
