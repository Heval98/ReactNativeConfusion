import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// const MenuNavigator = createStackNavigator({
//     Menu: { screen: Menu },
//     Dishdetail: { screen: Dishdetail}
// }, {
//     initialRouteName: 'Menu',
//     navigationOptions: {
//         headerStyle: {
//             backgroundColor: '#512DA8'
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//             color: '#fff'
//         }
//     }
// });

// const Stack = createStackNavigator();

// function MyStack() {
//     return (
//         <Stack.Navigator initialRouteName='Menu'
//             screenOptions={{
//                             headerStyle: {
//                                 backgroundColor: "#512DA8"
//                             },
//                             headerTintColor: "#fff",
//                             headerTitleStyle: {
//                                 color: "#fff"            
//                             }
//                         }}
//         >
//           <Stack.Screen name="Menu" component={Menu} />
//           <Stack.Screen name="Dishdetail" component={Dishdetail} options={{ headerTitle: "Dish Detail"}} />
//         </Stack.Navigator> 
//       );
// }

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({ navigation }) {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

class Main extends Component {

    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                {/* <NavigationContainer>
                    <MenuNavigatorScreen />
                </NavigationContainer> */}
                <Menu />
            </View>
        );
    }
}

export default Main;
