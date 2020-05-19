import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function NewToDo() {
  return (
    <View>
      <Text>NewToDo Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
