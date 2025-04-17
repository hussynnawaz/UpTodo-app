import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import './firebase'; // ✅ Initialize Firebase once
import { TimerProvider } from './screens/TimerProvider';

import Intro from './components/Intro/Intro';
import Intro2 from './components/Intro/Intro2';
import Intro3 from './components/Intro/Intro3';
import OnBoardingScreen from './components/Intro/OnBoardingScreen';
import WelcomeScreen from './components/Intro/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import FocusScreen from './screens/FocusScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <TimerProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Intro2" component={Intro2} />
            <Stack.Screen name="Intro3" component={Intro3} />
            <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
            <Stack.Screen name="FocusScreen" component={FocusScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </TimerProvider>
    </Provider>
  );
}
