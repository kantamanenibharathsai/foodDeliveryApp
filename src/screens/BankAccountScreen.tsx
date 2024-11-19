import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {sbiLogoImg} from '../assets';

const validationSchema = Yup.object().shape({
  accountHolderName: Yup.string().required('*Account Holder Name is required'),
  accountNumber: Yup.string()
    .required('*Account Number is required')
    .matches(/^\d{9,18}$/, '*Invalid Account Number'),
  ifscCode: Yup.string()
    .required('*IFSC Code is required')
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, '*Invalid IFSC Code'),
  bankName: Yup.string().required('*Bank Name is required'),
});

interface FormValues {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const bankOptions = [
  {label: 'State Bank of India', value: 'SBI'},
  {label: 'HDFC Bank', value: 'HDFC'},
  {label: 'ICICI Bank', value: 'ICICI'},
  {label: 'Axis Bank', value: 'Axis'},
  {label: 'Axis Bank', value: 'Axis'},
  {label: 'Axis Bank', value: 'Axis'},
  {label: 'Axis Bank', value: 'Axis'},
  {label: 'Axis Bank', value: 'Axis'},
  {label: 'Axis Bank', value: 'Axis'},
  {label: 'Axis Bank', value: 'Axis'},
];

class BankAccountScreen extends Component<Props, {}> {
  handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log('Form submitted with values:', values);
    actions.setSubmitting(false);
  };

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
          barStyle={'light-content'}
        />
        <View style={styles.bankAccHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.bankAccText}>Bank Account</Text>
        </View>
        <View style={styles.bodyCont}>
          <Formik
            initialValues={{
              accountHolderName: '',
              accountNumber: '',
              ifscCode: '',
              bankName: '',
            }}
            validationSchema={validationSchema}
            onSubmit={this.handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.form}>
                <View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Account Holder Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Rajesh Singh"
                      placeholderTextColor="#BDBDBD"
                      value={values.accountHolderName}
                      onChangeText={handleChange('accountHolderName')}
                      onBlur={handleBlur('accountHolderName')}
                    />
                    {touched.accountHolderName && errors.accountHolderName && (
                      <Text style={styles.errorText}>
                        {errors.accountHolderName}
                      </Text>
                    )}
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Account Number</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="XXXX XXXX XXXX"
                      placeholderTextColor="#BDBDBD"
                      keyboardType="numeric"
                      value={values.accountNumber}
                      onChangeText={handleChange('accountNumber')}
                      onBlur={handleBlur('accountNumber')}
                    />
                    {touched.accountNumber && errors.accountNumber && (
                      <Text style={styles.errorText}>
                        {errors.accountNumber}
                      </Text>
                    )}
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>IFSC Code</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="XXXX XXXX XXXX"
                      placeholderTextColor="#BDBDBD"
                      value={values.ifscCode}
                      onChangeText={handleChange('ifscCode')}
                      onBlur={handleBlur('ifscCode')}
                    />
                    {touched.ifscCode && errors.ifscCode && (
                      <Text style={styles.errorText}>{errors.ifscCode}</Text>
                    )}
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Bank Name</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.dropdownPlaceholder}
                      selectedTextStyle={styles.dropdownSelectedText}
                      data={bankOptions}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Bank"
                      value={values.bankName}
                      onChange={item => setFieldValue('bankName', item.value)}
                      renderLeftIcon={() => (
                        <Image source={sbiLogoImg} style={styles.image} />
                      )}
                      containerStyle={styles.dropdownContainer}
                      itemTextStyle={styles.dropdownItemText}
                      itemContainerStyle={styles.dropdownItemContainer}
                      activeColor="#f0f0f0"
                      dropdownPosition="auto"
                      maxHeight={200}
                    />
                    {touched.bankName && errors.bankName && (
                      <Text style={styles.errorText}>{errors.bankName}</Text>
                    )}
                  </View>
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
      </View>
    );
  }
}

export default BankAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    // borderWidth: 2,
    // borderColor: '#000',
  },
  bankAccHeader: {
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? '#F5ECE2' : '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 1,
    height: 98,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    marginTop: 40,
    marginLeft: 5,
  },

  bankAccText: {
    fontSize: 20,
    marginTop: 40,
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    marginLeft: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginLeft: 10,
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: fonts.montserrat.bold,
    color: colors.black,
    marginBottom: 10,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    fontSize: responsiveFontSize(1.6),
    color: colors.black,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    height: 60,
  },
  errorText: {
    fontSize: responsiveFontSize(1.3),
    color: colors.red,
    fontFamily: fonts.montserrat.medium,
    marginTop: 7,
  },

  bodyCont: {
    flex: 1,
    backgroundColor: '#F6f6f6',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2.5),
    gap: 20,
    // borderWidth: 2,
    // borderColor: '#000',
    flexGrow: 1,
    justifyContent: 'space-between',
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

  dropdownPlaceholder: {
    fontSize: responsiveFontSize(1.6),
    color: '#BDBDBD',
  },
  dropdownSelectedText: {
    fontSize: responsiveFontSize(1.4),
    color: colors.lightTextColor,
    fontFamily: fonts.montserrat.medium,
  },

  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginTop: -1,
  },

  dropdownItemText: {
    fontSize: responsiveFontSize(1.3),
    color: colors.black,
    fontFamily: fonts.montserrat.bold,
  },
  dropdownItemContainer: {
    paddingHorizontal: 20,
    height: 50,
    paddingVertical: -20,
  },
});
