import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from './src/screens/LandingScreen'; // Correct path
// import HomeScreen from './src/screens/HomeScreen'; // Correct path
// import MapScreen from './src/screens/MapScreen'; // Correct path
// import ProfileScreen from './src/screens/ProfileScreen'; // Correct path
// import ChallengesScreen from './src/screens/ChallengesScreen'; // Correct path
// import EditProfileScreen from './src/screens/EditProfileScreen'; // Correct path for the edit profile screen
import { Ionicons } from '@expo/vector-icons';
import ErrorBoundary from './src/components/ErrorBoundary';

// Stack navigator for screens
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tabs
function MainTabs() {
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
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={30} color={color} />; // Icon size set to 30
        },
      })}
      tabBarOptions={{
        activeTintColor: '#56CCF2', // Customize active icon color
        inactiveTintColor: 'gray', // Customize inactive icon color
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// Profile stack to include Profile and EditProfile screens
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Initial screen (Landing Screen) */}
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        
        {/* Main Tabs: Home, Map, Challenges, Profile */}
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
