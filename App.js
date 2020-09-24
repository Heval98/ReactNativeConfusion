import GlobalStyles from './shared/GlobalStyles';
import React, { useEffect } from 'react';
import { Button, View, Image, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Menu from './components/MenuComponent';
import Dishdetail from './components/DishdetailComponent';
import Reservation from './components/ReservationComponent';
import Favorites from './components/FavoriteComponent';
import Home from './components/HomeComponent';
import Contact from './components/ContactComponent';
import About from './components/AboutComponent';
import { Icon, SocialIcon } from 'react-native-elements';
import { connect, Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator  >
      <Stack.Screen name="Menu" component={Menu} 
        options={({ navigation }) => ({
            headerLeft: (props) => (
            <Icon
              name='menu'
              size={24}
              onPress={() => {
                navigation.toggleDrawer()
              }}
            />
          ),
        })} />
      <Stack.Screen name="Dishdetail" component={Dishdetail} 
        options={({ navigation }) => ({
          headerLeft: (props) => (
          <Icon
            name='menu'
            size={24}
            onPress={() => {
              navigation.toggleDrawer()
            }}
          />
        ),
      })} />
    </Stack.Navigator>
  );
}

const HomeNavigator = createStackNavigator();

function MyHomeStack() {
  return (
    <HomeNavigator.Navigator >
      <HomeNavigator.Screen name="Home" component={Home}
        options={({ navigation }) => ({
          headerLeft: (props) => (
          <Icon
            name='menu'
            size={24}
            onPress={() => {
              navigation.toggleDrawer()
            }}
          />
        ),
      })} />
    </HomeNavigator.Navigator>
  );
}

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never'}} >
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}} > 
              <Image source={require('./components/images/logo.png')} style={styles.drawerImage} />
            </View>
            <View style={{flex: 2}} > 
              <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
            </View>
        </View>
        <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator();

function MyDraw() {
  return(

    <MainNavigator.Navigator initialRouteName="Home" draw drawerContent={(props) => <CustomDrawerContentComponent {...props} />}>
      <MainNavigator.Screen name="Home" component={MyHomeStack} 
        options={{
          drawerIcon: (props) => (
            <Icon
              name='home'
              size={24}
            />
          ),
        }} />
      <MainNavigator.Screen name="About Us" component={About}
      options={{
        drawerIcon: (props) => (
          <Icon
            name='info'
            size={24}
          />
        ),
      }}
      />
      <MainNavigator.Screen name="Menu" component={MyStack} 
      options={{
        drawerIcon: (props) => (
          <Icon
            name='list'
            size={24}
          />
        ),
      }}
      />
      <MainNavigator.Screen name="Contact Us" component={Contact}
      options={{
        drawerIcon: (props) => (
          <Icon
            name='contact-phone'
            size={22}
          />
        ),
      }}
      />
      <MainNavigator.Screen name="Reservation" component={Reservation}
      options={{
        drawerIcon: (props) => (
          <Icon
            name='import-contacts'
            size={24}
          />
        ),
      }}
      />
      <MainNavigator.Screen name="Favorites" component={Favorites}
      options={{
        drawerIcon: (props) => (
          <Icon
            name='favorite'
            size={24}
          />
        ),
      }}
      />
    </MainNavigator.Navigator>

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
})

function App() {

  return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <NavigationContainer>
            <MyDraw />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );

}

export default App;