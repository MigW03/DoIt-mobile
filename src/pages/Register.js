import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

export default function Register() {
  return (
    <View style={styles.container}>
      <Text>User register screen</Text>
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
