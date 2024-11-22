import React, {Component} from 'react';
import {
  ActivityIndicator,
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
import KeyboardWrapper from '../components/KeyboardWrapper';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import {otpEmailImg, otpVerifiForgotPassBgImg, resendIconImg} from '../assets';
import CustomButton from '../components/Button';
import {OtpInput} from 'react-native-otp-entry';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  ApiStatusConstants,
  sendOTPAction,
  SendOTPReqInterface,
  verifyOTPAction,
  verifyOTPReqInterface,
} from '../redux/slices/AuthSlice';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {AppDispatch, RootState} from '../redux/store';
import {connect} from 'react-redux';
import {DisplayPushNotification} from '../utils/PushNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OtpVerificationState {
  otp: string;
  otpValidation: string;
}

interface OtpVerificationProps {
  sendOTPStatus: ApiStatusConstants;
  sendOTPSuccessMsg: string;
  sendOTPFailureMsg: string;
  getOTPData: (data: SendOTPReqInterface) => void;
  verifyOTPStatus: ApiStatusConstants;
  verifyOTPSuccessMsg: string;
  verifyOTPFailureMsg: string;
  verifyOTPData: (data: verifyOTPReqInterface) => void;
  navigation: NavigationProp<ParamListBase>;
}

class OtpVerificationForgotPasscodeScreen extends Component<
  OtpVerificationProps,
  OtpVerificationState
> {
  constructor(props: OtpVerificationProps) {
    super(props);
    this.state = {otp: '', otpValidation: ''};
  }

  handleOtpChange = (text: string) => {
    this.setState({otp: text});
  };

  retrieveProcessAndVerifyOTPData = async (otpType: string) => {
    try {
      const registerAPIData = await AsyncStorage.getItem('registerAPIData');
      const parsedData = registerAPIData ? JSON.parse(registerAPIData) : null;
      if (parsedData && otpType === 'reSendOTP') {
        this.props.getOTPData({
          mobile_no: parsedData.mobile_no,
          country_code: parsedData.selectedCountryCode,
        });
        return;
      } else if (parsedData && otpType === 'verifyOTP') {
        this.props.verifyOTPData({
          country_code: parsedData.selectedCountryCode,
          mobile_no: parsedData.mobile_no,
          otp: this.state.otp,
        });
        return;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while retrieving OTP data.',
      });
      return;
    }
  };

  async componentDidMount(): Promise<void> {
    const forgotPasscode4DigitOTP = await AsyncStorage.getItem(
      'forgotPasscode4DigitOTP',
    );
    if (forgotPasscode4DigitOTP)
      DisplayPushNotification(forgotPasscode4DigitOTP);
  }

  resendOTP = () => {
    this.retrieveProcessAndVerifyOTPData('reSendOTP');
  };

  handleVerifyOtp = () => {
    const {otp} = this.state;
    if (otp.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter the valid OTP.',
      });
      return;
    } else if (otp.length !== 4) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'OTP must be 4 digits long',
      });
      return;
    } else {
      this.retrieveProcessAndVerifyOTPData('verifyOTP');
    }
  };

  componentDidUpdate(prevProps: OtpVerificationProps) {
    if (
      prevProps.sendOTPSuccessMsg !== this.props.sendOTPSuccessMsg &&
      this.props.sendOTPSuccessMsg !== ''
    ) {
      DisplayPushNotification(this.props.sendOTPSuccessMsg);
    } else if (
      prevProps.verifyOTPSuccessMsg !== this.props.verifyOTPSuccessMsg &&
      this.props.verifyOTPSuccessMsg !== ''
    ) {
      DisplayPushNotification(this.props.verifyOTPSuccessMsg);
      setTimeout(() => {
        this.props.navigation.navigate('SetNewPasscodeScreen');
      }, 2000);
    } else if (
      prevProps.sendOTPFailureMsg !== this.props.sendOTPFailureMsg &&
      this.props.sendOTPFailureMsg !== ''
    ) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: this.props.sendOTPFailureMsg,
      });
    } else if (
      prevProps.verifyOTPFailureMsg !== this.props.verifyOTPFailureMsg &&
      this.props.verifyOTPFailureMsg !== ''
    ) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: this.props.verifyOTPFailureMsg,
      });
    }
  }

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
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
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
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={this.resendOTP}>
                    <Image source={resendIconImg} width={44} height={44} />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
          {this.props.verifyOTPStatus === 'Initial' && (
            <CustomButton title={'SUBMIT'} onPress={this.handleVerifyOtp} />
          )}
          {this.props.verifyOTPStatus === 'Loading' && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          )}
          {this.props.verifyOTPStatus === 'Success' && (
            <CustomButton title={'SUBMIT'} onPress={this.handleVerifyOtp} />
          )}
          {this.props.verifyOTPStatus === 'Failed' && (
            <CustomButton title={'SUBMIT'} onPress={this.handleVerifyOtp} />
          )}
          <Toast />
        </View>
      </KeyboardWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    sendOTPStatus: state.auth.sendOTPStatus,
    sendOTPSuccessMsg: state.auth.sendOTPSuccessMsg,
    sendOTPFailureMsg: state.auth.sendOTPFailureMsg,

    verifyOTPStatus: state.auth.verifyOTPStatus,
    verifyOTPSuccessMsg: state.auth.verifyOTPSuccessMsg,
    verifyOTPFailureMsg: state.auth.verifyOTPFailureMsg,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getOTPData: (data: SendOTPReqInterface) => dispatch(sendOTPAction(data)),
  verifyOTPData: (data: verifyOTPReqInterface) =>
    dispatch(verifyOTPAction(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OtpVerificationForgotPasscodeScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'space-between',
    gap: 15,
    paddingBottom: responsiveHeight(3.5),
  },

  bgImageContainer: {
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
    alignSelf: 'center',
    marginLeft: -15,
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

  loadingContainer: {
    width: 385,
    height: 75,
    alignSelf: 'center',
    borderRadius: 60,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    marginVertical: 10,
    shadowColor: '#94CD00',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 12,
  },
});
