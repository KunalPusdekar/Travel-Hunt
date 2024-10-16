import { View, Text, StyleSheet, Image, FlatList, Animated, useColorScheme, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Track dark or light mode
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Simple animation for the scaling effect on mount
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      friction: 2,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  // Top 3 traveler data
  const topThree = [
    { id: 1, name: 'Traveler 1', rank: 1, image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, name: 'Traveler 2', rank: 2, image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, name: 'Traveler 3', rank: 3, image: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  // Toggle dark/light mode function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      {/* Toggle button */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
        <Text style={styles.toggleButtonText}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</Text>
      </TouchableOpacity>

      {/* Top Container with leaderboard title */}
      <View style={[styles.topContainer, isDarkMode ? styles.darkTopContainer : styles.lightTopContainer]}>
        <Text style={styles.headerTitle}>Leader Board</Text>

        {/* Podium for top 3 */}
        <View style={styles.podiumContainer}>
          {/* 2nd place */}
          <View style={styles.podiumPosition2}>
            <Image source={{ uri: topThree[1].image }} style={styles.podiumImage} resizeMode="cover" />
            <Text style={styles.podiumName}>{topThree[1].name}</Text>
            <Text style={styles.podiumRank}>{topThree[1].rank}</Text>
          </View>
          {/* 1st place (higher than the others) */}
          <View style={styles.podiumPosition1}>
            <Image source={{ uri: topThree[0].image }} style={styles.podiumImage} resizeMode="cover" />
            <Text style={styles.podiumName}>{topThree[0].name}</Text>
            <Text style={styles.podiumRank}>{topThree[0].rank}</Text>
          </View>
          {/* 3rd place */}
          <View style={styles.podiumPosition3}>
            <Image source={{ uri: topThree[2].image }} style={styles.podiumImage} resizeMode="cover" />
            <Text style={styles.podiumName}>{topThree[2].name}</Text>
            <Text style={styles.podiumRank}>{topThree[2].rank}</Text>
          </View>
        </View>
      </View>

      {/* Leaderboard list for other travelers */}
      <FlatList
        data={[...Array(20).keys()].map(i => ({ id: i + 4, name: `Traveler ${i + 4}`, points: Math.floor(Math.random() * 2000) + 1000 }))}
        renderItem={({ item, index }) => (
          <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }, isDarkMode ? styles.darkCard : styles.lightCard]}>
            <View style={styles.cardDataContainer}>
              <Text style={styles.cardIndex}>{index + 4}</Text>
              <Image source={{ uri: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400" }}
                style={styles.cardImage}
                resizeMode="cover"
              />
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
  // Base container styles
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: "#1C1C1E", // Dark mode background
  },
  lightContainer: {
    backgroundColor: "#F0F0F0", // Light mode background
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
    backgroundColor: "#333", // Dark mode for top container
  },
  lightTopContainer: {
    backgroundColor: "#FFF", // Light mode for top container
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFD700",
  },
  podiumContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  podiumPosition1: {
    alignItems: "center",
    marginBottom: 20,  // Higher placement for 1st position
    backgroundColor: "#FFD700",
    padding: 20,
    borderRadius: 10,
  },
  podiumPosition2: {
    alignItems: "center",
    backgroundColor: "#B3B3B3",  // Silver for 2nd place
    padding: 20,
    borderRadius: 10,
  },
  podiumPosition3: {
    alignItems: "center",
    backgroundColor: "#CD7F32",  // Bronze for 3rd place
    padding: 20,
    borderRadius: 10,
  },
  podiumImage: {
    width: 70,
    height: 90,
    borderRadius: 25,
    marginBottom: 5,
    borderWidth: 3,
    borderColor: '#FFD700',  // Changed ring color for all podium images
  },
  podiumName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: '600',
  },
  podiumRank: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  darkCard: {
    backgroundColor: "#444", // Dark mode card background
  },
  lightCard: {
    backgroundColor: "#FFF", // Light mode card background
  },
  cardDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardIndex: {
    color: "#FFFFFF",  // Gold for the index
    fontSize: 18,
    fontWeight: "bold",
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFD700',  // Updated the ring color around the traveler
  },
  cardTitle: {
    fontSize: 16,
  },
  cardRankContainer: {},
  cardRankTitle: {
    color: "#FF4500",  // Orange to highlight rank
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButton: {
    alignSelf: 'center',
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  toggleButtonText: {
    color: '#333',
    fontWeight: 'bold',
  }
});

export default Index;
