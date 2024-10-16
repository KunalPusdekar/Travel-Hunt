import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Svg, Path } from 'react-native-svg';

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
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#FF9800" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Locations & Users"
          placeholderTextColor="#FF9800"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Levels Section */}
      <View style={styles.levelsContainer}>
        <Text style={styles.sectionTitle}>Your Journey</Text>

        {/* Render Levels Dynamically */}
        {[1, 2, 3, 4].map((level) => (
          <View key={level} style={styles.levelRow}>
            <Animatable.View
              animation="bounceIn"
              delay={level * 100}
              style={[styles.levelButton, unlockedLevel >= level ? styles.unlocked : styles.locked]}
            >
              <TouchableOpacity disabled={unlockedLevel < level} onPress={() => handleLevelUnlock(level + 1, ['Explorer', 'Adventurer', 'Conqueror', 'Legend'][level - 1])}>
                <Text style={styles.levelText}>Level {level}</Text>
              </TouchableOpacity>
            </Animatable.View>

            {/* Curvy Line connecting Levels */}
            {level < 4 && (
              <Svg height="80" width="100" style={styles.line}>
                <Path
                  d={`M10,10 C${level % 2 === 0 ? 50 : 10},50, 90,50, 90,90`}
                  stroke="#FF9800"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                />
              </Svg>
            )}
          </View>
        ))}
      </View>

      {/* Retain Existing Content */}
      <Animatable.View animation="fadeInUp" delay={100} style={styles.section}>
        <Text style={styles.sectionTitle}>Discover Hidden Gems</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.roundedButton}>
            <Image source={require('../../assets/badges/explorer.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundedButton}>
            <Image source={require('../../assets/badges/adventurer.jpg')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Learn</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>

      {/* Badge Popup Modal */}
      <Modal visible={showBadgePopup} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Animatable.View animation="zoomIn" style={styles.modalContent}>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalMessage}>You've unlocked {badgeInfo.badgeName} badge for completing Level {badgeInfo.level - 1}.</Text>
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
    backgroundColor: '#EAF7FE', // Light, soft background similar to Duolingo
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30, // Soft rounded corners for search bar
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Light shadow for subtle depth
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FF9800',
  },
  levelsContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 26,
    color: '#FF9800', // Bright Duolingo-like orange
    fontWeight: 'bold',
    marginBottom: 20,
  },
  levelRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelButton: {
    width: 80,
    height: 80,
    borderRadius: 40, // Round shape
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Soft shadow for button depth
  },
  levelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  unlocked: {
    backgroundColor: '#4CAF50', // Bright green for unlocked
  },
  locked: {
    backgroundColor: '#BDBDBD', // Gray for locked levels
  },
  line: {
    marginBottom: 10,
    width: '100%', // Ensure the line fits the container width
  },
  section: {
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundedButton: {
    width: '48%',
    backgroundColor: '#4CAF50', // Bright green
    borderRadius: 50, // Rounded button like Duolingo
    padding: 15,
    alignItems: 'center',
  },
  buttonImage: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    color: '#FF9800',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  badgeImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});






// below is the previous code, (Ayush has some more code)



// import React, { useState } from 'react';
// import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image, Modal, Button } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import * as Animatable from 'react-native-animatable';
// import { Svg, Path } from 'react-native-svg';

// // Predefined badge images mapping
// const badgeImages = {
//   explorer: require('../../assets/badges/explorer.png'),
//   adventurer: require('../../assets/badges/adventurer.jpg'),
//   conqueror: require('../../assets/badges/conqueror.jpg'),
//   legend: require('../../assets/badges/legend.jpg'),
//   master: require('../../assets/badges/master.jpg'),
//   // Add more badges here if needed
// };

// // Define HomeScreen component
// export default function HomeScreen() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [unlockedLevel, setUnlockedLevel] = useState(1); // Keep track of unlocked levels
//   const [showBadgePopup, setShowBadgePopup] = useState(false); // Modal visibility
//   const [badgeInfo, setBadgeInfo] = useState({ level: 1, badgeName: 'Explorer' }); // Badge information

//   // Function to handle level unlocking
//   const handleLevelUnlock = (level, badgeName) => {
//     if (unlockedLevel >= level) return; // Already unlocked or next level ready
//     if (unlockedLevel + 1 === level) {
//       setUnlockedLevel(level); // Unlock the next level
//       setBadgeInfo({ level, badgeName }); // Set badge info
//       setShowBadgePopup(true); // Show popup when level is unlocked
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="#FFAB40" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search Locations & Users"
//           placeholderTextColor="#FFAB40"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>

