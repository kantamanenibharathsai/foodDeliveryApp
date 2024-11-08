import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { countries } from '../utils/Data';



interface FormValues {
  country: string;
  pinCode: string;
  address: string;
  area: string;
  landmark: string;
  city: string;
}

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

interface State {
  isCountryDropdownVisible: boolean;
  selectedCountry: string;
}


const validationSchema = Yup.object().shape({
  country: Yup.string().required('Country is required'),
  pinCode: Yup.string()
    .required('*PIN Code is required')
    .matches(/^[0-9]{6}$/, '*Invalid PIN Code'),
  address: Yup.string().required('*Address is required'),
  area: Yup.string().required('*Area is required'),
  landmark: Yup.string(),
  city: Yup.string().required('*City is required'),
});

class AddNewAddressScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isCountryDropdownVisible: false,
      selectedCountry: 'India',
    };
  }

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  toggleCountryDropdown = () => {
    this.setState(prevState => ({
      isCountryDropdownVisible: !prevState.isCountryDropdownVisible,
    }));
  };

  onSelectCountry = (setFieldValue: any, country: string) => {
    setFieldValue('country', country);
    this.setState({
      selectedCountry: country,
      isCountryDropdownVisible: false,
    });
  };

  handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log('Form submitted:', values);
    actions.setSubmitting(false);
  };

  render() {
    return (
      <Formik
        initialValues={{
          country: this.state.selectedCountry,
          pinCode: '',
          address: '',
          area: '',
          landmark: '',
          city: '',
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
          <ScrollView style={styles.container}>
            <View style={styles.addNewAddressHeader}>
              <TouchableOpacity
                onPress={this.handleGoBack}
                style={styles.leftIcon}>
                <Entypo
                  name="chevron-small-left"
                  size={30}
                  color={colors.black}
                />
              </TouchableOpacity>
              <Text style={styles.addNewAddressText}>Add New Address</Text>
            </View>
            <View style={styles.bodyCont}>
              {/* Country Dropdown */}
              <View style={styles.labelTextFieldCont}>
                <Text style={styles.label}>Country/Region</Text>
                <View style={styles.dropdownWrapper}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.toggleCountryDropdown}
                    style={styles.input}>
                    <Text style={[styles.inputText]}>{values.country}</Text>
                    <Entypo
                      name={
                        this.state.isCountryDropdownVisible
                          ? 'chevron-small-up'
                          : 'chevron-small-down'
                      }
                      size={24}
                      color={colors.lightTextColor}
                      style={styles.dropdownIcon}
                    />
                  </TouchableOpacity>
                  {this.state.isCountryDropdownVisible && (
                    <View style={styles.dropdownContainer}>
                      <FlatList
                        data={countries}
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() =>
                              this.onSelectCountry(setFieldValue, item)
                            }>
                            <Text style={styles.dropdownItemText}>{item}</Text>
                          </TouchableOpacity>
                        )}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled
                      />
                    </View>
                  )}
                </View>
                {errors.country && touched.country && (
                  <Text style={styles.errorText}>{errors.country}</Text>
                )}
              </View>
              {['PIN Code', 'Address', 'Area', 'Landmark', 'City'].map(
                (field, idx) => (
                  <View key={idx} style={styles.labelTextFieldCont}>
                    <Text style={styles.label}>{field}</Text>
                    <TextInput
                      style={styles.input}
                      placeholderTextColor={colors.lightTextColor}
                      placeholder={field}
                      value={values[field.toLowerCase() as keyof FormValues]}
                      onChangeText={handleChange(field.toLowerCase())}
                      onBlur={handleBlur(field.toLowerCase())}
                    />
                    {errors[field.toLowerCase() as keyof FormValues] &&
                      touched[field.toLowerCase() as keyof FormValues] && (
                        <Text style={styles.errorText}>
                          {errors[field.toLowerCase() as keyof FormValues]}
                        </Text>
                      )}
                  </View>
                ),
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  activeOpacity={0.7}>
                  <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    );
  }
}

export default AddNewAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },

  errorText: {
    color: 'red',
    fontSize: responsiveFontSize(1.2),
    marginTop: -4,
    fontFamily: fonts.montserrat.medium,
  },

  addNewAddressHeader: {
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

  addNewAddressText: {
    fontSize: 20,
    marginTop: 40,
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    marginLeft: 4,
  },

  bodyCont: {
    flex: 1,
    backgroundColor: '#F6f6f6',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveWidth(5),
    gap: 20,
  },

  labelTextFieldCont: {
    gap: 10,
  },

  label: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: fonts.montserrat.bold,
    color: colors.black,
  },

  input: {
    height: 68,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e8e8e8',
    width: '100%',
    fontSize: responsiveFontSize(1.7),
    fontFamily: fonts.montserrat.bold,
    color: colors.lightTextColor,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignContent: 'center',
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
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: responsiveFontSize(2),
  },

  dropdownWrapper: {
    position: 'relative',
    zIndex: 1001,
    // borderWidth: 3,
    // borderColor: '#e8e8e8',
  },
  inputText: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: fonts.montserrat.bold,
    color: colors.lightTextColor,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 20,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: 490,
    borderWidth: 2,
    borderColor: '#e8e8e8',
    zIndex: 2000,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  dropdownItemText: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: fonts.montserrat.bold,
    color: colors.lightTextColor,
  },
});
