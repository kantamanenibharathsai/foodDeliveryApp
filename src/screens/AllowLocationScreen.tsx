
import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import CustomButton from '../components/Button';
import { allowLocationImg } from '../assets';

interface Props {}

class AllowLocationScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
          barStyle={'dark-content'}
        />
        <View style={styles.imageContainer}>
          <Image source={allowLocationImg} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Allow location</Text>
            <Text style={styles.descriptionText}>
              We need your Permission to access your location
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <CustomButton
              title={'ALLOW LOCATION'}
              onPress={() => {
                /* handle press */
              }}
            />
          </View>
          <TouchableOpacity style={styles.dontAllowContainer}>
            <Text style={styles.dontAllowText}>Don’t allow</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AllowLocationScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: responsiveHeight(6),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(10),
  },
  image: {
    width: responsiveHeight(40),
    height: responsiveHeight(40),
  },
  textContainer: {
    gap: responsiveHeight(1),
  },
  buttonContainer: {
    // height: responsiveHeight(10),
  },
  buttonWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  dontAllowContainer: {
    marginBottom: 10,
  },
  headerText: {
    color: colors.black,
    fontSize: responsiveFontSize(3),
    textAlign: 'center',
    fontFamily: fonts.bai.semiBold,
  },
  descriptionText: {
    color: colors.textColor,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    fontFamily: fonts.montserrat.medium,
  },
  dontAllowText: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    fontFamily: fonts.montserrat.semiBold,
  },
});




