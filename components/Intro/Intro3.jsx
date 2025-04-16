import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const Intro3 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Frame 162.png')} style={styles.image} />
      <Text style={styles.title}>Create daily routine</Text>
      <Text style={styles.subtitle}>
        In Uptodo you can create your personalized routine to stay productive
      </Text>

      <View style={styles.buttonContainer}>
        <Button style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>BACK</Text>
        </Button>
        <Button style={styles.nextButton} onPress={() => navigation.navigate('OnBoardingScreen')}>
          <Text style={styles.nextButtonText}>NEXT</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: 'silver',
  },
  backButtonText: {
    color: 'silver',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#9966FF',
    padding: 15,
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Intro3;
