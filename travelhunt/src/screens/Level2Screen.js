import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

export default function Level2Screen() {
  const navigation = useNavigation(); // Access navigation

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Welcome to Level 1</Text>

      {/* Level 1 Content */}
      <Image
        source={require('../../assets/badges/cultural_master.png')} // Placeholder image for Level 1
        style={styles.levelImage}
      />
      <Text style={styles.description}>
        This is the beginning of your adventure. Explore, learn, and get ready for the next challenge!
      </Text>

      {/* Button to go back to HomeScreen */}
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('HomeScreen')}
        color="#FFAB40"
      />
    </View>
  );
}

// Define your styles for Level 1 screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFAB40',
    marginBottom: 20,
  },
  levelImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
});
