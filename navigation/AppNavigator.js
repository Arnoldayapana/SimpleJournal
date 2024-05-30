import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CreateEntryScreen from '../screens/CreateEntryScreen';
import ViewEntryScreen from '../screens/ViewEntryScreen';
import EditEntryScreen from '../screens/EditEntryScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateEntry" component={CreateEntryScreen} />
        <Stack.Screen name="ViewEntry" component={ViewEntryScreen} />
        <Stack.Screen name="EditEntry" component={EditEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
