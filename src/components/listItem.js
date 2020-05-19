import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ListItem() {
  return (
    <View style={styles.container}>
      <Text>Item da lista</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
