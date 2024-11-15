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
import {otpBgImg, otpEmailImg, resendIconImg} from '../assets';
import CustomButton from '../components/Button';
import {OtpInput} from 'react-native-otp-entry';
import {connect} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {
  ApiStatusConstants,
  sendOTPAction,
  SendOTPReqInterface,
  verifyOTPAction,
  verifyOTPReqInterface,
} from '../redux/slices/AuthSlice';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DisplayPushNotification} from '../utils/PushNotification';

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

class OtpVerificationScreen extends Component<
  OtpVerificationProps,
  OtpVerificationState
> {
  constructor(props: OtpVerificationProps) {
    super(props);
    this.state = {otp: '', otpValidation: ''};
  }

  handleOtpChange = (text: string) => {
    console.log(text);
    this.setState({otp: text});
  };

  retrieveProcessAndVerifyOTPData = async (otpType: string) => {
    try {
      const registerAPIData = await AsyncStorage.getItem('registerAPIData');
      const parsedData = registerAPIData ? JSON.parse(registerAPIData) : null;
      if (parsedData && otpType === 'sendOTP') {
        console.log('parsedDatafunc', parsedData, otpType);
        this.props.getOTPData({
          mobile_no: parsedData.mobile_no,
          country_code: parsedData.selectedCountryCode,
        });
        return;
      } else if (parsedData && otpType === 'verifyOTP') {
        console.log('parsedDatafunc', parsedData, otpType);
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
    console.log('componentDidMount called');
    this.retrieveProcessAndVerifyOTPData('sendOTP');
  }

  resendOTP = () => {
    this.retrieveProcessAndVerifyOTPData('sendOTP');
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
        this.props.navigation.navigate('LoginScreen');
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
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={this.resendOTP}>
                  <Image source={resendIconImg} style={styles.resendImg} />
                </TouchableOpacity>
              </View>
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
          </ImageBackground>
          <Toast />
        </View>
      </KeyboardWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  console.log('mapStateToProps', state.auth.sendOTPSuccessMsg);
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
)(OtpVerificationScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    height: '100%',
  },
  bgImageContainer: {
    flex: 1,
    paddingVertical: responsiveHeight(6),
    justifyContent: 'space-between',
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
  resendImg: {width: 44, height: 44},

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
