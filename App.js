import GlobalStyles from './shared/GlobalStyles';
import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from './components/MenuComponent';
import Dishdetail from './components/DishdetailComponent';
import Home from './components/HomeComponent';
import Contact from './components/ContactComponent';
import About from './components/AboutComponent';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Dishdetail" component={Dishdetail} />
    </Stack.Navigator>
  );
}

const HomeNavigator = createStackNavigator();

function MyHomeStack() {
  return (
    <HomeNavigator.Navigator>
      <HomeNavigator.Screen name="Home" component={Home} />
    </HomeNavigator.Navigator>
  );
}

const MainNavigator = createDrawerNavigator();

function MyDraw() {
  return(

    <MainNavigator.Navigator initialRouteName="Home">
      <MainNavigator.Screen name="Home" component={MyHomeStack} />
      <MainNavigator.Screen name="About Us" component={About} />
      <MainNavigator.Screen name="Menu" component={MyStack} />
      <MainNavigator.Screen name="Contact Us" component={Contact} />
    </MainNavigator.Navigator>

);
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDraw />
    </NavigationContainer>
  );
}

