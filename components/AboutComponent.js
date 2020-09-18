import React, { Component } from 'react';
import { SafeAreaView, Text, FlatList, ScrollView } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

function History(){
    return(
        <SafeAreaView >
            <Card>
            <Card.Title>Our History</Card.Title>
            <Card.Divider />
                <Text style={{margin: 10}}>
                    Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. 
                    With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.
                    Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                </Text>
                <Text style={{margin: 10}}>
                    The restaurant traces its humble beginnings to The Frying Pan,
                    a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                </Text>      
        </Card>
        </SafeAreaView>
    );
}

export default function About({ navigation }) {

    const leaders = LEADERS;

    const renderLeaderItem = ({item, index}) => {
        return(
            <ListItem
                    key={index}
                    hideChevron={true}
                >
                    <Avatar size="large" rounded source={require('./images/alberto.png')} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            
        );
    }


    return (
        <ScrollView style={{marginTop: 25}}>
            <History />
            <Card>
                <Card.Title>Corporate Leadership</Card.Title>
                <Card.Divider />
                    <FlatList 
                        data={leaders}
                        renderItem={renderLeaderItem}
                        keyExtractor={item => item.id.toString()}
                    />
            </Card>
            
        </ScrollView>
    );
}