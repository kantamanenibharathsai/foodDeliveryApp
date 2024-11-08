import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../utils/Colors';
import CustomCarousel from './CustomCarousel';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {fonts} from '../constants/fonts';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

export class SingleProductPageScreen extends Component<Props> {
  goBackHandler = () => {
    this.props.navigation.navigate('RestNearByScreen');
  };
  render() {
    return (
      <View style={styles.mainCont}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={this.goBackHandler}>
          <Entypo name="chevron-small-left" size={30} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.loveButton}>
          <Entypo name="heart" size={22} color={colors.red} />
        </TouchableOpacity>
        <CustomCarousel />
        <View style={styles.bodyCont}>
          <Text style={styles.pizzaName}>Vegetarian Pizza</Text>
        </View>
      </View>
    );
  }
}

export default SingleProductPageScreen;

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    backgroundColor: colors.white,
    position: 'relative',
  },

  loveButton: {
    width: 45,
    height: 45,
    borderRadius: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 100,
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 100,
  },

  bodyCont: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveWidth(4),
  },

  pizzaName: {
    fontSize: 22,
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
  },
});
