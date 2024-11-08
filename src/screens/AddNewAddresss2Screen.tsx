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
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_DEFAULT, Region} from 'react-native-maps';

interface FormValues {
  address: string;
  landmark: string;
}

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

interface State {
  currPosition: GeoPosition | null;
  isAddressFocused: boolean;
  isLandmarkFocused: boolean;
}

const validationSchema = Yup.object().shape({
  address: Yup.string().required('*Address is required'),
  landmark: Yup.string().required('*Landmark is required'),
});

class AddNewAddressTwoScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currPosition: null,
      isAddressFocused: false,
      isLandmarkFocused: false,
    };
  }

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log('Form submitted:', values);
    actions.setSubmitting(false);
  };

  componentDidMount() {
    this.requestLocationPermission()
      .then(hasPermission => {
        if (hasPermission || Platform.OS === 'ios') {
          this.addCurrentLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to show your location on the map.',
          );
        }
      })
      .catch(error => console.error('Permission error:', error));
  }
  requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'We need your location to show it on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (Platform.Version >= 30) {
          const backgroundGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
            {
              title: 'Background Location Permission',
              message:
                'We need your background location to provide services even when the app is closed.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          return (
            granted === PermissionsAndroid.RESULTS.GRANTED &&
            backgroundGranted === PermissionsAndroid.RESULTS.GRANTED
          );
        }
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  addCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => this.setState({currPosition: position}),
      error =>
        Alert.alert(
          'Error',
          'Unable to get location. Please check your location settings.',
        ),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  render() {
    const {currPosition, isAddressFocused, isLandmarkFocused} = this.state;

    const initialRegion: Region = currPosition
      ? {
          latitude: currPosition.coords.latitude,
          longitude: currPosition.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }
      : {
          latitude: 17.4477,
          longitude: 78.3802,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

    return (
      <Formik
        initialValues={{
          address: '',
          landmark: '',
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
          <>
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
            <ScrollView style={styles.container}>
              <View>
                <MapView
                  style={styles.mapStyles}
                  region={currPosition ? initialRegion : undefined}
                  showsUserLocation={!!currPosition}
                  provider={PROVIDER_DEFAULT}
                  zoomEnabled
                  mapType="standard">
                  {currPosition && (
                    <Marker
                      coordinate={{
                        latitude: currPosition.coords.latitude,
                        longitude: currPosition.coords.longitude,
                      }}
                      draggable
                    />
                  )}
                </MapView>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={values.address}
                    onChangeText={text =>
                      handleChange('address')(text.replace(/\s/g, ''))
                    }
                    onBlur={handleBlur('address')}
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {!this.state.isAddressFocused && values.address === '' && (
                    <Text style={styles.placeholder}>Address*</Text>
                  )}
                </View>
                {touched.address && errors.address && (
                  <Text style={styles.errorText}>{errors.address}</Text>
                )}
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={values.landmark}
                    onChangeText={handleChange('landmark')}
                    onBlur={handleBlur('landmark')}
                    maxLength={10}
                  />
                  {!this.state.isLandmarkFocused && values.landmark === '' && (
                    <Text style={styles.placeholder}>Land Mark*</Text>
                  )}
                </View>
                {touched.landmark && errors.landmark && (
                  <Text style={styles.errorText}>{errors.landmark}</Text>
                )}
                <View style={styles.iconTxtCont}>
                  <Entypo
                    name="location-pin"
                    size={25}
                    color={colors.lightTextColor}
                  />
                  <Text style={styles.addressTxt}>
                    Manish Nagar, Ingole Nagar, Sonegaon, Nagpur, maharashtra
                    441004, India
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    activeOpacity={0.7}>
                    <Text style={styles.buttonText}>SAVE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
    );
  }
}

export default AddNewAddressTwoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  errorText: {
    color: 'red',
    fontSize: responsiveFontSize(1.2),
    marginTop: 5,
    fontFamily: fonts.montserrat.medium,
    alignSelf: 'center',
    width: 385,
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
    width: '100%',
    fontSize: responsiveFontSize(1.7),
    fontFamily: fonts.montserrat.bold,
    color: colors.lightTextColor,
    paddingTop: 17,
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

  mapStyles: {
    width: '100%',
    height: responsiveHeight(50),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.greyColor,
    borderBottomWidth: 2,
    paddingHorizontal: 14,
    width: 385,
    alignSelf: 'center',
  },
  placeholder: {
    position: 'absolute',
    left: 12,
    top: 32,
    color: colors.black,
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(1.7),
  },

  iconTxtCont: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 385,
    alignSelf: 'center',
    marginVertical: 20,
  },

  addressTxt: {
    fontSize: responsiveFontSize(1.7),
    color: colors.lightTextColor,
    fontFamily: fonts.bai.semiBold,
    lineHeight: 20,
  },
});
