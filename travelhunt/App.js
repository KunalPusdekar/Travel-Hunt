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
import SelfieUploadScreen from './src/screens/SelfieUploadScreen';
import Level1Screen from './src/screens/Level1Screen';
import Level2Screen from './src/screens/Level2Screen';
import Level3Screen from './src/screens/Level3Screen';
import Level4Screen from './src/screens/Level4Screen';
import MyTrips from './src/screens/MyTrips';
import SearchPlace from './src/screens/SearchPlace'; // Add the import for SearchPlace
import SelectTraveler from './src/screens/SelectTraveler'; // Make sure this screen is also imported
import SelectDates from './src/screens/SelectDates';  // Make sure this screen is also imported
import { CreateTripProvider } from './context/CreateTripContext'; // Update with your actual path

// Stack and Tab navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tabs
function MainTabs() {
  return (
    
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'HomeScreen') {
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
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}  // Use navigation from the screenOptions function
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
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: 'white',
        },
      })}
    >

      <Tab.Screen name="HomeScreen" component={HomeScreen} />
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
        options={{ 
          title: 'Profile',
          headerShown: false, // Hide the header for the Profile screen
        }}
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
    <CreateTripProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyTrip" component={MyTrips} options={{ title: 'My Trips' }} />

        <Stack.Screen name="SearchPlace" component={SearchPlace} options={{ title: 'Search Place' }} /> 
        <Stack.Screen name="SelectTraveler" component={SelectTraveler} />
        <Stack.Screen name="SelectDates" component={SelectDates}  options={{ title: 'Select Dates' }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileStack} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
        <Stack.Screen name="SelfieUploadScreen" component={SelfieUploadScreen} options={{ title: 'Upload Selfie' }} />
        <Stack.Screen name="Level1Screen" component={Level1Screen} options={{ title: 'Level 1' }} />
        <Stack.Screen name="Level2Screen" component={Level2Screen} options={{ title: 'Level 2' }} />
        <Stack.Screen name="Level3Screen" component={Level3Screen} options={{ title: 'Level 3' }} />
        <Stack.Screen name="Level4Screen" component={Level4Screen} options={{ title: 'Level 4' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </CreateTripProvider>
  );
}