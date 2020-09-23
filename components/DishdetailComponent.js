import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postComment, postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)) 
});

function RenderDish(props) {
    
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');

    const resetForm = () => {
        setRating(0);
        setAuthor('');
        setComment('');
    }


    const handleComments = (dishId, rating, author, comment) => {
        props.postComment(dishId, rating, author, comment);
    }

    const styles = StyleSheet.create({
        formRow: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row',
            margin: 20,
        },
        formLabel: {
            fontSize: 18,
            flex: 2,
        },
        formItem: {
            flex: 1
        },
        modal: {
            justifyContent: 'center',
            margin: 20
        },
        modalTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            backgroundColor: '#512DA8',
            textAlign: 'center',
            color: 'white',
            marginBottom: 20
        },
        modalText: {
            fontSize: 18,
            margin: 10
        }
    })

    const dish = props.dish;

    if(dish != null){
        return(
            <View>
                <Card>
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Image source={{ uri: baseUrl + dish.image }}></Card.Image>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                            <Icon raised reverse name={ props.favorite ? 'favorite' : 'favorite-border' } color='#f50' onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
                            <Icon raised reverse name='edit' color='#1A1CE3' onPress={() => setShowModal(!showModal)} />
                        </View>
                </Card>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={showModal}
                    onDismiss={() => {setShowModal(!showModal);; resetForm()}}
                    onRequestClose={() => {setShowModal(!showModal);; resetForm()}}
                >
                    <View style={styles.modal}>
                        <Rating
                            ratingCount={5}
                            imageSize={50}
                            showRating
                            startingValue={rating}
                            onFinishRating={(rating) => setRating(+rating)}
                        />
                        <Input
                            style={{ marginTop: 20 }}
                            placeholder='Author'
                            onChangeText={value => setAuthor(value)}
                            leftIcon={
                                <Icon
                                style={{ marginTop: 20 }}
                                name='person'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input
                            placeholder='Comment'
                            onChangeText={value => setComment(value)}
                            leftIcon={
                                <Icon
                                name='comment'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Button
                            onPress={() => {setShowModal(!showModal); handleComments(dish.id, rating, author, comment); resetForm();}}
                            color='#512DA8'
                            title='SUBMIT'
                        />
                        <View style={{ marginTop: 10 }} >
                            <Button
                                onPress={() => {setShowModal(!showModal); resetForm()}}
                                color='#95A5A6'
                                title='CANCEL'
                            />
                        </View>
                    </View>
                </Modal>
            </View>
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
                <View style={{ alignItems: 'flex-start'}}>
                    <Rating imageSize={12} readonly startingValue={(item.rating)} style={{ margin: 10 }} />
                </View>
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
                postComment={props.postComment}
                favorite={props.favorites.some(el => el === dishId)}
                onPress={() => markFavorite(dishId)}
            />
            <RenderComments comments={props.comments.comments.filter((comment) => comment.dishId === (dishId))} />
        </ScrollView>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);