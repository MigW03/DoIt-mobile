import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import NewToDo from './pages/NewToDo';
import Login from './pages/Login';
import Register from './pages/Register';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="NewToDo" component={NewToDo} />
    </Stack.Navigator>
  );
}
