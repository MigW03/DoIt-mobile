import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ToastAndroid,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';

import auth from '@react-native-firebase/auth';

export default function Resgister({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   Keyboard.op
  // }. [])

  function createUser() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Keyboard.dismiss();
        ToastAndroid.show(
          'Novo usuário criado, faça seu login!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        setEmail('');
        setPassword('');
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Esse usuario ja existe');
          setEmail('');
          setPassword('');
        }

        if (error.code === 'auth/invalid-email') {
          alert('Esse email é inválido, tente outro');
          setEmail('');
          setPassword('');
        }
      });
  }

  return (
    <View style={styles.container}>
      <Text>oi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
