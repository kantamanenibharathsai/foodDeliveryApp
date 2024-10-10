import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen, { RootStackParamList } from './src/screens/SplashScreen';
import OnBoardingScreen from './src/screens/OnBoardingScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
        barStyle={'light-content'}
      />
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        {/* <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
