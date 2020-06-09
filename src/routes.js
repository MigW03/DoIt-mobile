import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import NewToDo from './pages/NewToDo';
import Login from './pages/Login';
import Register from './pages/Register';
import InitialPage from './pages/InitialPage';

import HeaderBackButton from './components/HeaderBackButton';

const Stack = createStackNavigator();

export default function Routes({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="InitialPage">
      <Stack.Screen
        name="InitialPage"
        component={InitialPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Cadastro',
          headerStyle: {
            backgroundColor: '#cc616655',
            elevation: 0,
          },
          headerTintColor: '#202020',
        }}
      />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="NewToDo" component={NewToDo} />
    </Stack.Navigator>
  );
}
