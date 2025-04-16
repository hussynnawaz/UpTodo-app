import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const OnBoardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../assets/Frame-161.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Organize your tasks</Text>
        <Text style={styles.subtitle}>
          You can organize your daily tasks by adding your tasks into separate categories
        </Text>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('WelcomeScreen')}
        >
          <Text style={styles.getStartedText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    padding: 0,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 50,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  backText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },
  getStartedButton: {
    backgroundColor: '#8A63D2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnBoardingScreen;
