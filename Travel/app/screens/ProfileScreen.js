import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, TouchableOpacity, Modal, useColorScheme, Share, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';
import ConnectComponent from '../components/ConnectComponent'; // Update with your actual path for the ConnectComponent

const userBadges = [
  { id: '1', title: 'Explorer', icon: require('../../assets/badges/explorer.png') },
  { id: '2', title: 'Cultural Master', icon: require('../../assets/badges/cultural_master.png') },
  { id: '3', title: 'Photographer', icon: require('../../assets/badges/photographer.png') },
];

const userData = {
  username: 'Nomad Sharma',
  countriesVisited: 15,
  profilePhoto: require('../../assets/profile.jpg'),
  experiences: [
    { id: '1', title: 'Hiked the Himalayas', challenge: 'Completed a 7-day trek.', details: 'The trek included stunning views of snow-capped peaks and visits to local villages.' },
    { id: '2', title: 'Cultural Immersion in Japan', challenge: 'Participated in a tea ceremony.', details: 'I learned about the history and significance of tea in Japanese culture.' },
  ],
};

const tileServiceBaseUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

const getTileCoordinates = (northEast, southWest, zoom) => {
  const tiles = [];
  const latMin = southWest.latitude;
  const latMax = northEast.latitude;
  const lonMin = southWest.longitude;
  const lonMax = northEast.longitude;

  const latTileMin = Math.floor((1 - Math.log(Math.tan(latMin * Math.PI / 180) + 1 / Math.cos(latMin * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
  const latTileMax = Math.floor((1 - Math.log(Math.tan(latMax * Math.PI / 180) + 1 / Math.cos(latMax * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
  const lonTileMin = Math.floor((lonMin + 180) / 360 * Math.pow(2, zoom));
  const lonTileMax = Math.floor((lonMax + 180) / 360 * Math.pow(2, zoom));

  for (let x = lonTileMin; x <= lonTileMax; x++) {
    for (let y = latTileMin; y <= latTileMax; y++) {
      tiles.push({ x, y, z: zoom });
    }
  }
  return tiles;
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [badgeModalVisible, setBadgeModalVisible] = useState(false);
  const [experienceModalVisible, setExperienceModalVisible] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [totalTiles, setTotalTiles] = useState(0);
  const [downloadedTiles, setDownloadedTiles] = useState(0);
  const colorScheme = useColorScheme();

  const northEastCoordinates = { latitude: 37.7749, longitude: -122.4194 }; // Example coordinates
  const southWestCoordinates = { latitude: 37.7049, longitude: -122.5094 }; // Example coordinates

  const handleBadgePress = (badge) => {
    setSelectedBadge(badge);
    setBadgeModalVisible(true);
  };

  const handleExperiencePress = (experience) => {
    setSelectedExperience(experience);
    setExperienceModalVisible(true);
  };

  const closeBadgeModal = () => {
    setBadgeModalVisible(false);
    setSelectedBadge(null);
  };

  const closeExperienceModal = () => {
    setExperienceModalVisible(false);
    setSelectedExperience(null);
  };

  const shareProfile = async () => {
    try {
      await Share.share({
        message: `Check out my travel profile! I'm ${userData.username} and have visited ${userData.countriesVisited} countries!`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const shareBadge = async () => {
    if (selectedBadge) {
      try {
        await Share.share({
          message: `I just earned the "${selectedBadge.title}" badge! 🎉 Check out my travel adventures!`,
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const downloadMapTiles = async (northEast, southWest) => {
    const zoomLevel = 10;
    const tiles = getTileCoordinates(northEast, southWest, zoomLevel);
    setTotalTiles(tiles.length);

    const downloadPromises = tiles.map(async ({ x, y, z }) => {
      const url = tileServiceBaseUrl.replace('{z}', z).replace('{x}', x).replace('{y}', y);
      const fileUri = `${FileSystem.documentDirectory}map_tiles/${z}_${x}_${y}.png`;
      try {
        await FileSystem.downloadAsync(url, fileUri);
        console.log(`Downloaded tile: ${fileUri}`);
        setDownloadedTiles((prev) => prev + 1);
      } catch (error) {
        console.error(`Failed to download tile ${x}, ${y}, ${z}:`, error);
      }
    });

    await Promise.all(downloadPromises);
    alert('Map download completed!');
  };

  const handleDownloadMap = () => {
    setTotalTiles(0);
    setDownloadedTiles(0);
    downloadMapTiles(northEastCoordinates, southWestCoordinates);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileBox}>
        <Image source={userData.profilePhoto} style={styles.profileImage} />

        <TouchableOpacity
          style={styles.editIconContainer}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Icon name="edit" size={25} color="#2F4F4F" />
        </TouchableOpacity>

        <View style={styles.profileInfo}>
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.countriesVisited}>
            Countries Visited: {userData.countriesVisited}
          </Text>
          <Button title="Invite Friends" onPress={shareProfile} />
        </View>
      </View>

      <Text style={styles.subTitle}>Badges:</Text>
      <View style={styles.badgesContainer}>
        {userBadges.map((badge) => (
          <TouchableOpacity key={badge.id} onPress={() => handleBadgePress(badge)}>
            <View style={styles.badge}>
              <Image source={badge.icon} style={styles.badgeImage} />
              <Text style={styles.badgeTitle}>{badge.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subTitle}>Your Countries:</Text>
      <View style={styles.countriesContainer}>
        {userData.experiences.map((experience) => (
          <TouchableOpacity key={experience.id} onPress={() => handleExperiencePress(experience)}>
            <View style={styles.experience}>
              <Text style={styles.experienceTitle}>{experience.title}</Text>
              <Text style={styles.experienceChallenge}>{experience.challenge}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Download Map" onPress={handleDownloadMap} />

      <View style={styles.progressContainer}>
        <Text>{`Downloaded ${downloadedTiles} of ${totalTiles} tiles`}</Text>
        <ActivityIndicator size="small" color="#0000ff" animating={downloadedTiles < totalTiles} />
      </View>

      <ConnectComponent />


      <Modal
        animationType="fade"
        transparent={true}
        visible={badgeModalVisible}
        onRequestClose={closeBadgeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedBadge && (
              <>
                <Image source={selectedBadge.icon} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedBadge.title}</Text>
                <TouchableOpacity style={styles.button} onPress={shareBadge}>
                  <Text style={styles.buttonText}>Share Badge</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={closeBadgeModal}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={experienceModalVisible}
        onRequestClose={closeExperienceModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedExperience && (
              <>
                <Text style={styles.modalTitle}>{selectedExperience.title}</Text>
                <Text style={styles.modalChallenge}>{selectedExperience.challenge}</Text>
                <Text style={styles.modalDetails}>{selectedExperience.details}</Text>
                <TouchableOpacity style={styles.button} onPress={closeExperienceModal}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAF9F6',
  },
  profileBox: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  profileImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 5,
    elevation: 5,
  },
  profileInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2F4F4F',
  },
  countriesVisited: {
    fontSize: 16,
    color: '#2F4F4F',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2F4F4F',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  badge: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#F8B400',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    elevation: 1,
  },
  badgeImage: {
    width: 50,
    height: 50,
  },
  badgeTitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#2F4F4F',
  },
  countriesContainer: {
    marginBottom: 20,
  },
  experience: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F4F4F',
  },
  experienceChallenge: {
    fontSize: 14,
    color: '#2F4F4F',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2F4F4F',
  },
  modalChallenge: {
    fontSize: 14,
    color: '#2F4F4F',
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 12,
    color: '#2F4F4F',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2F4F4F',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FAF9F6',
    fontWeight: 'bold',
  },
  progressContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default ProfileScreen;




// Dark Mode
// import React from 'react';
// import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';

// // Badges array with image paths
// const userBadges = [
//   { id: '1', title: 'Explorer', icon: require('../../assets/badges/explorer.png') },
//   { id: '2', title: 'Cultural Master', icon: require('../../assets/badges/cultural_master.png') },
//   { id: '3', title: 'Photographer', icon: require('../../assets/badges/photographer.png') },
// ];

// const userData = {
//   username: 'Nomad Sharma',
//   countriesVisited: 15,
//   profilePhoto: require('../../assets/profile.jpg'), // Replace with the actual profile photo path
//   experiences: [
//     { id: '1', title: 'Hiked the Himalayas', challenge: 'Completed a 7-day trek.' },
//     { id: '2', title: 'Cultural Immersion in Japan', challenge: 'Participated in a tea ceremony.' },
//   ],
// };

// export default function ProfileScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.profileBox}>
//         <Image source={userData.profilePhoto} style={styles.profileImage} />
//         <View style={styles.profileInfo}>
//           <Text style={styles.username}>{userData.username}</Text>
//           <Text style={styles.countriesVisited}>
//             Countries Visited: {userData.countriesVisited}
//           </Text>
//           <Button title="Invite Friends" onPress={() => alert('Invite Friends functionality here')} />
//         </View>
//       </View>

//       <Text style={styles.subTitle}>Badges:</Text>
//       <View style={styles.badgesContainer}>
//         {userBadges.map((badge) => (
//           <View key={badge.id} style={styles.badge}>
//             <Image source={badge.icon} style={styles.badgeImage} />
//             <Text style={styles.badgeTitle}>{badge.title}</Text>
//           </View>
//         ))}
//       </View>

//       <Text style={styles.subTitle}>Your Countries:</Text>
//       <View style={styles.countriesContainer}>
//         {userData.experiences.map((experience) => (
//           <View key={experience.id} style={styles.experience}>
//             <Text style={styles.experienceTitle}>{experience.title}</Text>
//             <Text style={styles.experienceChallenge}>{experience.challenge}</Text>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#121212', // Dark background color
//   },
//   profileBox: {
//     width: '100%',
//     height: 200, // Adjust height as needed
//     borderRadius: 10,
//     marginBottom: 20,
//     elevation: 2,
//     overflow: 'hidden', // Ensure child elements respect border radius
//   },
//   profileImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover', // Cover the entire box
//   },
//   profileInfo: {
//     position: 'absolute', // Positioning text on top of the image
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 10,
//     backgroundColor: 'rgba(18, 18, 18, 0.8)', // Semi-transparent dark background for text
//   },
//   username: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#FFFFFF', // Light text color
//   },
//   countriesVisited: {
//     fontSize: 16,
//     color: '#BBBBBB', // Lighter gray text color
//     marginBottom: 10,
//   },
//   subTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#FFFFFF', // Light text color
//   },
//   badgesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   badge: {
//     alignItems: 'center',
//     marginBottom: 20,
//     width: '30%', // Adjust width for layout
//   },
//   badgeImage: {
//     width: 50,
//     height: 50,
//     marginBottom: 5,
//   },
//   badgeTitle: {
//     fontSize: 16,
//     color: '#BBBBBB', // Light gray text color
//   },
//   countriesContainer: {
//     marginTop: 10,
//   },
//   experience: {
//     backgroundColor: '#1E1E1E', // Darker background for experiences
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   experienceTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFFFFF', // Light text color
//   },
//   experienceChallenge: {
//     fontSize: 14,
//     color: '#BBBBBB', // Light gray text color
//   },
// });
