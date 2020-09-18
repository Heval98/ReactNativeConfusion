import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

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
                    <Icon raised reverse name={ props.favorite ? 'favorite' : 'favorite-border' } color='#f50' onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
            </Card>
        );
    }
    else{
        return (<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}} >
                <Text style={{fontSize: 14}}>
                    {item.comment}
                </Text>
                <Text style={{fontSize: 12}} >
                    {item.raiting} Stars
                </Text>
                <Text style={{fontSize: 12}}>
                    {'-- ' + item.author + ', ' + item.date}
                </Text>
            </View>
        );
    }

    return(
        <Card>
            <Card.Title>Comments</Card.Title>
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
        </Card>
    );
}

export default function Dishdetail({ route, navigation }) {

    const dishes = DISHES;
    const comments = COMMENTS;
    const [favorites, setFavorites] = useState([]);

    
    const { dishId } = route.params;
    
    markFavorite = (dishId) => {
        setFavorites(favorites.concat(parseInt(dishId).toString()));
    }
        
    //Plus is used to cast string to a number
    return(
        <ScrollView>
            <RenderDish dish={dishes[+JSON.stringify(dishId)]} 
                //Return a true if exists otherwise return false
                favorite={favorites.some(el => el === parseInt(dishId).toString())}
                onPress={() => markFavorite(dishId)}
            />
            <RenderComments comments={comments.filter((comment) => comment.dishId === (dishId))} />
        </ScrollView>
    );
}