import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  StatusBar,
  ToastAndroid,
} from 'react-native';

import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '95028475262-oqkc3qol9htp1pfufmrdckggimp2h39g.apps.googleusercontent.com',
});

import auth from '@react-native-firebase/auth';
import AuthHeader from '../components/AuthHeader';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  function login() {
    if (email.length > 0 && password.length > 0) {
      setModalOpen(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          Keyboard.dismiss();
          setModalOpen(false);
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            setModalOpen(false);
            Alert.alert(
              'Usuário inválido',
              'Esse usuário não existe, faça o seu cadastro!',
            );
            navigation.navigate('Register');
          }
          if (error.code === 'auth/invalid-email') {
            setModalOpen(false);
            Alert.alert(
              'Email inválido',
              'Esse email é inválido, por favor, tente novamente!',
            );
            setEmail('');
            setPassword('');
          }
          if (error.code === 'auth/wrong-password') {
            setModalOpen(false);
            Alert.alert(
              'Dados incorretos',
              'A senha ou o email estão incorretos, por favor tente novamente',
            );
            setPassword('');
          }

          if (error.code === 'auth/network-request-failed') {
            setModalOpen(false);
            Alert.alert(
              'Sem conexão',
              'Parece que o seu aparelho não está conectado à rede, conecte-se e tente novamente.',
            );
          }
          console.log(error);
        });
    } else {
      Alert.alert(
        'Campos obrigatórios',
        'Você precisa completar os campos acima antes de prosseguir!',
      );
    }
  }

  async function googleLogin() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }

  function forgotPassword() {
    setModalOpen(true);

    if (!email) {
      return (
        setModalOpen(false),
        Alert.alert(
          'Digite o seu email',
          'Para que possa redefinir a sua senha, digite seu email no campo destinado ao email.',
        )
      );
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setModalOpen(false);
        ToastAndroid.show('Email enviado com sucesso', ToastAndroid.LONG);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          return (
            setModalOpen(false),
            Alert.alert(
              'Email inválido',
              'O endereço de email que você digitou é inválido, digite novamente',
            ),
            setEmail('')
          );
        }

        if (error.code === 'auth/user-not-found') {
          return (
            setModalOpen(false),
            Alert.alert(
              'Usuário não cadastrado',
              'Nenhum usuário com esse email foi encontrado, você será encaminhado ara a página de registro',
            ),
            setEmail(''),
            navigation.navigate('Register')
          );
        }

        if (error.code === 'auth/network-request-failed') {
          return (
            setModalOpen(false),
            Alert.alert(
              'Sem conexão',
              'Parece que o seu aparelho não está conectado à rede, conecte-se e tente novamente',
            )
          );
        }

        Alert.alert(
          'Houve um problema',
          'Ocorreu um probelma ao enviar o email, por favor, tente novamente!',
        );
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#c75258ab" />
      <AuthHeader title="Login" />
      <Text style={styles.inputTitles}>Digite seu email:</Text>
      <TextInput
        keyboardType="email-address"
        placeholder="Email"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <Text style={styles.inputTitles}>Digite a senha:</Text>
      <TextInput
        placeholder="Senha"
        autoCapitalize="none"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.touchText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={forgotPassword}>
        <Text style={styles.forgotPasswordText}> Esqueci minha senha! </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.googleButton}
        onPress={() =>
          googleLogin()
            .then(() => console.log('Logado com google'))
            .catch(error => {
              console.log(error);
            })
        }>
        <Icon name="google" color="#FDFDFD" size={22} />
        <Text style={styles.googleText}>Ou use sua conta Google</Text>
      </TouchableOpacity> */}

      <Modal
        visible={modalOpen}
        animationType="fade"
        transparent
        statusBarTranslucent>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
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
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 8,
    elevation: 2,
  },
  inputTitles: {
    fontSize: 20,
    color: '#202020',
    paddingLeft: '10%',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cc6166',
    width: '75%',
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
  forgotPasswordButton: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  forgotPasswordText: {
    fontSize: 15,
    color: '#202020',
    textDecorationLine: 'underline',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#cc0000',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  googleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FDFDFD',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000070',
  },
});
