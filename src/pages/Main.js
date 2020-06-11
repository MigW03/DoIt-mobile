import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Modal,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import auth from '@react-native-firebase/auth';

export default function Main({ navigation }) {
  let user = auth().currentUser.email;
  const [listData, setListData] = useState([
    { title: 'oi', key: '0' },
    { title: 'cm vai', key: '1' },
    { title: 'tcau', key: '2' },
  ]);

  function logout() {
    auth()
      .signOut()
      .then(console.log('Desconectado'));
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <Text>Main screen</Text>
      <Text>{user}</Text>
      <TouchableOpacity onPress={logout}>
        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Desconectar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
