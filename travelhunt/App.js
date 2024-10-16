import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'; // For Profile button
import LandingScreen from './src/screens/LandingScreen'; // Correct path
import HomeScreen from './src/screens/HomeScreen'; // Correct path
import MapScreen from './src/screens/MapScreen'; // Correct path
import ChallengesScreen from './src/screens/ChallengesScreen'; // Correct path
import ProfileScreen from './src/screens/ProfileScreen'; // Correct path
import EditProfileScreen from './src/screens/EditProfileScreen'; // Correct path
import LeaderboardScreen from './src/screens/LeaderboardScreen'; // Correct path

// Stack and Tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tabs (without Profile, but added Leaderboard)
function MainTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Challenges') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Leaderboard') {
            iconName = focused ? 'podium' : 'podium-outline';
          }
          return <Ionicons name={iconName} size={30} color={color} />; // Icon size set to 30
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={30} color="white" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: 'black', // Set top header background color to black
        },
        headerTintColor: 'white', // Set back button color to white
        tabBarShowLabel: false, // Remove text labels from the bottom tab
        tabBarStyle: {
          backgroundColor: 'black', // Set bottom tab background color to black
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white', // Set active icon color to white
        inactiveTintColor: 'gray', // Set inactive icon color to gray
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Tab.Navigator>
  );
}

// Profile stack (includes Profile and Edit Profile screens)
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile', headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Initial screen (Landing Screen) */}
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        
        {/* Main Tabs: Home, Map, Challenges, Leaderboard */}
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        
        {/* Profile Stack: Profile and EditProfile screens */}
        <Stack.Screen name="Profile" component={ProfileStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
