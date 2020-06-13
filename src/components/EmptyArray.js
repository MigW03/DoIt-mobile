import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EmptyArray() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Você não tem tarefas!!</Text>
      <Text style={styles.addInstructions}>
        Para criar uma nova, clique no botão "+" abaixo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    color: '#606060',
    textAlign: 'center',
    maxWidth: '90%',
    fontFamily: 'RobotoMono-Bold',
    marginVertical: 50,
  },
  addInstructions: {
    fontSize: 16,
    color: '#656565',
    textAlign: 'center',
    fontFamily: 'RobotoMono-Regular',
    maxWidth: '85%',
  },
});
