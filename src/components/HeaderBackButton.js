import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function HeaderBackButton(props, { navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <Icon name="back" size={28} color="#202020" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
});
