import React, {Component} from 'react';
import { Button, FlatList, StatusBar, View, Text, ListView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView, StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';



// SCREEN 1 ----------------------------------------------------
class MyWelcomeScreen extends Component{
  constructor() {
    super();
    this.state = { number: '917 704 3031'};
  }

  render( ){
  const {navigate} = this.props.navigation; //receives prop from StackNavigator
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
          <View style={{height: 500, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 72, fontWeight: 'bold', color: 'blue'}}>Hi!</Text>
            <Text style={{fontSize: 20, paddingBottom: 40}}>Enter your phone number to sign in</Text>
            <TextInput
                navigate={navigate}
                style={{width: 300, height: 40, fontSize: 20, textAlign: 'center' }}
                value={this.state.number}
                autoFocus={true}
                keyboardType={'numeric'}
                onSubmitEditing={ () => {navigate('Confirm', {number: this.state.number})}}
            />
          </View>
        </View>
        )
  }
}


// SCREEN 2 ----------------------------------------------------
class ConfirmationScreen extends Component{
  constructor() {
    super();
    this.state = { number: '8423',
                    name: 'Jordan'};
  }

  render(){
    const {navigate} = this.props.navigation; //receives prop from StackNavigator
    return(
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
          <View style={{height: 500, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, paddingBottom: 40}}>Please enter the confirmation number we sent to {this.props.navigation.state.params.number}</Text>
            
            <TextInput
                  navigate={navigate}
                  style={{width: 300, height: 40, fontSize: 20, textAlign: 'center' }}
                  value={this.state.number}
                  autoFocus={true}
                  keyboardType={'numeric'}
                  onSubmitEditing={() => navigate('TabNav')}
            />
          </View>
        </View>
      )}}

// TABS 1 ----------------------------------------------------
const MyHomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, backgroundColor: 'white' }}>
    <MapView
      style={{height: 500}}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
    <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
      <Text style={{fontWeight: 'bold', color: 'lightgrey', justifyContent: 'center'}}> Set your current electric bill</Text>
      <View style={{ flexDirection: 'row', marginTop: 20}}>
        <TouchableOpacity
          onPress={() => {}}>
            <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 50}}>-  </Text>
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 50, color: 'black'}}>$120/mo</Text>
        <TouchableOpacity
          onPress={() => {}}>
            <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 50}}>  +</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{marginTop: 20, backgroundColor: 'blue', paddingLeft: 120, paddingRight: 120, paddingTop:10, paddingBottom: 10, borderRadius: 10 }}
        onPress={() => navigation.navigate('ResultsTab')}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Get Bids
          </Text>
      </TouchableOpacity>
    </View>
  </View>
);


// TAB 2 ----------------------------------------------------
class MyResults extends Component {
  constructor() {
    super();
    this.state = {
      results: [{name: 'Your'}, {name: 'Bids'}, {name: 'Will'}, {name: 'Appear'}, {name: 'Here'}, {name: 'As'}, {name: 'They'}, {name: 'Arrive'}, {name: 'Your'}, {name: 'Bids'}, {name: 'Will'}, {name: 'Appear'}, {name: 'Here'}, {name: 'As'}, {name: 'They'}, {name: 'Arrive'}],
    };
  }

  render() {
    return (
      
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          
          <FlatList 
            data={this.state.results}
            renderItem={({item}) => 
                <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: 1,}}>
                  <TouchableOpacity>  
                    <Text style={{fontSize: 30, padding: 10, paddingLeft: 20}}>{item.name}</Text>
                  </TouchableOpacity>
                </View>}
            keyExtractor={(item, index) => index}
          />
          
        </View>
      
    );
  }
}

// TAB NAVIGATOR ----------------------------------------------------
const TabNav = TabNavigator(
  {
    MainTab: {
      screen: MyHomeScreen,
      path: '/',
      navigationOptions: {
        title: 'Welcome',
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    ResultsTab: {
      screen: MyResults,
      path: '/results',
      navigationOptions: {
        title: 'My Results',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom'
  }
);

// STACK NAVIGATOR ----------------------------------------------------
const StacksOverTabs = StackNavigator({
  Root: { screen: MyWelcomeScreen, navigationOptions: { title: 'Welcome!' } },
  Confirm: { screen: ConfirmationScreen },
  TabNav: { screen: TabNav },
});

export default StacksOverTabs;