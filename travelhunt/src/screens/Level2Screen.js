import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Modal, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const initialRegion = {
    latitude: 31.0959,  // Latitude of Chadwick Falls, Shimla
    longitude: 77.1417,  // Longitude of Chadwick Falls, Shimla
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        <Marker coordinate={{ latitude: 31.0959, longitude: 77.1417 }} onPress={() => setModalVisible(true)} />
      </MapView>

      {/* Bottom Box for Attraction Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Attraction Details - Chadwick Falls</Text>
        <Text style={styles.description}>
          Chadwick Falls is a hidden gem located near Shimla, offering stunning views and peaceful surroundings.
          The falls are surrounded by dense forests and are less crowded compared to other tourist spots in Shimla.
        </Text>

        {/* Badge Images */}
        <View style={styles.badgesContainer}>
          <Image source={require('../../assets/badges/explorer.png')} style={styles.badge} />
          <Image source={require('../../assets/badges/explorer.png')} style={styles.badge} />
          <Image source={require('../../assets/badges/explorer.png')} style={styles.badge} />
        </View>

        {/* Start Quest Button */}
        <TouchableOpacity style={styles.startQuestButton}>
          <Text style={styles.buttonText}>Start Quest</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Pop-up Image */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={require('../../assets/images/chadwick_falls.jpeg')} style={styles.modalImage} />
            <Button title="Close" onPress={() => setModalVisible(false)} color="#008080" />
          </View>
        </View>
      </Modal>
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
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 20,
  },
  badge: {
    width: 50,
    height: 50,
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
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 15,
  },
});
