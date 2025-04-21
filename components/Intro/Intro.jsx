import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Intro = ({ navigation }) => {
  console.log("Intro component rendered");
  return (
<View style={styles.container}>
  <Image 
    source={require('../../assets/main-logo.png')} 
    style={styles.image} 
    resizeMode="contain" 
  />
  <Text style={styles.title}>Study Buddy</Text>
  <TouchableOpacity 
    style={styles.button} 
    onPress={() => navigation.navigate('Intro2')}
  >
    <Text style={styles.text}>Get Started</Text>
  </TouchableOpacity>
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    backgroundColor: '#8685E7',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 250,
    height: 50,
    alignContent: 'center',
  },
  text: {
    color: '#000',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  title: {
    fontFamily: 'Future-PT-Bold', // Replace with actual font name if different
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Intro;
