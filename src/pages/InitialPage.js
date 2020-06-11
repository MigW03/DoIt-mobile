import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';

export default function InitialPage({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <View style={styles.logo}>
        <Text>Logo</Text>
      </View>
      <View style={styles.chooseView}>
        <Text style={styles.viewTitle}>Já possui conta!</Text>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.touchText}>Entrar</Text>
          <Icon name="right" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.chooseView}>
        <Text style={styles.viewTitle}>Não possui uma conta ainda?</Text>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.touchText}>Criar conta</Text>
          <Icon name="right" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  chooseView: {
    padding: 12,
    margin: 8,
    justifyContent: 'space-around',
    height: '20%',
  },
  viewTitle: {
    fontSize: 18,
    color: '#353535',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  touch: {
    flexDirection: 'row',
    backgroundColor: '#cc6166',
    margin: 4,
    padding: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  logo: {
    height: '50%',
    backgroundColor: '#ddd',
  },
});
