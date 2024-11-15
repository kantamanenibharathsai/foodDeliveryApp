import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import {loginFoodPlateBg, loginRedBg} from '../assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PhoneInputField from '../components/PhoneInputField';
import {OtpInput} from 'react-native-otp-entry';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/Button';
import {AppDispatch, RootState} from '../redux/store';
import {
  ApiStatusConstants,
  loginAction,
  loginReqInterface,
} from '../redux/slices/AuthSlice';
import {connect} from 'react-redux';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\d{10}$/, '*Phone number must be 10 digits')
    .required('*Phone number is required')
    .test('no-spaces', 'Phone Number cannot contain spaces', value => {
      if (!value) return true;
      return !value.includes(' ');
    }),
  passcode: Yup.string()
    .length(6, '*Passcode must be exactly 6 characters')
    .required('*Passcode is required'),
});

export interface LoginFormValues {
  phone: string;
  passcode: string;
}

interface LoginProps {
  loginSuccessMsgToken: string;
  loginStatus: ApiStatusConstants;
  loginErrMsg: string;
  sendLoginData: (data: loginReqInterface) => void;
  navigation: NavigationProp<ParamListBase>;
}

interface LoginState {
  selectedRole: string;
}

class LoginScreen extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      selectedRole: 'CUSTOMER',
    };
  }

  componentDidUpdate(prevProps: LoginProps) {
    if (
      prevProps.loginStatus !== this.props.loginStatus &&
      this.props.loginStatus === 'Success'
    ) {
      this.props.navigation.navigate('BottomTab');
    }
  }

  registerNowPress = () => {
    this.props.navigation.navigate('RegisterScreen');
  };

  forgotPasswordPress = () => {
    this.props.navigation.navigate('ForgotPasscodeScreen');
  };

  handleFormSubmit = async (values: LoginFormValues) => {
    const countryCode =
      (await AsyncStorage.getItem('selectedCountryCode')) || '';
    const loginData: loginReqInterface = {
      mobile_no: values.phone,
      password: values.passcode,
      role: this.state.selectedRole,
      country_code: countryCode,
    };
    this.props.sendLoginData(loginData);
  };

  selectRoleFunc = (roleType: string) => {
    this.setState({selectedRole: roleType});
  };

  render() {
    const {selectedRole} = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground source={loginRedBg} style={styles.backgroundRedImg}>
          <View style={styles.textCont}>
            <Text style={styles.loginText}>Login</Text>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
          </View>
          <Image style={styles.foodPlateImg} source={loginFoodPlateBg} />
        </ImageBackground>
        <View style={styles.belowContainer}>
          <Formik<LoginFormValues>
            initialValues={{
              phone: '',
              passcode: '',
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values: LoginFormValues) =>
              this.handleFormSubmit(values)
            }>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <PhoneInputField
                  name="phone"
                  onChangePhone={number =>
                    handleChange('phone')(number.replace(/\s/g, ''))
                  }
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  errors={errors}
                  touched={touched}
                />
                <Text style={styles.passcodeText}>Passcode</Text>
                <OtpInput
                  numberOfDigits={6}
                  focusColor="green"
                  secureTextEntry={true}
                  onFilled={text => setFieldValue('passcode', text)}
                  onBlur={() => handleBlur('passcode')}
                  theme={{
                    containerStyle: styles.otpContainer,
                    pinCodeContainerStyle: styles.pinCodeBox,
                    pinCodeTextStyle: styles.otpText,
                    focusStickStyle: styles.focusStick,
                    focusedPinCodeContainerStyle: styles.activePinCodeBox,
                  }}
                />
                {touched.passcode && errors.passcode && (
                  <Text style={styles.errorText}>{errors.passcode}</Text>
                )}

                <Text
                  style={styles.forgotPasscodeText}
                  onPress={this.forgotPasswordPress}>
                  Forgot Passcode
                </Text>
                <View style={styles.custoSellerContainer}>
                  <View style={styles.radioLabelCont}>
                    <MaterialIcons
                      name={'radio-button-checked'}
                      size={20}
                      color={
                        selectedRole === 'CUSTOMER'
                          ? colors.red
                          : colors.lightTextColor
                      }
                      onPress={() => this.selectRoleFunc('CUSTOMER')}
                    />
                    <Text style={styles.radioLabel}>Customer</Text>
                  </View>
                  <View style={styles.radioLabelCont}>
                    <MaterialIcons
                      name={'radio-button-checked'}
                      size={20}
                      color={
                        selectedRole === 'SELLER'
                          ? colors.red
                          : colors.lightTextColor
                      }
                      onPress={() => this.selectRoleFunc('SELLER')}
                    />
                    <Text style={styles.radioLabel}>Seller</Text>
                  </View>
                </View>
                {this.props.loginStatus === 'Initial' && (
                  <CustomButton title="Login" onPress={handleSubmit} />
                )}
                {this.props.loginStatus === 'Loading' && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                  </View>
                )}
                {this.props.loginStatus === 'Success' && (
                  <>
                    <CustomButton title="Login" onPress={handleSubmit} />
                    <Text style={styles.loginSuccMsgAPI}>Login Successful</Text>
                  </>
                )}
                {this.props.loginStatus === 'Failed' && (
                  <>
                    <CustomButton title="Login" onPress={handleSubmit} />
                    <Text style={styles.loginErrMsgAPI}>
                      {this.props.loginErrMsg}
                    </Text>
                  </>
                )}
              </>
            )}
          </Formik>
          <Text style={styles.registerText} onPress={this.registerNowPress}>
            Register now?
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  loginSuccessMsgToken: state.auth.loginSuccessMsgToken,
  loginStatus: state.auth.loginStatus,
  loginErrMsg: state.auth.loginErrMsg,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  sendLoginData: (data: loginReqInterface) => dispatch(loginAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundRedImg: {
    height: responsiveHeight(50),
    width: '100%',
    position: 'relative',
  },
  textCont: {
    position: 'absolute',
    bottom: 50,
    left: 18,
  },
  loginText: {
    fontSize: 45,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 56,
    fontFamily: fonts.bai.light,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '500',
    color: colors.white,
    lineHeight: 27.5,
    fontFamily: fonts.bai.light,
  },
  foodPlateImg: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    top: 80,
    width: responsiveWidth(60),
    height: responsiveHeight(50),
  },
  belowContainer: {
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: responsiveFontSize(1.5),
    color: colors.red,
    marginTop: -13,
  },
  passcodeText: {
    fontFamily: fonts.montserrat.bold,
    fontSize: 16,
    color: colors.black,
    marginTop: 8,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  pinCodeBox: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#E8E8E8',
    width: 52,
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activePinCodeBox: {
    borderColor: 'green',
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
  forgotPasscodeText: {
    marginTop: -7,
    fontSize: responsiveFontSize(1.9),
    color: colors.red,
    alignSelf: 'flex-end',
    fontFamily: fonts.montserrat.bold,
  },
  custoSellerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    gap: 40,
  },
  radioLabelCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 7,
  },
  radioLabel: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fonts.montserrat.medium,
    lineHeight: 28,
    fontWeight: '700',
  },
  registerText: {
    fontFamily: fonts.montserrat.bold,
    fontWeight: '600',
    fontSize: 18,
    color: colors.black,
    alignSelf: 'center',
    marginTop: 10,
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

  loginSuccMsgAPI: {
    color: colors.green,
    fontSize: responsiveFontSize(1.5),
    fontFamily: fonts.montserrat.medium,
    marginTop: 1,
  },
  loginErrMsgAPI: {
    color: colors.red,
    fontSize: responsiveFontSize(1.5),
    fontFamily: fonts.montserrat.medium,
    marginTop: 1,
  },
});
