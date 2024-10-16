import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';  // Animatable Import
import { MotiView } from 'moti';  // Moti Import
import { Canvas, Circle } from '@shopify/react-native-skia';  // Skia Import

const challenges = [
  { id: '1', title: 'Photo Quest: Capture the Hidden Waterfall', progress: 50 },
  { id: '2', title: 'Cultural Task: Attend a Local Festival', progress: 70 },
  { id: '3', title: 'Explorer: Visit 5 New Locations', progress: 30 },
];

const ChallengeItem = ({ title, index, progress }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current; 
  const [pressed, setPressed] = useState(false); 

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      delay: index * 200, 
      useNativeDriver: true,
    }).start();
  }, [animatedValue, index]);

  const onPress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.2, 
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1, 
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setPressed(!pressed); 
  };

  const itemScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const opacity = animatedValue;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      {/* Animatable View for bounce effect on press */}
      <Animatable.View animation="fadeInUp" duration={1000}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }} 
          animate={{ opacity: 1, translateY: 0 }} 
          transition={{ type: 'timing', duration: 500 }}
        >
          <Animated.View style={{ ...styles.challenge, transform: [{ scale: itemScale }, { scale }], opacity }}>
            <Text style={styles.challengeText}>{title}</Text>
            <View style={styles.progressBarContainer}>
              <Animated.View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            {pressed && <Text style={styles.progressText}>Progress: {progress}%</Text>} 
          </Animated.View>
        </MotiView>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function ChallengesScreen() {
  const scrollY = useRef(new Animated.Value(0)).current; 
  const bounceAnim = useRef(new Animated.Value(1)).current; 
  const parallaxAnim = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -30],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    // Bounce animation for character
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  return (
    <View style={styles.container}>
      {/* Background Animation */}
      <LottieView
        source={require('../../assets/animations/background-animation.json')} 
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />

      {/* Character Animation with Parallax Effect */}
      <Animated.View style={{ transform: [{ translateY: parallaxAnim }, { scale: bounceAnim }] }}>
        <LottieView
          source={require('../../assets/animations/character-animation.json')} 
          autoPlay
          loop
          style={styles.characterAnimation}
        />
      </Animated.View>

      <Text style={styles.title}>Available Challenges</Text>

      {/* Skia Animation Example */}
      <Canvas style={styles.skiaAnimation}>
        <Circle cx={75} cy={75} r={50} color="lightblue" />
      </Canvas>

      {/* Animated FlatList */}
      <Animated.FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ChallengeItem title={item.title} index={index} progress={item.progress} />
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingBottom: 100 }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#FAF9F6', // Off-White
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2F4F4F', // Dark Slate Gray
  },
  challenge: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  challengeText: {
    fontSize: 18,
    color: '#2F4F4F', // Dark Slate Gray
  },
  characterAnimation: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  backgroundAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, 
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF6F61', // Coral Pink
  },
  progressText: {
    marginTop: 5,
    fontSize: 12,
    color: '#2F4F4F', // Dark Slate Gray
  },
  skiaAnimation: {
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
