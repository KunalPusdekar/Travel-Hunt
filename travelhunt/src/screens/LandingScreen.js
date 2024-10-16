import { View, StyleSheet, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { AccessibilityInfo } from 'react-native';

export default function LandingScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'ComicSans': require('../../assets/fonts/ComicSansMS.ttf'), // Adjust the path as needed
      });
      setFontsLoaded(true);
    };

    loadFonts();

    // Check reduced motion setting
    const checkReducedMotion = async () => {
      const isReducedMotion = await AccessibilityInfo.isReduceMotionEnabled();
      setReducedMotion(isReducedMotion);
    };

    checkReducedMotion();
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally return a loading spinner
  }

  return (
    <View style={styles.container}>
      {/* Lottie Animation for Welcome */}
      <LottieView
        source={require('../../assets/animations/welcome.json')}  // Ensure this path is correct
        autoPlay
        loop
        style={styles.animation}
        useNativeDriver={!reducedMotion}  // Use native driver based on reduced motion setting
      />

      {/* Animated Start Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        activeOpacity={0.7}  // Slight opacity change when pressed
        style={styles.buttonContainer}
      >
        <LinearGradient
          colors={['#F8B400', '#FF6F61']}  // Sand Yellow to Coral Pink gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.startButton}
        >
          <Text style={styles.startButtonText}>Let's Explore</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.7}
        style={styles.buttonContainer}
      >
        <LinearGradient
          colors={['#FF6F61', '#F8B400']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        activeOpacity={0.7}
        style={styles.buttonContainer}
      >
        <LinearGradient
          colors={['#F8B400', '#FF6F61']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.signUpButton}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',  // Off-White background
  },
  animation: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  startButton: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 5,
  },
  loginButton: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 5,
  },
  signUpButton: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 5,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'ComicSans',
    textTransform: 'uppercase',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'ComicSans',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'ComicSans',
  },
});
