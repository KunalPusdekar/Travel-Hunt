import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen'; // Ensure you have this screen
import SignupScreen from '../screens/Auth/SignupScreen'; // Ensure you have this screen

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Login' }} 
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{ title: 'Sign Up' }} 
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;

const styles = StyleSheet.create({});