//       {/* Levels Section */}
//       <View style={styles.levelsContainer}>
//         <Text style={styles.sectionTitle}>Your Journey</Text>

//         {/* Render Levels Dynamically */}
//         {[1, 2, 3, 4].map((level) => (
//           <View key={level} style={styles.levelRow}>
//             <Animatable.View
//               animation="bounceIn"
//               delay={level * 100}
//               style={[styles.levelButton, unlockedLevel >= level ? styles.unlocked : styles.locked]}
//             >
//               <TouchableOpacity disabled={unlockedLevel < level} onPress={() => handleLevelUnlock(level + 1, ['Explorer', 'Adventurer', 'Conqueror', 'Legend'][level - 1])}>
//                 <Text style={styles.levelText}>Level {level}</Text>
//               </TouchableOpacity>
//             </Animatable.View>

//             {/* Curvy Line connecting Levels */}
//             {level < 4 && (
//   <Svg height="100" width="100" style={styles.line}>
//     <Path
//       d={`M10,10 C${level % 2 === 0 ? 50 : 10},50, 90,50, 90,90`}
//       stroke="#FFAB40"
//       strokeWidth="2"
//       strokeDasharray="5,5"
//       fill="none"
//     />
//   </Svg>
// )}

//           </View>
//         ))}

//       </View>

//       {/* Retain Existing Content */}
//       <Animatable.View animation="fadeInUp" delay={100} style={styles.section}>
//         <Text style={styles.sectionTitle}>Discover Hidden Gems</Text>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.squareButton}>
//             <Image source={require('../../assets/badges/explorer.png')} style={styles.buttonImage} />
//             <Text style={styles.buttonText}>Explore</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.squareButton}>
//             <Image source={require('../../assets/badges/adventurer.jpg')} style={styles.buttonImage} />
//             <Text style={styles.buttonText}>Learn</Text>
//           </TouchableOpacity>
//         </View>
//       </Animatable.View>

//       {/* Cultural Experiences Section */}
//       <Animatable.View animation="fadeInUp" delay={200} style={styles.section}>
//         <Text style={styles.sectionTitle}>Cultural Experiences</Text>
//         <View style={styles.culturalContainer}>
//           {['Music & Art', 'Thrilling', 'Historical', 'Comedy'].map((item, index) => (
//             <TouchableOpacity key={index} style={styles.culturalButton}>
//               <Ionicons name={['musical-notes', 'flash', 'time', 'happy'][index]} size={30} color="#FFAB40" />
//               <Text style={styles.culturalText}>{item}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </Animatable.View>

//       {/* Badge Popup Modal */}
//       <Modal visible={showBadgePopup} transparent={true} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Animatable.View animation="zoomIn" style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Congratulations!</Text>
//             <Text style={styles.modalMessage}>You've unlocked {badgeInfo.badgeName} badge for completing Level {badgeInfo.level -1}.</Text>
//             <Image source={badgeImages[badgeInfo.badgeName.toLowerCase()]} style={styles.badgeImage} />
//             <Button title="Close" onPress={() => setShowBadgePopup(false)} />
//           </Animatable.View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }

// // Define your styles for the screen
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9', // Changed background color for a lighter feel
//     padding: 10,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2e2e2e',
//     borderRadius: 30, // More rounded
//     padding: 10,
//     marginBottom: 20,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     color: '#FFAB40',
//   },
//   levelsContainer: {
//     marginBottom: 30,
//     alignItems: 'center',
//   },
//   sectionTitle: {
//     fontSize: 24,
//     color: '#FFAB40',
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   levelRow: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   levelButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   levelText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   unlocked: {
//     backgroundColor: 'orange',
//   },
//   locked: {
//     backgroundColor: '#666', // Darker for locked levels
//   },
//   line: {
//     marginBottom: 10,
//     width: '100%', // Ensure the line fits the container width
//   },

//   section: {
//     marginBottom: 30,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   squareButton: {
//     width: '48%',
//     backgroundColor: '#FFAB40',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//   },
//   buttonImage: {
//     width: 40,
//     height: 40,
//     marginBottom: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   culturalContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   culturalButton: {
//     alignItems: 'center',
//     backgroundColor: '#333',
//     borderRadius: 10,
//     padding: 10,
//     flex: 1,
//     margin: 5,
//   },
//   culturalText: {
//     color: '#FFAB40',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#2e2e2e',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 20,
//     color: '#FFAB40',
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   modalMessage: {
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   badgeImage: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//   },
// });
