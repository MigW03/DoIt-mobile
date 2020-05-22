import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

export default function Main({ route }) {
  const { user } = route.params;
  const { password } = route.params;
  const [listData, setListData] = useState([
    { title: 'oi', key: '0' },
    { title: 'cm vai', key: '1' },
    { title: 'tcau', key: '2' },
  ]);

  return (
    <View style={styles.container}>
      <Text>Main screen</Text>
      <Text>{user}</Text>
      <Text>{password}</Text>
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
