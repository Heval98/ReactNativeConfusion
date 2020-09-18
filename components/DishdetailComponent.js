import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

function RenderDish(props) {
    const dish = props.dish;

    if(dish != null){
        return(
            <Card>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Image source={require('./images/uthappizza.png')}></Card.Image>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
            </Card>
        );
    }
    else{
        return (<View></View>);
    }
}

export default function Dishdetail({ route, navigation }) {

    const dishes = DISHES;
    
    const { dishId } = route.params;

        
    //Plus is used to cast string to a number
    return(<RenderDish dish={dishes[+JSON.stringify(dishId)]} />);
}