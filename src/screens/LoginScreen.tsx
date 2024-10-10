// import React, {Component, createRef} from 'react';
// import {
//   Text,
//   StyleSheet,
//   View,
//   ImageBackground,
//   Image,
//   TextInput,
// } from 'react-native';
// import {loginFoodPlateBg, loginRedBg} from '../assets';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import {colors} from '../utils/Colors';
// import {fonts} from '../constants/fonts';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import PhoneInputField from '../components/PhoneInputField';

// const validationSchema = Yup.object().shape({
//   phone: Yup.string()
//     .required('*Phone number is required')
//     .matches(
//       /^\d{10,15}$/,
//       '*Phone number must contain only digits and be between 10 to 15 digits',
//     ),
// });

// interface State {
//   otp: string[];
//   maskedOtp: string[];
//   activeIndex: number | null; // Track the active input index
// }

// class LoginScreen extends Component<{}, State> {
//   otpInputs: Array<React.RefObject<TextInput>>;

//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       otp: Array(6).fill(''), // Holds the actual OTP values
//       maskedOtp: Array(6).fill(''), // Holds the masked values
//       activeIndex: null, // Initially, no input is active
//     };
//     this.otpInputs = Array(6)
//       .fill(null)
//       .map(() => createRef<TextInput>());
//   }

//   handleOtpChange = (index: number, value: string) => {
//     if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 1) {
//       const otpCopy = [...this.state.otp];
//       const maskedOtpCopy = [...this.state.maskedOtp];

//       // Update the actual input value
//       otpCopy[index] = value;
//       maskedOtpCopy[index] = value; // Show the entered digit briefly

//       this.setState({otp: otpCopy, maskedOtp: maskedOtpCopy}, () => {
//         // Shift focus to the next input field if there is one and the input is not empty
//         if (index < this.otpInputs.length - 1 && value) {
//           this.otpInputs[index + 1].current?.focus();
//         }
//       });

//       // Mask the digit after a brief moment
//       setTimeout(() => {
//         maskedOtpCopy[index] = '*'; // Mask with an asterisk
//         this.setState({maskedOtp: maskedOtpCopy});
//       }, 300); // Adjust delay here
//     }
//   };

//   handleFocus = (index: number) => {
//     const otpCopy = [...this.state.otp];
//     otpCopy[index] = ''; // Clear the value when focused
//     this.setState({otp: otpCopy, activeIndex: index}); // Update the state to clear the input and set active index
//   };

//   handleBlur = () => {
//     this.setState({activeIndex: null}); // Reset active index on blur
//   };

//   handleKeyPress = (index: number, key: string) => {
//     const otpCopy = [...this.state.otp];

//     if (key === 'Backspace') {
//       // Clear the current input
//       otpCopy[index] = ''; // Clear the current input
//       this.setState({otp: otpCopy}, () => {
//         // Move focus to the previous input field if it exists
//         if (index > 0) {
//           this.otpInputs[index - 1].current?.focus();
//         }
//       });
//     } else if (key.length === 1) {
//       // If a character is entered and it's not a backspace
//       if (index < this.otpInputs.length - 1) {
//         // Move focus to the next input field
//         this.otpInputs[index + 1].current?.focus();
//       }
//     }
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <ImageBackground source={loginRedBg} style={styles.backgroundRedImg}>
//           <View style={styles.textCont}>
//             <Text style={styles.loginText}>Login</Text>
//             <Text style={styles.welcomeText}>Welcome Back!</Text>
//           </View>
//           <Image style={styles.foodPlateImg} source={loginFoodPlateBg} />
//         </ImageBackground>

//         <View style={styles.belowContainer}>
//           <Formik
//             initialValues={{phone: ''}}
//             validationSchema={validationSchema}
//             onSubmit={values => {
//               console.log('Form submitted:', values);
//             }}>
//             {({
//               handleChange,
//               handleBlur,
//               handleSubmit,
//               values,
//               errors,
//               touched,
//             }) => (
//               <View>
//                 <PhoneInputField
//                   onChangePhone={handleChange('phone')}
//                   onBlur={handleBlur('phone')}
//                   value={values.phone}
//                   name="mobile no"
//                   errors={errors}
//                   touched={touched}
//                 />
//                 {touched.phone && errors.phone ? (
//                   <Text style={styles.errorText}>{errors.phone}</Text>
//                 ) : null}
//               </View>
//             )}
//           </Formik>

//           <Text style={styles.passcodeText}>Passcode</Text>

