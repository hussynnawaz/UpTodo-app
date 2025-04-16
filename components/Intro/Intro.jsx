import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Intro = ({ navigation }) => {
  console.log("Intro component rendered");
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/Group 173.png')} 
        style={styles.image} 
        resizeMode="contain" 
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => {
          console.log("Button pressed");
          navigation.navigate('Intro2');
        }}
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
});

export default Intro;
