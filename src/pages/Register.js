import React, { useState } from 'react';
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
      <View style={styles.textArea}>
        <Text>Logo</Text>
        <Text style={styles.signupText}>Faça o seu</Text>
        <Text style={styles.signupWord}>Cadastro</Text>
      </View>
      <View style={styles.interactionArea}>
        <View style={styles.googleRegister}>
          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleText}>Use sua conta Google</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.registerAlternativeText}>Ou</Text>

        <View style={styles.inputs}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputField}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            placeholder="Senha"
            secureTextEntry
            style={styles.inputField}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.interactionButtons}>
          <TouchableOpacity style={styles.registerButton} onPress={createUser}>
            <Text style={styles.registerButtonText}>Criar conta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.goToLoginButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.goToLoginText}>Já tenho conta</Text>
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
  signupText: {
    fontSize: 26,
    fontWeight: '700',
  },
  signupWord: {
    fontSize: 72,
    fontWeight: 'bold',
  },

  // InteractionArea
  interactionArea: {
    flex: 7,
    justifyContent: 'space-around',
  },

  // InteractionArea - googleRegister
  googleRegister: {
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

  // registerAlternativeText
  registerAlternativeText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
  },

  // Inputs
  inputs: {
    flex: 1,
    padding: 12,
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
  registerButton: {
    backgroundColor: '#0909ff',
    width: '60%',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  goToLoginButton: {},
  goToLoginText: {
    fontSize: 16,
    color: '#545454',
    textDecorationLine: 'underline',
  },
});
