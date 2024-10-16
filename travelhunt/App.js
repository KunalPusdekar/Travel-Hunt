import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import LandingScreen from './src/screens/LandingScreen';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import SelfieUploadScreen from './src/screens/SelfieUploadScreen'; // Correct path

// Stack and Tab navigators
const Stack = createNativeStackNavigator();
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
          } else if (route.name === 'Leaderboard') {
            iconName = focused ? 'podium' : 'podium-outline';
          }
          return <Ionicons name={iconName} size={30} color={color} />;
        },
        headerRight: ({ navigation }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            accessibilityLabel="Go to Profile"
            accessibilityHint="Navigate to your profile screen"
          >
            <Ionicons name="person-outline" size={30} color="white" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'black',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Tab.Navigator>
  );
}

// Profile stack
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile', headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: 'Edit Profile', headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white' }}
      />
    </Stack.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileStack} />
        <Stack.Screen name="SelfieUploadScreen" component={SelfieUploadScreen} options={{ title: 'Upload Selfie' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
