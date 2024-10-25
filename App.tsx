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
import BottomTabNavigation from './src/navigations/BottomTabNavigation';
import RestaurantNearByScreen from './src/screens/RestaurantNearByScreen';
import SearchLocationScreen from './src/screens/SearchLocationScreen';
import SearchHydScreen from './src/screens/SearchHyderabadScreen';
import TodaySpecialScreen from './src/screens/TodaysSpecialScreen';
import OffersCarouselScreen from './src/screens/OffersCarousel';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NearByRestaurantBigScreen from './src/screens/NearByRestaurantScreen';

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
        initialRouteName="NearByRestaurantBigScreen">
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
        <Stack.Screen
          name="SearchLocationScreen"
          component={SearchLocationScreen}
        />
        <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
        <Stack.Screen
          name="RestNearByScreen"
          component={RestaurantNearByScreen}
        />
        <Stack.Screen name="SearchHydScreen" component={SearchHydScreen} />
        <Stack.Screen
          name="TodaySpecialScreen"
          component={TodaySpecialScreen}
        />
        <Stack.Screen
          name="OfferCarouselScreen"
          component={OffersCarouselScreen}
        />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen
          name="NearByRestaurantBigScreen"
          component={NearByRestaurantBigScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
