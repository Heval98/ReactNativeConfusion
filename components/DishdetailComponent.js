import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
});

function RenderDish(props) {
    const dish = props.dish;

    if(dish != null){
        return(
            <Card>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Image source={{ uri: baseUrl + dish.image }}></Card.Image>
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

function Dishdetail(props) {

    
    const { dishId } = props.route.params;
    
    markFavorite = (dishId) => {
        props.postFavorite(dishId);
    }
        
    //Plus is used to cast string to a number
    return(
        <ScrollView>
            <RenderDish dish={props.dishes.dishes[+JSON.stringify(dishId)]} 
                //Return a true if exists otherwise return false
                favorite={props.favorites.some(el => el === dishId)}
                onPress={() => markFavorite(dishId)}
            />
            <RenderComments comments={props.comments.comments.filter((comment) => comment.dishId === (dishId))} />
        </ScrollView>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);