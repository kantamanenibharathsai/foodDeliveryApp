import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';
import OnBoardingScreen from './src/screens/OnBoardingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import OtpVerificationScreen from './src/screens/VerificationScreen';
import AllowLocationScreen from './src/screens/AllowLocationScreen';
import ForgotPasscodeScreen from './src/screens/ForgotPasscodeScreen';
import OtpVerificationForgotPasscodeScreen from './src/screens/OtpVerificationForgotPasscodeScreen';
import SetNewPasscodeScreen from './src/screens/SetNewPasscodeScreen';
import HomeScreen from './src/screens/HomeScreen';
import BottomTabNavigation from './src/navigations/BottomTabNavigation';


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
        initialRouteName="BottomTab">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="OtpVerificationScreen"
          component={OtpVerificationScreen}
        />
        <Stack.Screen
          name="AllowlocationScreen"
          component={AllowLocationScreen}
        />
        <Stack.Screen
          name="ForgotPasscodeScreen"
          component={ForgotPasscodeScreen}
        />
        <Stack.Screen
          name="OtpVerificationForgotPasscodeScreen"
          component={OtpVerificationForgotPasscodeScreen}
        />
        <Stack.Screen
          name="SetNewPasscodeScreen"
          component={SetNewPasscodeScreen}
        />
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
        <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
