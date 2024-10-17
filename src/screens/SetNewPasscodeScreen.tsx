import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {otpEmailImg, registerTopImg} from '../assets';
import Entypo from 'react-native-vector-icons/Entypo';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {OtpInput} from 'react-native-otp-entry';
import CustomButton from '../components/Button';
import KeyboardWrapper from '../components/KeyboardWrapper';

// Type definitions for props and state
interface Props {}

interface State {
  inputs: {
    passcode: string;
    confirmPasscode: string;
  };
  errors: {
    passcode?: string;
    confirmPasscode?: string;
  };
  isSubmitted: boolean;
}

class SetNewPasscodeScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputs: {
        passcode: '',
        confirmPasscode: '',
      },
      errors: {},
      isSubmitted: false,
    };
  }

  handleInputChange = (field: keyof State['inputs'], value: string) => {
    // console.log(field, value);
    if (value === '' && field === 'confirmPasscode') {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [field]: '*Confirm Passcode is required',
        },
      }));
    } else if (value.length === 6 && field === 'confirmPasscode') {
      this.setState(prevState => ({
        inputs: {
          ...prevState.inputs,
          [field]: value,
        },
        errors: {
          ...prevState.errors,
          [field]: '',
        },
      }));
    } else if (value === '' && field === 'passcode') {
      this.setState(prevState => ({
        
        errors: {
          ...prevState.errors,
          [field]: '*Passcode is required',
        },
      }));
    } else if (value.length === 6 && field === 'passcode') {
      this.setState(prevState => ({
        inputs: {
          ...prevState.inputs,
          [field]: value,
        },
        errors: {
          ...prevState.errors,
          [field]: '',
        },
      }));
    } else {
      console.log(this.state.inputs.passcode, value, "this.state.inputs.passcode.else.block");
      this.setState(
        prevState => ({
          inputs: {
            ...prevState.inputs,
            [field]: value,
          },
          isSubmitted: false,
        }),
        () => {
          // console.log('else', this.state.inputs.passcode, 'value', value);
        },
      );
    }
  };

  validateField = (field: keyof State['inputs']) => {
    const {passcode, confirmPasscode} = this.state.inputs;
    // console.log("passocode", passcode, confirmPasscode)
    let errors: State['errors'] = {...this.state.errors};
    if (field === 'passcode') {
      if (passcode.length === 6) {
        errors.passcode = '';
      } else if (passcode.length === 0) {
        errors.passcode = '*Passcode is required';
      } else if (passcode.length !== 6) {
        errors.passcode = '*Passcode must be exactly 6 characters';
      } else {
        delete errors.passcode;
      }
    }
    if (field === 'confirmPasscode') {
      if (confirmPasscode.length === 6) {
        errors.confirmPasscode = '';
      } else if (confirmPasscode.length === 0) {
        errors.confirmPasscode = '*Confirm Passcode is required';
      } else if (confirmPasscode !== passcode) {
        errors.confirmPasscode = '*Passcodes must match';
      } else {
        delete errors.confirmPasscode;
      }
    }

    this.setState({errors});
  };

  validateInputs = (): boolean => {
    const {passcode, confirmPasscode} = this.state.inputs;
    let errors: State['errors'] = {};
    if (!passcode) {
      errors.passcode = '*Passcode is required';
    } else if (passcode.length !== 6) {
      errors.passcode = '*Passcode must be exactly 6 characters';
    }
    if (!confirmPasscode) {
      errors.confirmPasscode = '*Confirm Passcode is required';
    } else if (passcode.length !== 6) {
      errors.passcode = '*Confirm Passcode must be exactly 6 characters';
    } else if (confirmPasscode !== passcode) {
      errors.confirmPasscode = '*Passcodes must match';
    }
    this.setState({errors});
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  handleSubmit = () => {
    // console.log(this.state.inputs.passcode, "this.state.inputs.Passcode");
    if (this.validateInputs()) {
      this.setState({isSubmitted: true, errors: {}});
      Alert.alert('Success', 'Passcode set successfully.');
    }
    else {
      this.setState({isSubmitted: false, errors: {}});
      Alert.alert('Error', 'Please fill in all required fields correctly.');
    }
  };

  render() {
    const {errors, isSubmitted} = this.state;

    return (
      <KeyboardWrapper>
        <View style={styles.container}>
          <View>
            <ImageBackground source={registerTopImg} style={styles.topImg}>
              <View style={styles.textCont}>
                <TouchableOpacity onPress={() => console.log('Go Back')}>
                  <Entypo
                    name="chevron-small-left"
                    style={styles.leftArrow}
                    size={35}
                  />
                </TouchableOpacity>
                <Text style={styles.setNewPassTxt}>Set New Passcode</Text>
              </View>
            </ImageBackground>

            <View style={styles.paddingContainer}>
              <View>
                <Text style={styles.passcodeText}>New Passcode</Text>
                <OtpInput
                  numberOfDigits={6}
                  focusColor="green"
                  secureTextEntry={false}
                  // onFilled={(text: string) =>
                  //   this.handleInputChange('passcode', text)
                  // }
                  onTextChange={(text: string) => {
                    this.handleInputChange('passcode', text);
                  }}
                  onBlur={() => this.validateField('passcode')}
                  theme={{
                    containerStyle: styles.otpContainer,
                    pinCodeContainerStyle: styles.pinCodeBox,
                    pinCodeTextStyle: styles.otpText,
                  }}
                />
                {(!isSubmitted || errors.passcode) && (
                  <Text style={styles.errorText}>{errors.passcode}</Text>
                )}
              </View>
              <View>
                <Text style={styles.passcodeText}>Confirm Passcode</Text>
                <OtpInput
                  numberOfDigits={6}
                  focusColor="green"
                  secureTextEntry={false}
                  onTextChange={(text: string) => {
                    this.handleInputChange('confirmPasscode', text);
                  }}
                  // onFilled={(text: string) =>
                  //   this.handleInputChange('confirmPasscode', text)
                  // }
                  onBlur={() => this.validateField('confirmPasscode')}
                  theme={{
                    containerStyle: styles.otpContainer,
                    pinCodeContainerStyle: styles.pinCodeBox,
                    pinCodeTextStyle: styles.otpText,
                  }}
                />
                {(!isSubmitted || errors.confirmPasscode) && (
                  <Text style={styles.errorText}>{errors.confirmPasscode}</Text>
                )}
              </View>
            </View>
          </View>
          <CustomButton title="SET PASSCODE" onPress={this.handleSubmit} />
        </View>
      </KeyboardWrapper>
    );
  }
}

export default SetNewPasscodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingBottom: responsiveHeight(3.7),
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
  setNewPassTxt: {
    fontSize: 23,
    fontWeight: '700',
    color: colors.white,
    fontFamily: fonts.bai.medium,
  },
  paddingContainer: {
    padding: 20,
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
  otpText: {
    fontSize: 24,
    color: '#161A1D',
  },
  errorText: {
    color: colors.red,
    fontSize: 11,
    marginTop: 4,
  },
});
