import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  StatusBar,
} from 'react-native';

import auth from '@react-native-firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Keyboard.dismiss();
        alert(`Login com: \nEmail: ${email}\nSenha: ${password}`);
        navigation.navigate('Main', { user: email, password });
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'Usuário inválido',
            'Esse usuário não existe, faça o seu cadastro!',
          );
          navigation.navigate('Register');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert(
            'Email inválido',
            'Esse email é inválido, por favor, tente novamente!',
          );
        }
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
        <Text>Logo</Text>
        <Text style={styles.doLoginText}>Faça o seu</Text>
        <Text style={styles.loginWord}>Login</Text>
      </View>
      <View style={styles.interactionArea}>
        <View style={styles.googleLogin}>
          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleText}>Use sua conta Google</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.loginAlternativeText}>Ou</Text>

        <View style={styles.inputs}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.inputField}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            placeholder="Senha"
            secureTextEntry={true}
            style={styles.inputField}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.interactionButtons}>
          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.goToRegisterButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.goToRegisterText}>Não tenho conta!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Texts
  textArea: {
    flex: 3,
    justifyContent: 'flex-end',
    margin: 4,
    padding: 10,
  },
  doLoginText: {
    fontSize: 26,
    fontWeight: '700',
  },
  loginWord: {
    fontSize: 72,
    fontWeight: 'bold',
  },

  // InteractionArea
  interactionArea: {
    flex: 7,
    justifyContent: 'space-around',
  },

  // InteractionArea - googleLogin
  googleLogin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: '#cc2727',
    width: '65%',
    padding: 8,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },

  // loginAlternativeText
  loginAlternativeText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
  },

  // Inputs
  inputs: {
    padding: 12,
    flex: 1,
  },
  inputField: {
    borderWidth: 2,
    borderColor: '#757575',
    borderRadius: 12,
    margin: 6,
    width: '80%',
    alignSelf: 'center',
    padding: 4,
    paddingLeft: 12,
    fontSize: 22,
  },

  // InteractionButtons (Login/dont have account)
  interactionButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loginButton: {
    backgroundColor: '#0909ff',
    width: '60%',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  goToRegisterButton: {},
  goToRegisterText: {
    fontSize: 16,
    color: '#545454',
    textDecorationLine: 'underline',
  },
});
