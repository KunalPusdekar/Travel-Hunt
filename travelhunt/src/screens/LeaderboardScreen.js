import { View, Text, StyleSheet, Image, FlatList, Animated, TouchableOpacity, Dimensions } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';

const { width } = Dimensions.get('window');

// Hardcoded scores for leaderboard
const scores = [
  { id: 1, name: 'Traveler 1', points: 1500, image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, name: 'Traveler 2', points: 1400, image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, name: 'Traveler 3', points: 1300, image: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&w=400' },
  // ... other travelers
  { id: 4, name: 'Traveler 4', points: 1250, image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 5, name: 'Traveler 5', points: 1200, image: 'https://images.pexels.com/photos/771098/pexels-photo-771098.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 6, name: 'Traveler 6', points: 1150, image: 'https://images.pexels.com/photos/3440838/pexels-photo-3440838.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 7, name: 'Traveler 7', points: 1100, image: 'https://images.pexels.com/photos/2484906/pexels-photo-2484906.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 8, name: 'Traveler 8', points: 1050, image: 'https://images.pexels.com/photos/2484906/pexels-photo-2484906.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 9, name: 'Traveler 9', points: 1000, image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 10, name: 'Traveler 10', points: 950, image: 'https://images.pexels.com/photos/2484906/pexels-photo-2484906.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const Leaderboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      friction: 2,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
        <Text style={styles.toggleButtonText}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</Text>
      </TouchableOpacity>

      <View style={[styles.topContainer, isDarkMode ? styles.darkTopContainer : styles.lightTopContainer]}>
        <Text style={styles.headerTitle}>Leader Board</Text>

        {/* Podium for top 3 */}
        <View style={styles.podiumContainer}>
          <View style={styles.podiumPosition2}>
            <Image source={{ uri: scores[1].image }} style={styles.podiumImage} resizeMode="cover" />
            <Text style={styles.podiumName}>{scores[1].name}</Text>
            <Text style={styles.podiumRank}>{scores[1].points}</Text>
          </View>
          <View style={styles.podiumPosition1}>
            <Image source={{ uri: scores[0].image }} style={styles.podiumImage} resizeMode="cover" />
            <Text style={styles.podiumName}>{scores[0].name}</Text>
            <Text style={styles.podiumRank}>{scores[0].points}</Text>
          </View>
          <View style={styles.podiumPosition3}>
            <Image source={{ uri: scores[2].image }} style={styles.podiumImage} resizeMode="cover" />
            <Text style={styles.podiumName}>{scores[2].name}</Text>
            <Text style={styles.podiumRank}>{scores[2].points}</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={scores.slice(3)}
        renderItem={({ item, index }) => (
          <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }, isDarkMode ? styles.darkCard : styles.lightCard]}>
            <View style={styles.cardDataContainer}>
              <Text style={styles.cardIndex}>{index + 4}</Text>
              <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
            <View style={styles.cardRankContainer}>
              <Text style={styles.cardRankTitle}>{item.points}</Text>
            </View>
          </Animated.View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  darkContainer: {
    backgroundColor: "#1C1C1E",
  },
  lightContainer: {
    backgroundColor: "#F0F0F0",
  },
  topContainer: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    padding: 20,
    paddingBottom: 40,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  darkTopContainer: {
    backgroundColor: "#333",
  },
  lightTopContainer: {
    backgroundColor: "#FFF",
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFD700",
  },
  podiumContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Use space-between for direct spacing
    alignItems: "flex-end",
    marginTop: -20,
  },
  podiumPosition1: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    width: width * 0.25,
  },
  podiumPosition2: {
    alignItems: "center",
    backgroundColor: "#B3B3B3",
    padding: 15,
    borderRadius: 10,
    width: width * 0.2,
    marginBottom: 10,
  },
  podiumPosition3: {
    alignItems: "center",
    backgroundColor: "#CD7F32",
    padding: 15,
    borderRadius: 10,
    width: width * 0.2,
    marginBottom: 10,
  },
  podiumImage: {
    width: 60,
    height: 80,
    borderRadius: 20,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  podiumName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: '600',
  },
  podiumRank: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  darkCard: {
    backgroundColor: "#444",
  },
  lightCard: {
    backgroundColor: "#FFF",
  },
  cardDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardIndex: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  cardTitle: {
    fontSize: 14,
  },
  cardRankContainer: {},
  cardRankTitle: {
    color: "#FF4500",
    fontSize: 20,
    fontWeight: "bold",
  },
  toggleButton: {
    alignSelf: 'center',
    backgroundColor: '#FFD700',
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
  },
  toggleButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default Leaderboard;
