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

export default function Resgister({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <TextInput placeholder="Email" style={styles.inputField} />
          <TextInput placeholder="Senha" style={styles.inputField} />
        </View>
        <View style={styles.interactionButtons}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Login')}>
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
    justifyContent: 'space-between',
    margin: 4,
    padding: 10,
  },
  signupText: {},
  signupWord: {},

  // InteractionArea
  interactionArea: {
    flex: 7,
    justifyContent: 'space-around',
  },

  // InteractionArea - googleRegister
  googleRegister: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {},
  googleText: {},

  // registerAlternativeText
  registerAlternativeText: {
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
  goToLoginText: {},
});
