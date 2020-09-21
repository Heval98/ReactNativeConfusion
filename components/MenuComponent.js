import React from "react";
import { DISHES } from '../shared/dishes';
import { FlatList } from 'react-native';
import { Tile, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,    }
}

function Menu(props){

    const dishes = DISHES;

    const renderMenuItem = ({item, index}) => {
        return(
            <Tile
                key={index}
                onPress={() => props.navigation.navigate('Dishdetail', { dishId: item.id })}
                title={item.name}
                featured
                imageSrc={{ uri: baseUrl + item.image }}
                caption={item.description}
            />

        );
    }


    return (
        <FlatList 
            data={props.dishes.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default connect(mapStateToProps)(Menu);