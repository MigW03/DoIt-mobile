import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function AddItemFAB() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touch}>
        <Icon name="plus" size={30} color="#FDFDFD" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 67,
    width: 67,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  touch: {
    flex: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    elevation: 5,
  },
});
