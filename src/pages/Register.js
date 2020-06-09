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

  function createUser() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Keyboard.dismiss();
        ToastAndroid.show(
          'Novo usuário criado, faça seu login!',
          ToastAndroid.LONG,
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

        if (error.code === 'auth/network-request-failed') {
          Alert.alert(
            'Sem conexão',
            'Parece que o seu aparelho não está conectado à rede, conecte-se e tente novamente',
          );
        }
      });
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#c75258ab" />
      <Text style={styles.inputTitles}>Digite seu email:</Text>
      <TextInput
        keyboardType="email-address"
        placeholder="Email"
        autoCapitalize="none"
        style={styles.input}
        autoFocus
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <Text style={styles.inputTitles}>Crie uma senha:</Text>
      <TextInput
        placeholder="Senha"
        autoCapitalize="none"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={styles.registerButton} onPress={createUser}>
        <Text style={styles.touchText}>Completar registro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cc616655',
  },
  input: {
    backgroundColor: '#FFF',
    width: '80%',
    textAlignVertical: 'center',
    padding: 4,
    paddingVertical: 6,
    paddingLeft: 12,
    fontSize: 18,
    // borderWidth: 2,
    // borderColor: '#505050',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 8,
    elevation: 2,
  },
  inputTitles: {
    fontSize: 20,
    color: '#202020',
    marginTop: 14,
    paddingLeft: '10%',
  },
  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cc6166',
    width: '70%',
    alignSelf: 'center',
    borderRadius: 14,
    marginTop: 18,
    elevation: 3,
  },
  touchText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    paddingVertical: 10,
  },
});
