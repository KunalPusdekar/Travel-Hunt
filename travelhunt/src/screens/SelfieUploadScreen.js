import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ConfettiCannon from 'react-native-confetti-cannon';

const SelfieUploadScreen = () => {
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [points, setPoints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Sample image URL (replace with an actual stock image URL if needed)
  const sampleImageUrl = 'https://images.pexels.com/photos/1289107/pexels-photo-1289107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // Placeholder image

  const pickImage = async () => {
    // Ask the user for permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the selected image
      handleImageUpload(result.assets[0].uri); // Call the upload function
    }
  };

  const handleImageUpload = async (uri) => {
    // Dummy image upload process
    setUploadedImageUrl(uri); // Set the uploaded image URL to the same selected image for demonstration
    // Simulate a points award
    let receivedPoints = Math.floor(Math.random() * 100); // Random points as example
    setPoints(receivedPoints);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match the Selfie!</Text>
      <Text style={styles.subtitle}>Upload a photo similar to the one shown below:</Text>

      {/* Display sample image */}
      <Image source={{ uri: sampleImageUrl }} style={styles.sampleImage} />

      {/* Upload button */}
      <Button title="Upload your selfie" onPress={pickImage} />

      {/* Show uploaded image */}
      {uploadedImageUrl && <Image source={{ uri: uploadedImageUrl }} style={styles.uploadedImage} />}

      {/* Points and confetti */}
      {showConfetti && <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} />}
      {points > 0 && <Text style={styles.pointsText}>You earned {points} points!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  sampleImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
    borderRadius: 10,
  },
  pointsText: {
    fontSize: 18,
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default SelfieUploadScreen;
