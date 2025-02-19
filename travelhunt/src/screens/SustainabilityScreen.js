import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // You may need to install expo vector icons

const SustainabilityScreen = ({ navigation }) => {
  const [name, setName] = useState(''); // State for user's name
  const contactNumber = '123-456-7890'; // Replace with your actual number
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [contactedAuthority, setContactedAuthority] = useState(false);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    console.log({
      name,//local
      contactNumber,//local
      taskCompleted,
      contactedAuthority, //bool
      review,
    });
    // Set progress to 100 (implement your logic here)

    // Alert to confirm submission
    Alert.alert('Submission Successful', 'Thank you for your submission!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sustainability Task Submission</Text>

      <Text style={styles.label}>Contact Number of Local Recycling Authority:</Text>
      <View style={styles.contactContainer}>
        <Text style={styles.contactName}>Ram Gupta</Text>
        <Text style={styles.contactNumber}>{contactNumber}</Text>
      </View>

      <View style={styles.switchContainer}>
        <Ionicons name="checkmark-circle-outline" size={24} color="#27ae60" />
        <Text style={styles.label}>Have you completed the task?</Text>
        <Switch value={taskCompleted} onValueChange={setTaskCompleted} />
      </View>

      <View style={styles.switchContainer}>
        <Ionicons name="call-outline" size={24} color="#2980b9" />
        <Text style={styles.label}>Have you contacted the local recycling authority?</Text>
        <Switch value={contactedAuthority} onValueChange={setContactedAuthority} />
      </View>

      <Text style={styles.label}>Your Review:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter your review"
        value={review}
        onChangeText={setReview}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#eef2f3', // Light background color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2c3e50',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#34495e',
  },
  contactContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2980b9',
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2980b9',
    marginTop: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ecf0f1', // Light gray background for switch containers
    borderRadius: 8,
  },
  input: {
    height: 45,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3, // Elevation for a slight shadow effect
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SustainabilityScreen;
