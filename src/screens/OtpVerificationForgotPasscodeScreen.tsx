import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import KeyboardWrapper from '../components/KeyboardWrapper';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import {
  otpBgImg,
  otpEmailImg,
  otpVerifiForgotPassBgImg,
  resendIconImg,
} from '../assets';
import CustomButton from '../components/Button';
import {OtpInput} from 'react-native-otp-entry';
import Entypo from 'react-native-vector-icons/Entypo';

interface State {
  otp: string;
}

class OtpVerificationForgotPasscodeScreen extends Component<{}, State> {
  state: State = {
    otp: '',
  };

  expectedOtp = '1234';

  handleOtpChange = (text: string) => {
    this.setState({otp: text});
  };

  handleVerifyOtp = () => {
    const {otp} = this.state;

    if (otp.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter the OTP.',
      });
      return;
    }

    if (otp.length !== 4) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'OTP must be 4 digits long.',
      });
      return;
    }

    if (otp === this.expectedOtp) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'OTP Verified Successfully',
      });
      this.setState({otp: ''});
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'The OTP entered is incorrect.',
      });
    }
  };

  render() {
    const {otp} = this.state;

    return (
      <KeyboardWrapper>
        <View style={styles.container}>
          <View>
            <StatusBar
              backgroundColor={'rgba(0,0,0,0)'}
              translucent={true}
              barStyle={'light-content'}
            />
            <ImageBackground
              source={otpVerifiForgotPassBgImg}
              resizeMode="cover"
              style={styles.bgImageContainer}>
              <View style={styles.textCont}>
                <TouchableOpacity onPress={() => console.log('Go Back')}>
                  <Entypo
                    name="chevron-small-left"
                    style={styles.leftArrow}
                    size={35}
                  />
                </TouchableOpacity>
                <Text style={styles.otpVerifyTxt}>OTP Verification</Text>
              </View>
              <View style={styles.topCont}>
                <View style={styles.emailImageContainer}>
                  <Image
                    source={otpEmailImg}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.descriptionText}>
                    Enter the OTP sent to
                  </Text>
                  <Text style={styles.phoneText}>+91 987654321</Text>
                </View>
                <View style={styles.otpContainer}>
                  <OtpInput
                    numberOfDigits={4}
                    secureTextEntry={false}
                    onFilled={this.handleOtpChange}
                    theme={{
                      containerStyle: styles.otpContainer,
                      pinCodeContainerStyle: styles.pinCodeBox,
                      pinCodeTextStyle: styles.otpText,
                    }}
                  />
                </View>
                <View style={styles.resendOtpContainer}>
                  <Text style={styles.resendText}>Resend OTP</Text>
                  <TouchableOpacity style={styles.iconContainer}>
                    <Image source={resendIconImg} width={44} height={44} />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View>
            <CustomButton title={'VERIFY'} onPress={this.handleVerifyOtp} />
          </View>
          <Toast />
        </View>
      </KeyboardWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // height: '100%',
    flex: 1,
    justifyContent: 'space-between',
    gap: 15,
    paddingBottom: responsiveHeight(3.5)
  },

  bgImageContainer: {
    // flex: 1,
    height: responsiveHeight(59),
    paddingLeft: 10,
    paddingVertical: responsiveHeight(4.5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  topCont: {
    alignItems: 'center',
    gap: responsiveHeight(1),
    flex: 1,
  },

  emailImageContainer: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: responsiveHeight(16),
    height: responsiveHeight(16),
  },

  contentContainer: {
    gap: responsiveHeight(1),
  },

  otpContainer: {
    width: responsiveWidth(60),
    marginTop: 30,
    gap: 10,
  },

  resendOtpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: responsiveHeight(2),
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    color: colors.white,
    fontSize: responsiveFontSize(3),
    textAlign: 'center',
    fontFamily: fonts.bai.semiBold,
  },
  descriptionText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.3),
    textAlign: 'center',
    fontFamily: fonts.montserrat.medium,
    marginTop: responsiveHeight(4),
  },
  phoneText: {
    color: colors.white,
    fontSize: responsiveFontSize(3),
    textAlign: 'center',
    fontFamily: fonts.montserrat.semiBold,
  },
  resendText: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    fontFamily: fonts.montserrat.semiBold,
  },

  pinCodeBox: {
    borderRadius: 5,
    backgroundColor: '#fff',
    width: 58,
    height: 76,
    justifyContent: 'center',
    alignItems: 'center',
  },

  otpText: {
    fontSize: 24,
    color: '#161A1D',
  },
  focusStick: {
    backgroundColor: 'green',
    height: 2,
    width: '60%',
  },

  textCont: {
    marginTop: responsiveHeight(0.1),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 55,
  },

  leftArrow: {
    marginRight: 7,
    color: colors.white,
  },

  otpVerifyTxt: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
    fontFamily: fonts.bai.medium,
  },
});

export default OtpVerificationForgotPasscodeScreen;
