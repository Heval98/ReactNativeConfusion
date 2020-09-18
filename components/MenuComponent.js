import React, { useState } from "react";
import { DISHES } from '../shared/dishes';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function Menu({ navigation }){

    const [selectedId, setSelectedId] = useState(null);

    const dishes = DISHES;

    const renderMenuItem = ({item, index}) => {
        return(
            <ListItem
                key={index}
                hideChevron={true}
                onPress={() => navigation.navigate('Dishdetail', { dishId: item.id })}
                //Avatar={{ source: require('./images/uthappizza.png') }}
            >
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }


    return (
        <FlatList 
            data={dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            extraData={selectedId}
        />
    );
}
