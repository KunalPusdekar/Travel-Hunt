import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Video } from 'expo-av';  // Import Expo's Video component

export default function MapScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Define locations around Varanasi
  const locations = [
    {
      id: 1,
      title: 'Kashi Vishwanath Temple',
      description: 'One of the most famous Hindu temples dedicated to Lord Shiva.',
      latitude: 25.3109,
      longitude: 83.0076,
      videoSource: require('../../assets/videos/newvaranasi_Zw4dBNNs.mp4'),
      localName: 'Pandit Ramesh Tiwari',
      mobileNumber: '+91 9876543210'
    },
    {
      id: 2,
      title: 'Sarnath',
      description: 'An important Buddhist site where Gautama Buddha gave his first sermon.',
      latitude: 25.3763,
      longitude: 83.0220,
      videoSource: require('../../assets/videos/newvaranasi_Zw4dBNNs.mp4'),
      localName: 'Mr. Suresh Kumar',
      mobileNumber: '+91 9123456789'
    },
    {
      id: 3,
      title: 'Dasaswamedh Ghat',
      description: 'One of the main ghats on the Ganges River, famous for its Ganga Aarti.',
      latitude: 25.3076,
      longitude: 83.0104,
      videoSource: require('../../assets/videos/newvaranasi_Zw4dBNNs.mp4'),
      localName: 'Mr. Ravi Gupta',
      mobileNumber: '+91 9988776655'
    },
  ];

  const initialRegion = {
    latitude: 25.3176,  // Latitude of Varanasi
    longitude: 82.9739,  // Longitude of Varanasi
    latitudeDelta: 0.1,
    longitudeDelta: 0.05,
  };

  // Function to handle marker press
  const onMarkerPress = (location) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView style={styles.map} initialRegion={initialRegion}>
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            onPress={() => onMarkerPress(location)}
          />
        ))}
      </MapView>

      {/* Bottom Box for Attraction Details */}
      <View style={styles.detailsContainer}>
        {selectedLocation ? (
          <>
            <Text style={styles.title}>{selectedLocation.title}</Text>
            <Text style={styles.description}>{selectedLocation.description}</Text>

            {/* Display Local Name and Mobile Number */}
            <Text style={styles.localInfo}>Local Contact: {selectedLocation.localName}</Text>
            <Text style={styles.localInfo}>Mobile: {selectedLocation.mobileNumber}</Text>

            {/* Badge Images */}
            <View style={styles.badgesContainer}>
              <Text style={styles.badge}>🏅</Text>
              <Text style={styles.badge}>🏅</Text>
              <Text style={styles.badge}>🏅</Text>
            </View>

            {/* Start Quest Button */}
            <TouchableOpacity style={styles.startQuestButton}>
              <Text style={styles.buttonText}>Start Quest</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.placeholderText}>Tap on a marker to view details</Text>
        )}
      </View>

      {/* Modal for Pop-up Video */}
      {selectedLocation && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Video
                source={selectedLocation.videoSource}
                style={styles.modalVideo}
                useNativeControls  // This will add play, pause, etc.
                resizeMode="cover"  // Adjust video size to cover
                isLooping={true}  // Loop video
                shouldPlay={true}  // Auto-play video when modal opens
              />
              <Button title="Close" onPress={() => setModalVisible(false)} color="#008080" />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',  // Off-White background for main container
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.65,  // Take 65% of screen height
  },
  detailsContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.35,  // Take 35% of screen height
    backgroundColor: '#F8B400',  // Sand Yellow for details container
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    elevation: 10,  // Shadow for Android
    shadowColor: '#000',  // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2F4F4F',  // Dark Slate Gray for title
  },
  description: {
    fontSize: 16,
    color: '#2F4F4F',  // Dark Slate Gray for description
  },
  localInfo: {
    fontSize: 16,
    color: '#2F4F4F',
    marginTop: 5,  // Space between description and local info
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 20,
  },
  badge: {
    fontSize: 24,  // Adjust font size for badge emojis
  },
  startQuestButton: {
    backgroundColor: '#FF6F61',  // Coral Pink for button
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAF9F6',  // Off-White text for button
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Darker overlay behind modal
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FAF9F6',  // Off-White background for modal content
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalVideo: {
    width: '100%',
    height: 300,  // Adjust the height as needed
    marginBottom: 15,
  },
  placeholderText: {
    fontSize: 16,
    color: '#2F4F4F',
    textAlign: 'center',
  },
});
