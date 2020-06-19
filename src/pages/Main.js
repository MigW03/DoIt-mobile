import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  StatusBar,
  Modal,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Switch,
  ToastAndroid,
} from 'react-native';

import MainHeader from '../components/MainHeader';
import AddItemFAB from '../components/AddItemFAB';
import ListItem from '../components/listItem';
import EmptyArray from '../components/EmptyArray';

import Icon from 'react-native-vector-icons/FontAwesome5';
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CloseIcon from 'react-native-vector-icons/MaterialIcons';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Main({ navigation }) {
  let userEmail = auth().currentUser.email;
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [newItemModal, setNewItemModal] = useState(false);
  const [inputData, setInputData] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(userEmail)
      .onSnapshot(data => {
        let retrievedList = data.data().list;
        ordenateList(retrievedList);
      });
  }, []);

  function logout() {
    setUserModalOpen(false);
    auth().signOut();
  }

  function resetPassword() {
    auth()
      .sendPasswordResetEmail(userEmail)
      .then(() => {
        Alert.alert(
          'Email enviado',
          'Um email foi enviado para você redefinir a sua senha.',
        );
        setUserModalOpen(false);
      })
      .catch(() => {
        Alert.alert(
          'Opps!!',
          'Houve um erro para redefinir a sua senha, por favor, tente novamente!',
        );
      });
  }

  async function addItem() {
    if (inputData.length > 0) {
      let list = listData;
      let newItem = {
        title: inputData,
        important: switchValue,
        key: inputData + Math.random().toString(),
      };

      list.unshift(newItem);
      ordenateList(list);
      setNewItemModal(false);
      saveToFirebase(list);
    } else {
      Alert.alert(
        'Digite algo',
        'Você precisa digitar algo antes de prosseguir!!',
      );
    }
  }

  function deleteItem(key) {
    let newList = listData.filter(item => item.key !== key);

    setListData(newList);
    saveToFirebase(newList);

    ToastAndroid.show('Tarefa removida com sucesso!', ToastAndroid.SHORT);
  }

  function ordenateList(arrayToUse) {
    let trueArray = arrayToUse.filter(item => {
      return item.important === true;
    });
    let falseArray = arrayToUse.filter(item => {
      return item.important === false;
    });
    let newArray = trueArray.concat(falseArray);
    setListData(newArray);
  }

  function saveToFirebase(dataToSave) {
    firestore()
      .collection('users')
      .doc(userEmail)
      .update({
        list: dataToSave,
      });
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f1f1f1" barStyle="dark-content" />
      <MainHeader onIconPress={() => setUserModalOpen(true)} />

      <Text
        style={[
          styles.todoCountText,
          {
            display: listData.length > 0 ? 'flex' : 'none',
          },
        ]}>
        Você tem {listData.length} tarefas
      </Text>
      <FlatList
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        data={listData}
        renderItem={({ item, index }) => (
          <ListItem
            title={item.title}
            isImportant={item.important ? 'orange' : '#bfbfbf90'}
            starPress={() => {
              item.important = !item.important;
              setListData([...listData]);
              ordenateList(listData);
              saveToFirebase([...listData]);
            }}
            deletePress={() => deleteItem(item.key)}
          />
        )}
        ListEmptyComponent={() => <EmptyArray />}
        ListFooterComponent={() => <View style={{ height: 100 }} />}
      />

      <AddItemFAB onPress={() => setNewItemModal(true)} />

      <Modal
        visible={userModalOpen}
        animationType="fade"
        transparent
        statusBarTranslucent>
        <View style={styles.userModal}>
          <View style={styles.userModalContent}>
            <View style={styles.modalUserIconView}>
              <Icon name="user" size={50} color="#989898" />
              <Text style={styles.userModalTitle}>Sua conta</Text>
            </View>
            <View style={styles.userDataView}>
              <Text style={styles.emailTitle}>Email:</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>
              <TouchableOpacity
                style={styles.resetPasswordButton}
                onPress={resetPassword}>
                <Text style={styles.resetPasswordText}>Redefinir senha</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <LogoutIcon name="logout" size={28} color="#cc6166" />
                <Text style={styles.logoutText}>Fazer logout</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeUserModalButton}
              onPress={() => setUserModalOpen(false)}>
              <CloseIcon name="close" size={20} color="#f1f1f1" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={newItemModal} animationType="slide" statusBarTranslucent>
        <View style={styles.newToDoModal}>
          <View style={styles.newToDoHeader}>
            <TouchableOpacity
              style={styles.closeNewToDoModalButton}
              onPress={() => {
                setNewItemModal(false);
                setInputData('');
                setSwitchValue(false);
              }}>
              <Text style={styles.closeNewToDoModalText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveNewToDoButton}
              onPress={() => {
                Keyboard.dismiss();
                addItem();
                setInputData('');
                setSwitchValue(false);
              }}>
              <Text style={styles.saveNewToDoText}>Salvar</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Nova tarefa"
            value={inputData}
            onChangeText={text => setInputData(text)}
          />
          <View style={styles.markAsImportantView}>
            <Text style={styles.markAsImportantText}>
              Marcar como importante
            </Text>
            <Switch
              value={switchValue}
              onValueChange={value => setSwitchValue(value)}
              thumbColor="#cc6166"
              trackColor={{ true: '#cc6166af' }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  todoCountText: {
    fontSize: 17,
    fontFamily: 'RobotoMono-Bold',
    color: '#737373',
    alignSelf: 'center',
    marginVertical: 5,
  },
  flatList: {
    flex: 1,
    marginTop: 8,
  },
  userModal: {
    flex: 1,
    backgroundColor: '#23232377',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userModalContent: {
    width: '80%',
    aspectRatio: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
  },
  modalUserIconView: {
    flex: 2,
    padding: 6,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 100,
  },
  userModalTitle: {
    fontSize: 18,
    fontFamily: 'RobotoMono-Bold',
    color: '#989898',
  },
  userDataView: {
    flex: 3,
    padding: 12,
    paddingLeft: 24,
    justifyContent: 'space-between',
  },
  emailTitle: {
    fontSize: 16,
    fontFamily: 'RobotoMono-Bold',
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'RobotoMono-Regular',
    maxWidth: '97%',
  },
  resetPasswordButton: {
    width: '60%',
    padding: 6,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#656565',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetPasswordText: {
    color: '#656565',
    fontSize: 15,
    fontFamily: 'RobotoMono-Regular',
  },
  logoutButton: {
    flexDirection: 'row',
    width: '60%',
    padding: 12,
    paddingLeft: 0,
    margin: 5,
    marginLeft: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  logoutText: {
    color: '#cc6166',
    fontSize: 16,
    fontFamily: 'RobotoMono-Regular',
  },
  closeUserModalButton: {
    position: 'absolute',
    top: 17,
    right: 20,
    padding: 4,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#9a9a9a',
  },
  newToDoModal: {
    marginTop: 30,
  },
  newToDoHeader: {
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  closeNewToDoModalButton: {},
  closeNewToDoModalText: {
    fontSize: 18,
    color: '#cc6166',
    fontFamily: 'RobotoMono-Bold',
  },
  saveNewToDoButton: {
    backgroundColor: '#cc6166',
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 2,
  },
  saveNewToDoText: {
    fontSize: 18,
    fontFamily: 'RobotoMono-Bold',
    color: '#FFF',
  },
  input: {
    width: '85%',
    alignSelf: 'center',
    margin: 6,
    marginBottom: 12,
    paddingLeft: 14,
    borderWidth: 2,
    borderColor: '#999999',
    borderRadius: 14,
    fontSize: 18,
    fontFamily: 'RobotoMono-Regular',
  },
  markAsImportantView: {
    marginTop: 15,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  markAsImportantText: {
    fontSize: 16,
    fontFamily: 'RobotoMono-Bold',
    color: '#686868',
  },
});