//           <View style={styles.otpInputRow}>
//             {Array.from({length: 6}).map((_, index) => (
//               <TextInput
//                 key={index}
//                 ref={this.otpInputs[index]}
//                 style={[
//                   styles.otpInput,
//                   this.state.activeIndex === index && styles.activeInput, // Apply active input style
//                 ]}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 onChangeText={text => this.handleOtpChange(index, text)}
//                 onFocus={() => this.handleFocus(index)}
//                 onBlur={this.handleBlur} // Reset active index on blur
//                 onKeyPress={({nativeEvent}) =>
//                   this.handleKeyPress(index, nativeEvent.key)
//                 }
//                 value={this.state.maskedOtp[index]} // Display masked value
//               />
//             ))}
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundRedImg: {
//     height: responsiveHeight(50),
//     width: '100%',
//     position: 'relative',
//   },
//   textCont: {
//     position: 'absolute',
//     bottom: 50,
//     left: 18,
//   },
//   loginText: {
//     fontSize: 45,
//     fontWeight: '700',
//     color: colors.white,
//     lineHeight: 56,
//     fontFamily: fonts.bai.light,
//   },
//   welcomeText: {
//     fontSize: 22,
//     fontWeight: '500',
//     color: colors.white,
//     lineHeight: 27.5,
//     fontFamily: fonts.bai.light,
//   },
//   foodPlateImg: {
//     position: 'absolute',
//     bottom: 10,
//     right: 0,
//     top: 80,
//     width: responsiveWidth(60),
//     height: responsiveHeight(50),
//   },
//   belowContainer: {
//     paddingHorizontal: 20,
//   },
//   errorText: {
//     fontSize: 14,
//     color: 'red',
//     marginTop: 5,
//     marginLeft: 20,
//   },
//   passcodeText: {
//     fontFamily: fonts.montserrat.bold,
//     fontSize: 16,
//     color: colors.black,
//     fontWeight: '600',
//     marginTop: 10,
//   },
//   otpInputRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   otpInput: {
//     width: 52,
//     height: 68,
//     borderWidth: 2,
//     borderRadius: 10,
//     borderColor: '#E8E8E8',
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//     fontSize: 24,
//     color: '#161A1D', // Show the actual input briefly
//   },
//   activeInput: {
//     borderColor: 'green', // Change border color to green for the active input
//   },
// });

// export default LoginScreen;
import React, {Component} from 'react';
import {Text, StyleSheet, View, ImageBackground, Image} from 'react-native';
import {loginFoodPlateBg, loginRedBg} from '../assets';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PhoneInputField from '../components/PhoneInputField';
import {OtpInput} from 'react-native-otp-entry';

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required('*Phone number is required')
    .matches(
      /^\d{10,15}$/,
      '*Phone number must contain only digits and be between 10 to 15 digits',
    ),
});

class LoginScreen extends Component {
  constructor(props : any) {
    super(props);
    this.state = {
      otp: '',
      maskTimer: null,
    };
  }

  // handleOtpChange = text => {
  //   // Clear any existing timer
  //   if (this.state.maskTimer) {
  //     clearTimeout(this.state.maskTimer);
  //   }

  //   // Update OTP
  //   this.setState({otp: text});

  //   // Set a timer to mask the input
  //   const timer = setTimeout(() => {
  //     this.setState({otp: '*'.repeat(text.length)}); // Mask with asterisks
  //   }, 300); // Change this value for the delay

  //   this.setState({maskTimer: timer});
  // };

  render() {
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
          <Formik
            initialValues={{phone: ''}}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log('Form submitted:', values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <PhoneInputField
                  onChangePhone={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  name="mobile no"
                  errors={errors}
                  touched={touched}
                />
                {touched.phone && errors.phone ? (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                ) : null}
              </View>
            )}
          </Formik>

          <Text style={styles.passcodeText}>Passcode</Text>

          <OtpInput
            numberOfDigits={6}
            focusColor="green"
            secureTextEntry={true} // Use true to enforce asterisk display
            // onTextChange={this.handleOtpChange} // Custom handler
            onFilled={text => console.log(`OTP complete: ${text}`)}
            // value={this.state.otp} // Bind to the state for dynamic updates
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              containerStyle: styles.otpContainer,
              pinCodeContainerStyle: styles.pinCodeBox,
              pinCodeTextStyle: styles.otpText,
              focusStickStyle: styles.focusStick,
              focusedPinCodeContainerStyle: styles.activePinCodeBox,
            }}
          />
        </View>
      </View>
    );
  }
}

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
    fontSize: 14,
    color: 'red',
    marginTop: 5,
    marginLeft: 20,
  },
  passcodeText: {
    fontFamily: fonts.montserrat.bold,
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
    marginTop: 10,
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
});

export default LoginScreen;
