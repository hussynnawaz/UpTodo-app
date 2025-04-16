import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import Intro from './components/Intro/Intro';
import Intro2 from './components/Intro/Intro2';
import Intro3 from './components/Intro/Intro3';
import OnBoardingScreen from './components/Intro/OnBoardingScreen';
import WelcomeScreen from './components/Intro/WelcomeScreen';
import LoginScreen from './components/Login/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Intro2" component={Intro2} />
          <Stack.Screen name="Intro3" component={Intro3} />
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
