import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Svg, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Predefined badge images mapping
const badgeImages = {
  explorer: require('../../assets/badges/explorer.png'),
  adventurer: require('../../assets/badges/adventurer.jpg'),
  conqueror: require('../../assets/badges/conqueror.jpg'),
  legend: require('../../assets/badges/legend.jpg'),
  master: require('../../assets/badges/master.jpg'),
  // Add more badges here if needed
};

// Define HomeScreen component
export default function HomeScreen() {
  const navigation = useNavigation(); // Initialize navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [unlockedLevel, setUnlockedLevel] = useState(1); // Keep track of unlocked levels
  const [showBadgePopup, setShowBadgePopup] = useState(false); // Modal visibility
  const [badgeInfo, setBadgeInfo] = useState({ level: 1, badgeName: 'Explorer' }); // Badge information

  // Function to handle level unlocking
  const handleLevelUnlock = (level, badgeName) => {
    if (unlockedLevel >= level) return; // Already unlocked or next level ready
    if (unlockedLevel + 1 === level) {
      setUnlockedLevel(level); // Unlock the next level
      setBadgeInfo({ level, badgeName }); // Set badge info
      setShowBadgePopup(true); // Show popup when level is unlocked

      // Navigate to Quiz page if Level 3 is unlocked
      if (level === 3) {
        navigation.navigate('Quiz'); // Replace 'Quiz' with the name of your quiz screen
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#FFAB40" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Locations & Users"
          placeholderTextColor="#FFAB40"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Levels Section */}
      <View style={styles.levelsContainer}>
        <Text style={styles.sectionTitle}>Your Journey</Text>

        {/* First Level */}
        <View style={styles.levelRow}>
          <Animatable.View
            animation="bounceIn"
            delay={100}
            style={[styles.levelButton, unlockedLevel >= 1 ? styles.unlocked : styles.locked]}
          >
            <TouchableOpacity disabled={unlockedLevel < 1} onPress={() => handleLevelUnlock(2, 'Explorer')}>
              <Text style={styles.levelText}>Level 1</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>

        {/* Curvy Line connecting Level 1 to Level 2 */}
        <Svg height="100" width="100" style={styles.line}>
          <Path d="M50,0 C50,50 100,50 100,100" stroke="#FFAB40" strokeWidth="2" strokeDasharray="5,5" fill="none" />
        </Svg>

        {/* Second Level */}
        <View style={styles.levelRow}>
          <Animatable.View
            animation="bounceIn"
            delay={200}
            style={[styles.levelButton, unlockedLevel >= 2 ? styles.unlocked : styles.locked]}
          >
            <TouchableOpacity disabled={unlockedLevel < 2} onPress={() => handleLevelUnlock(3, 'Adventurer')}>
              <Text style={styles.levelText}>Level 2</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>

        {/* Curvy Line connecting Level 2 to Level 3 */}
        <Svg height="100" width="100" style={styles.line}>
          <Path d="M0,0 C0,50 50,50 50,100" stroke="#FFAB40" strokeWidth="2" strokeDasharray="5,5" fill="none" />
        </Svg>

        {/* Third Level */}
        <View style={styles.levelRow}>
          <Animatable.View
            animation="bounceIn"
            delay={300}
            style={[styles.levelButton, unlockedLevel >= 3 ? styles.unlocked : styles.locked]}
          >
            <TouchableOpacity disabled={unlockedLevel < 3} onPress={() => handleLevelUnlock(4, 'Conqueror')}>
              <Text style={styles.levelText}>Level 3</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>

        {/* Curvy Line connecting Level 3 to Level 4 */}
        <Svg height="100" width="100" style={styles.line}>
          <Path d="M50,0 C50,50 100,50 100,100" stroke="#FFAB40" strokeWidth="2" strokeDasharray="5,5" fill="none" />
        </Svg>

        {/* Fourth Level */}
        <View style={styles.levelRow}>
          <Animatable.View
            animation="bounceIn"
            delay={400}
            style={[styles.levelButton, unlockedLevel >= 4 ? styles.unlocked : styles.locked]}
          >
            <TouchableOpacity disabled={unlockedLevel < 4} onPress={() => handleLevelUnlock(5, 'Legend')}>
              <Text style={styles.levelText}>Level 4</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>

        {/* Add more levels similarly */}

      </View>

      {/* Retain Existing Content */}
      <Animatable.View animation="fadeInUp" delay={100} style={styles.section}>
        <Text style={styles.sectionTitle}>Discover Hidden Gems</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.squareButton}>
            <Image source={require('../../assets/badges/explorer.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.squareButton}>
            <Image source={require('../../assets/badges/adventurer.jpg')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Learn</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>

      {/* Cultural Experiences Section */}
      <Animatable.View animation="fadeInUp" delay={200} style={styles.section}>
        <Text style={styles.sectionTitle}>Cultural Experiences</Text>
        <View style={styles.culturalContainer}>
          <TouchableOpacity style={styles.culturalButton}>
            <Ionicons name="musical-notes" size={30} color="#FFAB40" />
            <Text style={styles.culturalText}>Music & Art</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.culturalButton}>
            <Ionicons name="flash" size={30} color="#FFAB40" />
            <Text style={styles.culturalText}>Thrilling</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.culturalButton}>
            <Ionicons name="time" size={30} color="#FFAB40" />
            <Text style={styles.culturalText}>Historical</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.culturalButton}>
            <Ionicons name="happy" size={30} color="#FFAB40" />
            <Text style={styles.culturalText}>Comedy</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>

      {/* Badge Popup Modal */}
      <Modal visible={showBadgePopup} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Animatable.View animation="zoomIn" style={styles.modalContent}>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalMessage}>You've unlocked {badgeInfo.badgeName} badge for completing Level {badgeInfo.level}.</Text>
            <Image source={badgeImages[badgeInfo.badgeName.toLowerCase()]} style={styles.badgeImage} />
            <Button title="Close" onPress={() => setShowBadgePopup(false)} />
          </Animatable.View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// Define your styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 5,
    marginBottom: 20,
    padding: 5,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    color: '#FFAB40',
  },
  levelsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#FFAB40',
    marginBottom: 10,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  levelButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  unlocked: {
    backgroundColor: '#FFAB40',
  },
  locked: {
    backgroundColor: '#333',
  },
  levelText: {
    color: '#fff',
    fontSize: 18,
  },
  line: {
    alignSelf: 'center',
  },
  section: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  squareButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 5,
  },
  buttonImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  buttonText: {
    color: '#FFAB40',
    textAlign: 'center',
  },
  culturalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  culturalButton: {
    alignItems: 'center',
    margin: 10,
  },
  culturalText: {
    color: '#FFAB40',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  badgeImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
