import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function MainHeader(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>DoIt</Text>
      <TouchableOpacity style={styles.touch} onPress={props.onPress}>
        <Icon name="user" size={28} color="#cc6166" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#cc6166',
  },
  touch: {
    // backgroundColor: '#cc6166',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    aspectRatio: 1,
    borderRadius: 90,
  },
});
