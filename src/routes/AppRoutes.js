import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RemaindersList from '../screens/RemindersList';
import AddReminderScreen from '../screens/AddReminderScreen';
const Stack = createStackNavigator();
export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTintColor:'#000'}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RemaindersList" component={RemaindersList} />
        <Stack.Screen name="AddReminderScreen" component={AddReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
