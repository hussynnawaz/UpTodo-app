import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Intro2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Group 182.png')} style={styles.image} />
      <Text style={styles.title}>Manage your tasks</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Intro3')}>
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
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

export default Intro2;
