import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {OtpInput} from 'react-native-otp-entry';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {cameraImg, emailIconImg, personImg} from '../assets';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

interface EditProfileScreenState {
  nameFocused: boolean;
  phoneNumberFocused: boolean;
  emailFocused: boolean;
  isLoading: boolean;
  resourcePath: ImagePickerResponse | null;
}

interface EditFormValues {
  name: string;
  phone: string;
  email: string;
  oldPasscode: string;
  newPasscode: string;
  confirmPasscode: string;
}

const EditScreenValidationSchema = Yup.object().shape({
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
    .email('*Invalid email format')
    .required('*Email is required')
    .test('no-spaces', 'Email cannot contain spaces', value => {
      if (!value) return true;
      return !value.includes(' ');
    })
    .transform(value => value?.replace(/\s/g, ''))
    .trim(),

  oldPasscode: Yup.string()
    .length(6, '*Passcode must be exactly 6 characters')
    .required('*Old passcode is required'),

  newPasscode: Yup.string()
    .length(6, '*Passcode must be exactly 6 characters')
    .required('*New passcode is required'),

  confirmPasscode: Yup.string()
    .oneOf([Yup.ref('newPasscode')], '*Passcodes must match')
    .required('*Confirm passcode is required'),
});

class EditProfileScreen extends React.Component<Props, EditProfileScreenState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nameFocused: false,
      phoneNumberFocused: false,
      emailFocused: false,
      isLoading: false,
      resourcePath: null,
    };
  }

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  handleFormSubmit = async (values: EditFormValues) => {
    this.setState({isLoading: true});
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form Data:', values);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.setState({isLoading: false});
    }
  };

  openImagePicker = (
    setFieldValue: (field: string, value: any) => void,
    setFieldError: (field: string, value?: string | undefined) => void,
  ) => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        if (asset.uri) {
          this.setState({resourcePath: {assets: [asset]}});
          setFieldValue('image', asset.uri);
          setFieldError('image', undefined);
        } else {
          console.error('Image URI is not available');
        }
      }
    });
  };

  render() {
    const {isLoading, resourcePath} = this.state;

    return (
      <View style={styles.mainCont}>
        <View style={styles.editProfileHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={26} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </View>
        <ScrollView>
          <View style={styles.bodyCont}>
            <View style={styles.imgCamCont}>
              <View style={styles.imgCont}>
                <Image
                  source={
                    resourcePath &&
                    resourcePath.assets &&
                    resourcePath.assets[0]?.uri
                      ? {uri: resourcePath.assets[0].uri}
                      : {
                          uri: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600',
                        }
                  }
                  resizeMode="cover"
                  style={styles.profileImg}
                />
              </View>
              <TouchableOpacity
                style={styles.camCont}
                onPress={() =>
                  this.openImagePicker(
                    (field, value) => {},
                    (field, error) => {},
                  )
                }>
                <Image source={cameraImg} style={styles.cameraImg} />
              </TouchableOpacity>
            </View>
            <Formik<EditFormValues>
              initialValues={{
                name: '',
                phone: '',
                email: '',
                oldPasscode: '',
                newPasscode: '',
                confirmPasscode: '',
              }}
              validationSchema={EditScreenValidationSchema}
              onSubmit={this.handleFormSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.paddingContainer}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={values.name}
                      onChangeText={text =>
                        handleChange('name')(text.replace(/\s/g, ''))
                      }
                      onBlur={handleBlur('name')}
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <Image style={styles.icon} source={personImg} />
                    {!this.state.nameFocused && values.name === '' && (
                      <Text style={styles.placeholder}>Name</Text>
                    )}
                  </View>
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      maxLength={10}
                    />
                    <FontAwesome
                      size={20}
                      name={'phone'}
                      color={colors.lightTextColor}
                    />
                    {!this.state.phoneNumberFocused && values.phone === '' && (
                      <Text style={styles.placeholder}>Mobile No</Text>
                    )}
                  </View>
                  {touched.phone && errors.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={values.email}
                      onChangeText={text =>
                        handleChange('email')(text.replace(/\s/g, ''))
                      }
                      onBlur={handleBlur('email')}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    <Image style={styles.icon} source={emailIconImg} />
                    {!this.state.emailFocused && values.email === '' && (
                      <Text style={styles.placeholder}>Email Id</Text>
                    )}
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <Text style={styles.passcodeText}>Old Passcode</Text>
                  <OtpInput
                    numberOfDigits={6}
                    onFilled={text => handleChange('oldPasscode')(text)}
                    focusColor="green"
                    secureTextEntry={true}
                    theme={{
                      containerStyle: styles.otpContainer,
                      pinCodeContainerStyle: styles.pinCodeBox,
                      pinCodeTextStyle: styles.otpText,
                    }}
                  />
                  {touched.oldPasscode && errors.oldPasscode && (
                    <Text style={styles.passcodeErrorTxt}>
                      {errors.oldPasscode}
                    </Text>
                  )}
                  <Text style={[styles.passcodeText, {marginTop: 15}]}>
                    New Passcode
                  </Text>
                  <OtpInput
                    numberOfDigits={6}
                    onFilled={text => handleChange('newPasscode')(text)}
                    focusColor="green"
                    secureTextEntry={true}
                    theme={{
                      containerStyle: styles.otpContainer,
                      pinCodeContainerStyle: styles.pinCodeBox,
                      pinCodeTextStyle: styles.otpText,
                    }}
                  />
                  {touched.newPasscode && errors.newPasscode && (
                    <Text style={styles.passcodeErrorTxt}>
                      {errors.newPasscode}
                    </Text>
                  )}
                  <Text style={[styles.passcodeText, {marginTop: 15}]}>
                    Confirm Passcode
                  </Text>
                  <OtpInput
                    numberOfDigits={6}
                    onFilled={text => handleChange('confirmPasscode')(text)}
                    focusColor="green"
                    secureTextEntry={true}
                    theme={{
                      containerStyle: styles.otpContainer,
                      pinCodeContainerStyle: styles.pinCodeBox,
                      pinCodeTextStyle: styles.otpText,
                    }}
                  />
                  {touched.confirmPasscode && errors.confirmPasscode && (
                    <Text style={styles.passcodeErrorTxt}>
                      {errors.confirmPasscode}
                    </Text>
                  )}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      activeOpacity={0.7}
                      disabled={isLoading}>
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <Text style={styles.buttonText}>Save Profile</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  mainCont: {flex: 1, backgroundColor: colors.white},
  editProfileHeader: {
    backgroundColor: colors.white,
    shadowColor: Platform.OS === 'ios' ? '#F5ECE2' : '#000',
    shadowOffset: {width: 3, height: 0},
    shadowOpacity: 1.8,
    shadowRadius: 4,
    elevation: 10,
    height: 98,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  leftIcon: {
    marginTop: 42,
    marginLeft: responsiveWidth(4),
  },

  editProfileText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    marginLeft: 4,
    marginTop: 42,
  },
  bodyCont: {
    backgroundColor: colors.white,
    paddingHorizontal: responsiveWidth(0.3),
  },
  imgCamCont: {position: 'relative', alignSelf: 'center'},
  imgCont: {
    height: 140,
    width: 140,
    backgroundColor: colors.white,
    borderRadius: 160,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {height: 130, width: 130, borderRadius: 160},
  camCont: {
    position: 'absolute',
    bottom: 10,
    right: -20,
    height: 58,
    width: 58,
    backgroundColor: colors.white,
    borderRadius: 40,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Platform.OS === 'ios' ? '#F5ECE2' : '#000',
    shadowOffset: {width: 3, height: 0},
    shadowOpacity: 1.8,
    shadowRadius: 4,
  },
  cameraImg: {width: 21, height: 19},
  paddingContainer: {padding: 20},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.greyColor,
    borderBottomWidth: 2,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  input: {flex: 1, height: 43, fontSize: 17, color: colors.black},
  icon: {marginLeft: 8, width: 22, height: 22},
  errorText: {color: colors.red, fontSize: 11, marginTop: -7},
  passcodeErrorTxt: {
    color: colors.red,
    fontSize: 11,
    marginTop: 9,
  },
  placeholder: {
    position: 'absolute',
    left: 16,
    top: 14,
    color: colors.black,
    fontFamily: fonts.montserrat.medium,
    fontSize: responsiveFontSize(1.9),
  },
  passcodeText: {
    fontFamily: fonts.montserrat.bold,
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
    marginBottom: 0,
  },
  buttonContainer: {
    width: 385,
    height: 75,
    alignSelf: 'center',
    borderRadius: 60,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    marginTop: 30,
    shadowColor: '#94CD00',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 12,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: fonts.bai.black,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: responsiveFontSize(2),
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
});
