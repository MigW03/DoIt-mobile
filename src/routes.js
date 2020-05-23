import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import NewToDo from './pages/NewToDo';
import Login from './pages/Login';
import Register from './pages/Register';
import InitialPage from './pages/InitialPage';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="InitialPage">
      <Stack.Screen
        name="InitialPage"
        component={InitialPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="NewToDo" component={NewToDo} />
    </Stack.Navigator>
  );
}
