import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import {colors} from '../utils/Colors';
import CustomCarousel from './CustomCarousel';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {fonts} from '../constants/fonts';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
          <View style={styles.priceContainer}>
            <View style={styles.iconTxtCont}>
              <FontAwesome name="rupee" color={colors.red} size={15} />
              <Text style={styles.price}>100</Text>
            </View>
            <View style={styles.iconTxtCont}>
              <FontAwesome
                name="rupee"
                color={colors.red}
                size={15}
                style={{textDecorationLine: 'line-through'}}
              />
              <Text
                style={[styles.price, {textDecorationLine: 'line-through'}]}>
                200
              </Text>
            </View>
          </View>
          <View style={styles.flexCont}>
            <View>
              <Text style={styles.commonTxt}>Size</Text>
              <View style={styles.btnsCont}>
                <TouchableOpacity style={styles.smallBtn}>
                  <Text style={styles.smallBtnTxt}>S</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallBtn}>
                  <Text style={styles.smallBtnTxt}>M</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallBtn}>
                  <Text style={styles.smallBtnTxt}>L</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text style={styles.commonTxt}>Quantity</Text>
              <View style={styles.btnsCont}>
                <TouchableOpacity style={styles.smallBtn}>
                  <Icon
                    name="remove"
                    size={20}
                    color="#000"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallBtn}>
                  <Text style={styles.smallBtnTxt}>01</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallBtn}>
                  <Icon name="add" size={20} color="#000" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.headingParaTxt}>
            <Text style={styles.commonTxt}>Description</Text>
            <Text style={styles.paraTxt}>
              If you use this site regularly and would like to help keep the
              site on the Internet, please consider donating a small sum to help
              pay for the hosting
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleSubmit()}
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>ADD TO CART</Text>
            <Icon name="add" size={28} color="#fff" style={styles.icon} />
          </TouchableOpacity>
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

  iconTxtCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: responsiveFontSize(1.8),
    color: colors.red,
    marginRight: 3,
    fontFamily: fonts.bai.semiBold,
  },

  flexCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
    marginTop: 15,
  },

  commonTxt: {
    fontSize: responsiveFontSize(2),
    color: colors.black,
    // marginRight: 3,
    fontFamily: fonts.bai.semiBold,
  },

  btnsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },

  smallBtn: {
    width: 42,
    height: 42,
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowColor: Platform.OS === 'ios' ? '#000' : 'FFE5E5',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  smallBtnTxt: {
    fontSize: responsiveFontSize(1.8),
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
    textAlign: 'center',
  },

  icon: {marginLeft: 1},

  headingParaTxt: {
    flexDirection: 'column',
    gap: 4,
    marginTop: 30,
  },

  paraTxt: {
    fontSize: responsiveFontSize(1.7),
    color: colors.lightTextColor,
    fontFamily: fonts.montserrat.medium,
    lineHeight: 26,
  },

  buttonContainer: {
    height: 75,
    alignSelf: 'stretch',
    borderRadius: 60,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
    marginVertical: 10,
    shadowColor: Platform.OS === 'ios' ? '#000' : 'DF201F',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
    gap: 10,
    marginTop: 40,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.bai.semiBold,
    textTransform: 'uppercase',
    fontSize: responsiveFontSize(2.1),
  },
});
