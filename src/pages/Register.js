import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Modal,
  ActivityIndicator,
  ToastAndroid,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';

import { GoogleSignin } from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '95028475262-oqkc3qol9htp1pfufmrdckggimp2h39g.apps.googleusercontent.com',
});

import auth from '@react-native-firebase/auth';
import AuthHeader from '../components/AuthHeader';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Resgister({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  function createUser() {
    if (email.length > 0 && password.length > 0) {
      Keyboard.dismiss();
      setModalOpen(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore()
            .collection('users')
            .doc(email)
            .set({
              list: [
                {
                  title: 'Bem vindo(a) ao DoIt, aproveite o aplicativo!!',
                  key: 'welcome1234',
                  important: true,
                },
                {
                  title:
                    'Para marcar uma tarefa como Importante, selecione a opção "Marcar como importante" quando criar uma tarefa, ou clique na estrela ao lado, ela ficará laranja para notas importantes!',
                  key: 'startTutorial1234',
                  important: false,
                },
                {
                  title:
                    'Para deletar uma tarefa, clique na lixeira no lado direito!',
                  key: 'deleteTutorial1234',
                  important: false,
                },
              ],
            });
          ToastAndroid.show(
            'Novo usuário criado com sucesso!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          setEmail('');
          setPassword('');
          setModalOpen(false);
        })
        .catch(error => {
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
            return (
              setModalOpen(false),
              Alert.alert(
                'Usuário existente',
                'Um usuário com esse e-mail já existe',
              ),
              setEmail(''),
              setPassword('')
            );
          }

          if (error.code === 'auth/invalid-email') {
            return (
              setModalOpen(false),
              Alert.alert(
                'E-mail inválido',
                'Esse e-mail é inválido, tente outro',
              ),
              setEmail(''),
              setPassword('')
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

          if (error.code === 'auth/weak-password') {
            return (
              setModalOpen(false),
              Alert.alert(
                'Senha fraca',
                'A sua senha deve ter pelo menos 6 caracteres',
              ),
              setPassword('')
            );
          }

          setModalOpen(false);
          Alert.alert(
            'Erro',
            'Houve um problema ao criar a sua conta, por favor tente novamente!',
          );
        });
    } else {
      Alert.alert(
        'Campos obrigatórios',
        'Você precisa completar todos os campos antes de prosseguir!',
      );
    }
  }

  async function createGoogleUser() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#c75258ab" />
      <AuthHeader title="Cadastro" />
      <Text style={styles.inputTitles}>Digite seu e-mail:</Text>
      <TextInput
        keyboardType="email-address"
        placeholder="E-mail"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <Text style={styles.inputTitles}>Crie uma senha:</Text>
      <TextInput
        placeholder="Senha"
        autoCapitalize="none"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={createUser}
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={styles.registerButton} onPress={createUser}>
        <Text style={styles.touchText}>Completar registro</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.googleButton}
        onPress={() =>
          createGoogleUser()
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
          <ActivityIndicator size="large" color="#cc6166" />
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
  registerButton: {
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
    backgroundColor: '#00000085',
  },
});
