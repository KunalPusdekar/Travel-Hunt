import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';  // Replace with actual paths to your screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
// import SelfieUploadScreen from './src/screens/SelfieUploadScreen'; // Correct path

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"  // Set the initial route
      screenOptions={{
        headerShown: false,  // Hide the header for all screens
      }}
    >
      {/* Define the screens in the authentication flow */}
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
