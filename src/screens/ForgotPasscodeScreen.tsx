import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  forgotPasscodeImg,
  phoneIcon,
  questionMarkImg,
} from '../assets/index.ts';
import CustomButton from '../components/Button.tsx';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import KeyboardWrapper from '../components/KeyboardWrapper.tsx';

const validationSchema = Yup.object().shape({
  mobileNo: Yup.string()
    .matches(/^[0-9]{9,10}$/, '*Invalid mobile number')
    .required('*Mobile number is required'),
});

interface FormValues {
  mobileNo: string;
}

interface ForgotPasscodeScreenState {
  initialValues: FormValues;
}

class ForgotPasscodeScreen extends Component<{}, ForgotPasscodeScreenState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      initialValues: {
        mobileNo: '',
      },
    };
  }

  handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  render() {
    return (
      <KeyboardWrapper>
        <View style={styles.container}>
          <ImageBackground source={forgotPasscodeImg} style={styles.topImg}>
            <View style={styles.textCont}>
              <TouchableOpacity onPress={() => console.log('Go Back')}>
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
            onSubmit={this.handleSubmit}>
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched,
              isSubmitting,
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
                        placeholder="987654321"
                        placeholderTextColor={colors.greyColor}
                        onChangeText={handleChange('mobileNo')}
                        onBlur={handleBlur('mobileNo')}
                        value={values.mobileNo}
                        keyboardType="numeric"
                      />
                      <Image source={phoneIcon} style={styles.inputIcon} />
                    </View>
                    {errors.mobileNo && touched.mobileNo && (
                      <Text style={styles.errorTxt}>{errors.mobileNo}</Text>
                    )}
                  </View>
                </View>
                <CustomButton
                  title={'SEND OTP'}
                  onPress={() => handleSubmit()}
                  //   disabled={isSubmitting}
                />
              </View>
            )}
          </Formik>
        </View>
      </KeyboardWrapper>
    );
  }
}

export default ForgotPasscodeScreen;

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
});
