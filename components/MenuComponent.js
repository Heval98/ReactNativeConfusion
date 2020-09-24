import React from "react";
import { DISHES } from '../shared/dishes';
import { FlatList, View } from 'react-native';
import { Tile, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from "./LoadingComponent";
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,    }
}

function Menu(props){

    const dishes = DISHES;

    const renderMenuItem = ({item, index}) => {
        return(
            <Animatable.View animation="fadeInRightBig" duration={2000} >
                <Tile
                    key={index}
                    onPress={() => props.navigation.navigate('Dishdetail', { dishId: item.id })}
                    title={item.name}
                    featured
                    imageSrc={{ uri: baseUrl + item.image }}
                    caption={item.description}
                />
            </Animatable.View>
        );
    }

    if(props.dishes.isLoading){
        return(
            <Loading />
        );
    }else if (props.dishes.errMess){
        return(
            <View>
                <Text>{props.dishes.errMess}</Text>
            </View>
        );
    }else{
        return (
            <FlatList 
                data={props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }  
}

export default connect(mapStateToProps)(Menu);