import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import NewToDo from './pages/NewToDo';
import Login from './pages/Login';
import Register from './pages/Register';
import InitialPage from './pages/InitialPage';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

export default function Routes() {
  const [user, setUser] = useState('');

  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (user) {
    return (
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="NewToDo" component={NewToDo} />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="InitialPage">
        <Stack.Screen
          name="InitialPage"
          component={InitialPage}
          options={{ headerShown: false }}
        />
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
      </Stack.Navigator>
    );
  }
}
