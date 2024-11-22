import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {forgotPasscodeImg, phoneIcon, questionMarkImg} from '../assets/index';
import CustomButton from '../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import KeyboardWrapper from '../components/KeyboardWrapper';
import {AppDispatch, RootState} from '../redux/store';
import {
  ApiStatusConstants,
  sendOTPAction,
  SendOTPReqInterface,
} from '../redux/slices/AuthSlice';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {DisplayPushNotification} from '../utils/PushNotification';

const validationSchema = Yup.object().shape({
  mobileNo: Yup.string()
    .matches(/^\d{10}$/, '* Phone number must be 10 digits')
    .required('* Phone number is required')
    .test('no-spaces', 'Phone Number cannot contain spaces', value => {
      if (!value) return true;
      return !value.includes(' ');
    }),
});

interface FormValues {
  mobileNo: string;
}

interface ForgotPasscodeScreenState {
  initialValues: FormValues;
}

interface Props {
  sendOTPStatus: ApiStatusConstants;
  sendOTPSuccessMsg: string;
  sendOTPFailureMsg: string;
  getOTPData: (data: SendOTPReqInterface) => void;
  navigation: NavigationProp<ParamListBase>;
}

class ForgotPasscodeScreen extends Component<Props, ForgotPasscodeScreenState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      initialValues: {
        mobileNo: '',
      },
    };
  }

  handleFormSubmit = async (values: FormValues) => {
    const countryCode =
      (await AsyncStorage.getItem('selectedCountryCode')) || '';
    const forgotPasscodeData = {
      mobile_no: values.mobileNo,
      country_code: countryCode,
    };
    this.props.getOTPData(forgotPasscodeData);
  };

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.sendOTPSuccessMsg !== this.props.sendOTPSuccessMsg) {
      const {sendOTPSuccessMsg} = this.props;
      await AsyncStorage.setItem('forgotPasscode4DigitOTP', sendOTPSuccessMsg);
      this.props.navigation.navigate('OtpVerificationForgotPasscodeScreen');
    } else if (prevProps.sendOTPFailureMsg !== this.props.sendOTPFailureMsg) {
      DisplayPushNotification(this.props.sendOTPFailureMsg);
    }
  }

  render() {
    return (
      <KeyboardWrapper>
        <View style={styles.container}>
          <ImageBackground source={forgotPasscodeImg} style={styles.topImg}>
            <View style={styles.textCont}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Entypo
                  name="chevron-small-left"
                  style={styles.leftArrow}
                  size={35}
                />
              </TouchableOpacity>
              <Text style={styles.forgotPasscodeTxt}>Forgot Passcode</Text>
            </View>
          </ImageBackground>
          <Formik
            initialValues={this.state.initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: FormValues) => this.handleFormSubmit(values)}>
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.topCont}>
                <View>
                  <Image
                    source={questionMarkImg}
                    style={styles.questionMarkImg}
                  />
                  <View style={styles.mobileNoCont}>
                    <Text style={styles.mobileNoTxt}>Mobile No</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="9876543210"
                        placeholderTextColor={colors.greyColor}
                        onBlur={handleBlur('mobileNo')}
                        value={values.mobileNo}
                        keyboardType="numeric"
                        maxLength={10}
                        onChangeText={text => {
                          const digitsOnly = text.replace(/[^0-9]/g, '');
                          handleChange('mobileNo')(digitsOnly);
                        }}
                      />
                      <Image source={phoneIcon} style={styles.inputIcon} />
                    </View>
                    {errors.mobileNo && touched.mobileNo && (
                      <Text style={styles.errorTxt}>{errors.mobileNo}</Text>
                    )}
                  </View>
                </View>
                {this.props.sendOTPStatus === 'Initial' && (
                  <CustomButton title={'SEND OTP'} onPress={handleSubmit} />
                )}
                {this.props.sendOTPStatus === 'Loading' && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                  </View>
                )}
                {this.props.sendOTPStatus === 'Success' && (
                  <>
                    <CustomButton title={'SEND OTP'} onPress={handleSubmit} />
                  </>
                )}
                {this.props.sendOTPStatus === 'Failed' && (
                  <>
                    <CustomButton title={'SEND OTP'} onPress={handleSubmit} />
                  </>
                )}
              </View>
            )}
          </Formik>
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
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getOTPData: (data: SendOTPReqInterface) => dispatch(sendOTPAction(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasscodeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topImg: {
    height: responsiveHeight(22),
    width: '100%',
    position: 'relative',
    opacity: 0.9,
  },
  textCont: {
    position: 'absolute',
    bottom: 50,
    left: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftArrow: {
    marginRight: 7,
    color: colors.white,
  },
  forgotPasscodeTxt: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
    fontFamily: fonts.bai.medium,
  },
  topCont: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
  },
  questionMarkImg: {
    width: 137,
    height: 216,
    alignSelf: 'center',
    marginTop: 40,
  },
  mobileNoCont: {
    marginTop: 30,
    gap: 20,
    width: 374,
    alignSelf: 'center',
  },
  mobileNoTxt: {
    color: colors.black,
    fontFamily: fonts.montserrat.extraBold,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 28,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.greyColor,
    borderWidth: 2,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 68,
    borderWidth: 0,
    fontSize: 17,
    color: colors.black,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    marginRight: -5,
  },
  errorTxt: {
    color: 'red',
    fontSize: 13,
    marginTop: -15,
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

  succMsgAPI: {
    color: colors.green,
    fontSize: responsiveFontSize(1.5),
    fontFamily: fonts.montserrat.medium,
    marginTop: 1,
  },
  errMsgAPI: {
    color: colors.red,
    fontSize: responsiveFontSize(1.5),
    fontFamily: fonts.montserrat.medium,
    marginTop: 1,
  },
});
