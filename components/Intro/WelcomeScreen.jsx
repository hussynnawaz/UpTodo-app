import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to UpTodo</Text>
        <Text style={styles.subtitle}>
          Please login to your account or create a new account to continue
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createAccountButton}
        onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.createAccountText}>CREATE ACCOUNT</Text>
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
    paddingTop: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 50,
  },
  loginButton: {
    backgroundColor: '#8A63D2',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccountButton: {
    borderColor: '#8A63D2',
    borderWidth: 2,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  createAccountText: {
    color: '#8A63D2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
