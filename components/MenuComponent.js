import React from "react";
import { DISHES } from '../shared/dishes';
import { FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

export default function Menu({ navigation }){

    const dishes = DISHES;

    const renderMenuItem = ({item, index}) => {
        return(
            <ListItem
                key={index}
                hideChevron={true}
                onPress={() => navigation.navigate('Dishdetail', { dishId: item.id })}
            >
                <Avatar size="large" rounded source={require('./images/uthappizza.png')} />
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
        />
    );
}
