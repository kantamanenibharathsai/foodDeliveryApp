import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
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

const validationSchema = Yup.object().shape({
  upiId: Yup.string()
    .required('*UPI ID is required')
    .matches(
      /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/,
      '*Enter a valid UPI ID',
    ),
});

interface FormValues {
  upiId: string;
}

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

class UPIScreen extends Component<Props> {
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
        <View style={styles.upiHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.upiText}>UPI</Text>
        </View>
        <View style={styles.bodyCont}>
          <Formik
            initialValues={{
              upiId: '',
            }}
            validationSchema={validationSchema}
            onSubmit={this.handleSubmit}>
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
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>UPI</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="UPI Id"
                      placeholderTextColor="#BDBDBD"
                      value={values.upiId}
                      onChangeText={handleChange('upiId')}
                      onBlur={handleBlur('upiId')}
                    />
                    {touched.upiId && errors.upiId && (
                      <Text style={styles.errorText}>{errors.upiId}</Text>
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

export default UPIScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  upiHeader: {
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
  upiText: {
    fontSize: 20,
    marginTop: 40,
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    marginLeft: 4,
  },
  bodyCont: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2.5),
    gap: 20,
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
  errorText: {
    fontSize: responsiveFontSize(1.3),
    color: colors.red,
    fontFamily: fonts.montserrat.medium,
    marginTop: 7,
  },
  buttonContainer: {
    width: responsiveWidth(88),
    height: 75,
    alignSelf: 'center',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
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
});
