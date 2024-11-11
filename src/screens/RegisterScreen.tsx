import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { emailIconImg, otpEmailImg, personImg, registerTopImg} from '../assets';
import Entypo from 'react-native-vector-icons/Entypo';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import PhoneInputField from '../components/PhoneInputField';
import {OtpInput} from 'react-native-otp-entry';
import {Dropdown} from 'react-native-element-dropdown';
import {statesData} from '../utils/Data';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CustomButton from '../components/Button';
import { AppDispatch, RootState } from '../redux/store';
import { connect } from 'react-redux';


interface RegisterFormValues {
  name: string;
  phone: string;
  email: string;
  passcode: string;
  confirmPasscode: string;
  termsAccepted: boolean;
  stateName: string;
}

const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:'",.<>/?|\\~`]+$/,
      'Username can contain letters, numbers and special characters',
    )
    .required('*Username is required')
    .test('no-spaces', 'Username cannot contain spaces', value => {
      if (!value) return true;
      return !value.includes(' ');
    })
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .trim(),
  phone: Yup.string()
    .matches(/^\d{10}$/, '*Phone number must be 10 digits')
    .required('*Phone number is required'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '*Invalid email format',
    )
    .required('*Email is required'),
  passcode: Yup.string()
    .length(6, '*Passcode must be exactly 6 characters')
    .required('*Passcode is required'),
  confirmPasscode: Yup.string()
    .oneOf([Yup.ref('passcode')], '*Passcodes must match')
    .required('*Confirm Passcode is required'),
  termsAccepted: Yup.boolean().oneOf(
    [true],
    '*You must accept the terms and conditions',
  ),
  stateName: Yup.string().required('*State name is required'),
});

interface RegisterScreenState {
  nameFocused: boolean;
  emailFocused: boolean;
  stateName: string;
}

class RegisterScreen extends Component<{}, RegisterScreenState> {
  state: RegisterScreenState = {
    nameFocused: false,
    emailFocused: false,
    stateName: '',
  };

  setValue = (value: string) => {
    this.setState({stateName: value});
  };

