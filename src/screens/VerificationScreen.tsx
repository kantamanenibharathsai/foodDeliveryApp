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
import {otpBgImg, otpEmailImg, resendIconImg} from '../assets';
import CustomButton from '../components/Button';
import {OtpInput} from 'react-native-otp-entry';

interface State {
  otp: string;
}

class OtpVerificationScreen extends Component<{}, State> {
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
          <StatusBar
            backgroundColor={'rgba(0,0,0,0)'}
            translucent={true}
            barStyle={'light-content'}
          />
          <ImageBackground
            source={otpBgImg}
            resizeMode="cover"
            style={styles.bgImageContainer}>
            <View style={styles.topCont}>
              <Text style={styles.headerText}>OTP Verification</Text>
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
            <View>
              <CustomButton title={'SUBMIT'} onPress={this.handleVerifyOtp} />
            </View>
          </ImageBackground>
          <Toast />
        </View>
      </KeyboardWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    height: "100%"
  },
  bgImageContainer: {
    flex: 1,
    paddingVertical: responsiveHeight(6),
    justifyContent: "space-between",
    alignItems: 'center',
  },
  topCont: {
    alignItems: 'center',
    gap: responsiveHeight(2),
    flex: 1,
  },
  emailImageContainer: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: responsiveHeight(12),
    height: responsiveHeight(12),
  },
  contentContainer: {
    gap: responsiveHeight(1),
  },
  otpContainer: {
    width: responsiveWidth(60),
     marginTop: 10,
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
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    fontFamily: fonts.montserrat.regular,
  },
  phoneText: {
    color: colors.white,
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    fontFamily: fonts.montserrat.semiBold,
  },
  resendText: {
    color: colors.white,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    fontFamily: fonts.montserrat.semiBold,
  },

  pinCodeBox: {

    borderRadius: 10,
    backgroundColor: '#E8E8E8',
    width: 52,
    height: 68,
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
});

export default OtpVerificationScreen;
