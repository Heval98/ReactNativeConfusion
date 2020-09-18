import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }
    
    static navigationOptions = {
        title: 'Menu'
    };

    
    render(){
        const renderMenuItem = ({item, index}) => {
            return(
                <ListItem
                    key={index}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    //Avatar={{ source: require('./images/uthappizza.png') }}
                >
                    <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        }

        // const { navigate } = this.props.navigation.navigate;

        return (
            <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}


export default Menu;