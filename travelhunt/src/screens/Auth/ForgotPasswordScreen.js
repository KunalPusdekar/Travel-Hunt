import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      <TextInput placeholder="Email" style={styles.input} />
      <Button title="Reset Password" onPress={() => {/* Handle reset */}} />
      <Button title="Back to Login" onPress={() => navigation.navigate('LoginScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, marginBottom: 20 },
  input: { width: '80%', padding: 10, marginVertical: 10, borderWidth: 1, borderColor: '#ccc' }
});

export default ForgotPasswordScreen;
