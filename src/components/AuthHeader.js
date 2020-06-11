import React from 'react';
import { useNavigation, useLinkProps } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AuthHeader(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => navigation.navigate('InitialPage')}>
        <Icon name="arrow-back" size={28} color="#505050" />
      </TouchableOpacity>
      <Text style={styles.headerName}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    paddingHorizontal: 12,
  },
  touch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerName: {
    marginLeft: 10,
    fontSize: 24,
    color: '#545454',
    fontWeight: 'bold',
  },
});
