import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  StatusBar,
} from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            keyboardType="visible-password"
            secureTextEntry
            style={styles.inputField}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.interactionButtons}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.goToRegisterButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.goToRegisterText}>Não tenho conta</Text>
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
    justifyContent: 'space-between',
    margin: 4,
    padding: 10,
  },
  doLoginText: {},
  loginWord: {},

  // InteractionArea
  interactionArea: {
    flex: 7,
    justifyContent: 'space-around',
  },

  // InteractionArea - googleLogin
  googleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {},
  googleText: {},

  // loginAlternativeText
  loginAlternativeText: {
    textAlign: 'center',
  },

  // Inputs
  inputs: {
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
  goToRegisterText: {},
});
