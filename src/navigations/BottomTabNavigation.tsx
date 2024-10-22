import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {PureComponent} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import FontAwesome6Icons from 'react-native-vector-icons/FontAwesome6';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {allText} from '../config/constants';
// import {theme} from '../config/theme';
import HomeScreen from '../screens/HomeScreen';
import OffersScreen from '../screens/OffersScreen';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';

const Tab = createBottomTabNavigator();

export class BottomTabNavigation extends PureComponent {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="HOME"
        screenOptions={{
          tabBarActiveTintColor: colors.white,
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
        }}>
        <Tab.Screen
          name="HOME"
          component={HomeScreen}
          options={{
            title: '',
            tabBarIcon: ({color, focused}) => (
              <View
                style={
                  focused ? styles.labelActiveContainer : styles.labelContainer
                }>
                <FoundationIcon
                  name="home"
                  color={color}
                  size={responsiveFontSize(2.6)}
                  style={styles.iconStyles}
                />
                {focused && <Text style={styles.label}>Home</Text>}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="SEARCH"
          component={SearchScreen}
          options={{
            title: '',
            tabBarIcon: ({color, focused}) => (
              <View
                style={
                  focused ? styles.labelActiveContainer : styles.labelContainer
                }>
                <Ionicons
                  name="search"
                  size={responsiveFontSize(2.5)}
                  color={color}
                  style={styles.iconStyles}
                />
                {focused && <Text style={styles.label}>Search</Text>}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="CART"
          component={CartScreen}
          options={{
            title: '',
            tabBarIcon: ({color, focused}) => (
              <View
                style={
                  focused ? styles.labelActiveContainer : styles.labelContainer
                }>
                <FontAwesome6Icons
                  name="cart-shopping"
                  size={responsiveFontSize(2.2)}
                  color={color}
                  style={styles.iconStyles}
                />
                {focused && <Text style={styles.label}>Cart</Text>}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="OFFER"
          component={OffersScreen}
          options={{
            title: '',
            tabBarIcon: ({color, focused}) => (
              <View
                style={
                  focused ? styles.labelActiveContainer : styles.labelContainer
                }>
                <MaterialCommunityIcons
                  name="brightness-percent"
                  size={responsiveFontSize(2.6)}
                  color={color}
                  style={styles.iconStyles}
                />
                {focused && <Text style={styles.label}>Offer</Text>}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabNavigation;

const styles = StyleSheet.create({
  labelContainer: {
    flex: 1,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    gap: 6,
    height: 40,
  },
  iconStyles: {},
  label: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: fonts.bai.semiBold,
    color: colors.white,
  },
  tabBarStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 10,
    height: Platform.OS === 'android' ? 63 : 90,
  },
  tabBarItemStyle: {
    borderRadius: 25,
    marginLeft: 8,
    marginRight: 8,
  },
  labelActiveContainer: {
    backgroundColor: colors.red,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    width: 100,
    justifyContent: 'center',
  },
});
