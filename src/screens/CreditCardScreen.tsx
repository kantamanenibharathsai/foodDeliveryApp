import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SuccessModal from '../components/OrderSuccessful';

interface FormValues {
  cardNumber: string;
  expiryDate: string;
  cvcCode: string;
  cardHolderName: string;
}

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

interface State {
  isModalVisible: boolean;
}

const validationSchema = Yup.object({
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, '* Card number must be 16 digits')
    .required('* Card number is required'),
  expiryDate: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      '* Expiry date must be in MM/YY format',
    )
    .required('* Expiry date is required'),
  cvcCode: Yup.string()
    .matches(/^\d{3}$/, '* CVC code must be 3 digits')
    .required('* CVC code is required'),
  cardHolderName: Yup.string()
    .min(3, '* Name must be at least 3 characters')
    .required('* Card holder name is required'),
});

class CreditCardScreen extends Component<Props, State> {
  state = {
    isModalVisible: false,
  };

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  handlePayNow = (values: FormValues) => {
    // console.log('Payment Details:', values);
    this.setState({isModalVisible: true});
  };

  closeModal = () => {
    this.setState({isModalVisible: false});
  };

  componentDidUpdate(_: any, prevState: any) {
    if (prevState.isModalVisible !== this.state.isModalVisible) {
      console.log('Modal visibility changed:', this.state.isModalVisible);
    }
  }

  render() {
    const {isModalVisible} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
          barStyle={'dark-content'}
        />
        <View style={styles.creditCardHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.creditCardText}>Credit Card</Text>
        </View>
        <View style={styles.bodyCont}>
          <Formik
            initialValues={{
              cardNumber: '',
              expiryDate: '',
              cvcCode: '',
              cardHolderName: '',
            }}
            validationSchema={validationSchema}
            onSubmit={this.handlePayNow}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.form}>
                <View>
                  <Text style={styles.label}>Card Number</Text>
                  <TextInput
                    style={[
                      styles.input,
                      touched.cardNumber && errors.cardNumber
                        ? styles.errorInput
                        : {},
                    ]}
                    placeholder="XXXX XXXX XXXX XXXX"
                    placeholderTextColor="#A9A9A9"
                    keyboardType="numeric"
                    maxLength={16}
                    onChangeText={handleChange('cardNumber')}
                    onBlur={handleBlur('cardNumber')}
                    value={values.cardNumber}
                  />
                  {touched.cardNumber && errors.cardNumber && (
                    <Text style={styles.errorText}>{errors.cardNumber}</Text>
                  )}
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.label}>Expire</Text>
                      <TextInput
                        style={[
                          styles.input,
                          touched.expiryDate && errors.expiryDate
                            ? styles.errorInput
                            : {},
                        ]}
                        placeholder="MM/YY"
                        placeholderTextColor="#A9A9A9"
                        keyboardType="numeric"
                        maxLength={5}
                        onChangeText={handleChange('expiryDate')}
                        onBlur={handleBlur('expiryDate')}
                        value={values.expiryDate}
                      />
                      {touched.expiryDate && errors.expiryDate && (
                        <Text style={styles.errorText}>
                          {errors.expiryDate}
                        </Text>
                      )}
                    </View>

                    <View style={styles.column}>
                      <Text style={styles.label}>CVC Code</Text>
                      <TextInput
                        style={[
                          styles.input,
                          touched.cvcCode && errors.cvcCode
                            ? styles.errorInput
                            : {},
                        ]}
                        placeholder="XXX"
                        placeholderTextColor="#A9A9A9"
                        keyboardType="numeric"
                        maxLength={3}
                        onChangeText={handleChange('cvcCode')}
                        onBlur={handleBlur('cvcCode')}
                        value={values.cvcCode}
                      />
                      {touched.cvcCode && errors.cvcCode && (
                        <Text style={styles.errorText}>{errors.cvcCode}</Text>
                      )}
                    </View>
                  </View>
                  <Text style={styles.label}>Card Holder Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      touched.cardHolderName && errors.cardHolderName
                        ? styles.errorInput
                        : {},
                    ]}
                    placeholder="Rajesh Singh"
                    placeholderTextColor="#A9A9A9"
                    onChangeText={handleChange('cardHolderName')}
                    onBlur={handleBlur('cardHolderName')}
                    value={values.cardHolderName}
                  />
                  {touched.cardHolderName && errors.cardHolderName && (
                    <Text style={styles.errorText}>
                      {errors.cardHolderName}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.buttonText}>PAY NOW</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
    <SuccessModal/>
      </View>
    );
  }
}

export default CreditCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  creditCardHeader: {
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? '#F5ECE2' : '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 1,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    marginTop: 10,
    marginLeft: 5,
  },

  creditCardText: {
    fontSize: responsiveFontSize(2.3),
    marginTop: 10,
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    marginLeft: 4,
  },

  bodyCont: {
    flex: 1,
    backgroundColor: '#F6f6f6',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2.5),
    gap: 20,
    justifyContent: 'space-between',
  },

  form: {
    flex: 1,
    justifyContent: 'space-between',
  },

  label: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: fonts.montserrat.bold,
    color: colors.black,
    marginBottom: 8,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    fontSize: responsiveFontSize(1.6),
    color: colors.black,
    marginBottom: 11,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: responsiveFontSize(1.2),
    color: colors.red,
    fontFamily: fonts.montserrat.medium,
    marginTop: -3,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 0.48,
  },
  buttonContainer: {
    width: 375,
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
  buttonText: {
    color: '#FFFFFF',
    fontFamily: fonts.bai.black,
    textTransform: 'uppercase',
    fontSize: responsiveFontSize(2.3),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  modalIcon: {
    width: 70,
    height: 70,
    backgroundColor: colors.green,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalText: {
    fontSize: responsiveFontSize(2),
    color: colors.black,
    fontFamily: fonts.montserrat.bold,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: colors.green,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(1.8),
    fontFamily: fonts.montserrat.medium,
  },
});
