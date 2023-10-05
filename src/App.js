import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import StyledCheck2 from './components/StyledCheck2';
import RNRestart from 'react-native-restart';

import HomeScreen from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';
import ResultScreen from './screens/ResultScreen';
import SecondScreen from './screens/SecondScreen';
import ListScreen from './screens/ListScreen';
import reloadApp from './screens/reloadApp';
import downloadPDF from './screens/downloadPDF';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="FormScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FormScreen"
        component={FormScreen}
        options={({navigation}) => ({
          headerTitle: 'Form',
          headerTitleStyle: {color: 'red'},
          headerStyle: {
            backgroundColor: '#2D2C3C',
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
                style={{marginLeft: 10}}>
                <MaterialIcons name="home" size={25} color="#FB6580" />
              </TouchableOpacity>
            );
          },

          headerRight: () => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="wb-sunny" size={25} color="#FB6580" />
                <StyledCheck2 />
                <Icon
                  name="moon-o"
                  type="font-awesome"
                  color="#FB6580"
                  size={25}
                />
              </View>
            );
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={({navigation}) => ({
          title: 'Formularvorschau',
          headerStyle: {
            backgroundColor: '#2D2C3C',
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={25} color="#FB6580" />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="wb-sunny" size={25} color="#FB6580" />
                <StyledCheck2 />
                <Icon
                  name="moon-o"
                  type="font-awesome"
                  color="#FB6580"
                  size={25}
                />
              </View>
            );
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <Stack.Screen
        name="SecondScreen"
        component={SecondScreen}
        options={({navigation}) => ({
          // title: 'Zweite Seite',
          headerStyle: {
            backgroundColor: '#2D2C3C',
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={25} color="#FB6580" />
              </TouchableOpacity>
            );
          },
          headerTitle: () => {
            return (
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
                onPress={() => RNRestart.Restart()}>
                <Text style={{color: '#ffff'}}>Reload</Text>
                <MaterialIcons name="cached" size={25} color="#FB6580" />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="wb-sunny" size={25} color="#FB6580" />
                <StyledCheck2 />
                <Icon
                  name="moon-o"
                  type="font-awesome"
                  color="#FB6580"
                  size={25}
                />
              </View>
            );
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={({navigation}) => ({
          title: 'PDFs',
          headerStyle: {
            backgroundColor: '#2D2C3C',
          },
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={25} color="#FB6580" />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="wb-sunny" size={25} color="#FB6580" />
                <StyledCheck2 />
                <Icon
                  name="moon-o"
                  type="font-awesome"
                  color="#FB6580"
                  size={25}
                />
              </View>
            );
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
      <Stack.Screen
        name="reloadApp"
        component={reloadApp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="downloadPDF"
        component={downloadPDF}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#2D2C3C',
  },
});

export default App;
