import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function AddItemFAB(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touch} onPress={props.onPress}>
        <Icon name="plus" size={30} color="#FDFDFD" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: 65,
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  touch: {
    flex: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cc6166',
    elevation: 5,
  },
});
