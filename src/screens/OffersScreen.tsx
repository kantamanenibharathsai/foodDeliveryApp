import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, ImageBackground, ScrollView} from 'react-native';
import {
  ParamListBase,
} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {
  offersBannerOneImg,
  offersBannerTwoImg,
  offersBannerThreeImg,
} from '../assets';
import TodaySpecial from '../components/TodaySpecial';

interface RootStackParamList extends ParamListBase {
  auth: undefined;
  home: undefined;
  'terms-and-conditions': undefined;
  'verify-otp': undefined;
  'forgot-password': undefined;
}

class OffersScreen extends Component {
  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.offersCont}>
          <View style={styles.offersHeader}>
            <Text style={styles.bestOffersText}>Best Offers</Text>
          </View>
          <View>
            <View style={styles.bodyCont}>
              <View style={styles.imgsCont}>
                <ImageBackground
                  source={offersBannerOneImg}
                  style={styles.bannerImg}>
                  <View style={styles.txtCont}>
                    <Text style={styles.discountText}>Get 30% OFF</Text>
                    <Text style={styles.dishName}>Super Veg</Text>
                    <Text style={[styles.dishName, {marginTop: -10}]}>
                      Delicious Dish
                    </Text>
                  </View>
                </ImageBackground>
                <ImageBackground
                  source={offersBannerTwoImg}
                  style={styles.bannerImg}>
                  <View style={styles.txtCont}>
                    <Text style={styles.discountText}>Get 30% OFF</Text>
                    <Text style={styles.dishName}>Best Veg</Text>
                    <Text style={[styles.dishName, {marginTop: -10}]}>
                      Hamburger
                    </Text>
                  </View>
                </ImageBackground>
                <ImageBackground
                  source={offersBannerThreeImg}
                  style={styles.bannerImg}>
                  <View style={styles.txtCont}>
                    <Text style={styles.discountText}>Get 30% OFF</Text>
                    <Text style={styles.dishName}>Classic Chicken</Text>
                    <Text style={[styles.dishName, {marginTop: -10}]}>
                      Wings
                    </Text>
                  </View>
                </ImageBackground>
              </View>

              <View style={styles.nearByRestCont}>
                <View style={styles.nearByRestTopCont}>
                  <Text style={styles.commonTxt}>Nearby Restaurant Offers</Text>
                </View>
                <TodaySpecial />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default OffersScreen;

const styles = StyleSheet.create({
  offersCont: {
    flex: 1,
  },

  offersHeader: {
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? '#F5ECE2' : '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 1,
    height: 98,
  },

  bestOffersText: {
    fontSize: 20,
    marginTop: 55,
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    marginLeft: 16,
  },

  bodyCont: {
    paddingTop: responsiveHeight(2.8),
    paddingHorizontal: responsiveWidth(3.1),
  },

  imgsCont: {
    gap: 15,
  },

  imgTxtCont: {},

  bannerImg: {
    height: 135,
    borderRadius: 10,
  },

  txtCont: {
    position: 'absolute',
    top: 25,
    left: 25,
  },

  discountText: {
    fontFamily: fonts.montserrat.mediumItalic,
    fontSize: 16,
    color: colors.white,
  },

  dishName: {
    fontFamily: fonts.bai.semiBold,
    fontSize: 20,
    color: colors.white,
  },

  nearByRestCont: {
    // paddingHorizontal: responsiveWidth(3.8),
    gap: 20,
    marginTop: 15,
  },

  nearByRestTopCont: {
    // paddingHorizontal: responsiveWidth(3.0),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: responsiveWidth(3),
  },

  commonTxt :{  
    fontSize: 24,
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
    // paddingLeft: responsiveWidth(3.8),
  }
});
