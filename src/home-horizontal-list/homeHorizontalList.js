import React from 'react';
import { FlatList, Dimensions } from 'react-native';
import HomeActivityCard from './home-activity-card/homeActivityCard';

const { width } = Dimensions.get('window')
export default function HomeHorizontalList(props) {
    return (
        <FlatList 
            data={props.data}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            snapToAlignment={'start'}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToOffsets={[...Array(props.data.length)].map((x,i) => i * (width * 0.8 - 40 ) + ((i-1)*40)) }
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <HomeActivityCard title={item.title} observation={item.observation} time={item.time}/>}
        />
    );
}
  