  renderItem = (item: {label: string; value: string}) => {
    return <Text style={styles.textItem}>{item.value}</Text>;
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <Formik<RegisterFormValues>
          initialValues={{
            name: '',
            phone: '',
            email: '',
            passcode: '',
            confirmPasscode: '',
            termsAccepted: false,
            stateName: '',
          }}
          validationSchema={RegisterValidationSchema}
          onSubmit={values => console.log('Form Data:', values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.container}>
              <ImageBackground source={registerTopImg} style={styles.topImg}>
                <View style={styles.textCont}>
                  <TouchableOpacity onPress={() => console.log('Go Back')}>
                    <Entypo
                      name="chevron-small-left"
                      style={styles.leftArrow}
                      size={35}
                    />
                  </TouchableOpacity>
                  <Text style={styles.registerTxt}>Register</Text>
                </View>
              </ImageBackground>

              <View style={styles.paddingContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={colors.black}
                    value={values.name}
                    onChangeText={text =>
                      handleChange('name')(text.replace(/\s/g, ''))
                    }
                    onBlur={handleBlur('name')}
                  />
                  <Image style={styles.icon} source={personImg} />
                  {!this.state.nameFocused && values.name === '' && (
                    <Text style={styles.placeholder}>Name</Text>
                  )}
                </View>
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
                <PhoneInputField
                  name="phone"
                  onChangePhone={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  errors={errors}
                  touched={touched}
                />
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={colors.black}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  <Image style={styles.icon} source={emailIconImg} />
                  {!this.state.emailFocused && values.email === '' && (
                    <Text style={styles.placeholder}>Email Id</Text>
                  )}
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <View>
                  <Text style={styles.passcodeText}>Passcode</Text>
                  <OtpInput
                    numberOfDigits={6}
                    focusColor="green"
                    secureTextEntry={true}
                    onFilled={text => setFieldValue('passcode', text)}
                    theme={{
                      containerStyle: styles.otpContainer,
                      pinCodeContainerStyle: styles.pinCodeBox,
                      pinCodeTextStyle: styles.otpText,
                    }}
                  />
                </View>
                {touched.passcode && errors.passcode && (
                  <Text style={styles.errorText}>{errors.passcode}</Text>
                )}
                <View>
                  <Text style={styles.passcodeText}>Confirm Passcode</Text>
                  <OtpInput
                    numberOfDigits={6}
                    focusColor="green"
                    secureTextEntry={true}
                    onFilled={text => setFieldValue('confirmPasscode', text)}
                    theme={{
                      containerStyle: styles.otpContainer,
                      pinCodeContainerStyle: styles.pinCodeBox,
                      pinCodeTextStyle: styles.otpText,
                    }}
                  />
                </View>
                {touched.confirmPasscode && errors.confirmPasscode && (
                  <Text style={styles.errorText}>{errors.confirmPasscode}</Text>
                )}
                <Dropdown
                  value={this.state.stateName}
                  onChange={item => this.setValue(item.value)}
                  iconStyle={styles.iconStyle}
                  data={statesData.map(state => ({
                    label: state.name,
                    value: state.name,
                  }))}
                  search
                  minHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder="State"
                  searchPlaceholder="Search..."
                  renderItem={this.renderItem}
                  style={styles.dropDown}
                />
                {touched.stateName && errors.stateName && (
                  <Text style={styles.errorText}>{errors.stateName}</Text>
                )}
                <View style={styles.termsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.checkbox,
                      values.termsAccepted && styles.activeCheckbox,
                    ]}
                    onPress={() =>
                      setFieldValue('termsAccepted', !values.termsAccepted)
                    }>
                    {values.termsAccepted && (
                      <FeatherIcon name="check" color="#fff" size={15} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.termsText}>Agree Terms & Conditions</Text>
                </View>
                {touched.termsAccepted && errors.termsAccepted && (
                  <Text style={[styles.errorText, {marginTop: -20}]}>
                    {errors.termsAccepted}
                  </Text>
                )}
                <CustomButton title="REGISTER NOW" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  email: state.auth.email,
  apiStatus: state.auth.apiStatus,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  // sendOtp: (email: string) => dispatch(sendingOtp(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);



const styles = StyleSheet.create({
  scrollView: {flex: 1, backgroundColor: "#fff"},

  container: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  topImg: {
    height: responsiveHeight(20),
    width: '100%',
    position: 'relative',
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
  registerTxt: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
    fontFamily: fonts.bai.medium,
  },
  paddingContainer: {
    padding: 20,
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.greyColor,
    borderBottomWidth: 2,
    paddingBottom: 7,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    height: 43,
    borderColor: '#ccc',
    borderWidth: 0,
    fontSize: 17,
    color: colors.black,
  },
  icon: {
    marginLeft: 8,
    width: 22,
    height: 22,
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: colors.black,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

  placeholder: {
    position: 'absolute',
    left: 19,
    top: 10,
    color: colors.black,
    fontFamily: fonts.montserrat.extraBold,
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 28,
  },
  passcodeText: {
    fontFamily: fonts.montserrat.bold,
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
    marginTop: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
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
    marginTop: -10,
    fontSize: 16,
    color: colors.red,
    alignSelf: 'flex-end',
    fontWeight: '600',
    fontFamily: fonts.montserrat.medium,
  },

  dropDown: {
    height: 50,
    borderBottomColor: colors.greyColor,
    borderBottomWidth: 2,
    paddingHorizontal: 15,
    marginTop: 10,
  },

  placeholderStyle: {
    fontFamily: fonts.montserrat.bold,
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },

  selectedTextStyle: {
    fontSize: 16,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  textItem: {
    fontSize: 16,
    marginLeft: 10,
  },

  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 370,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderColor: '#D9D9D9',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    backgroundColor: '#fff',
  },

  activeCheckbox: {
    backgroundColor: colors.red,
    borderWidth: 0,
  },

  termsText: {
    fontSize: 18,
    marginLeft: 8,
    color: '#343A40',
    fontWeight: '600',
    fontFamily: fonts.montserrat.bold,
    lineHeight: 30,
  },

  errorText: {
    color: colors.red,
    fontSize: 11,
    marginLeft: 0,
    marginTop: 4,
  },
});