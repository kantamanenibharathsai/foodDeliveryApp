import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import CustomButton from '../components/Button';
import {allowLocationImg} from '../assets';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

interface AllowLocationScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

interface State {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
}

class AllowLocationScreen extends Component<AllowLocationScreenProps, State> {
  constructor(props: AllowLocationScreenProps) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      loading: false, // Set loading state initially to false
    };
  }

  requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
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
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    }
    return true;
  };

  openSettings = (): void => {
    Linking.openSettings();
    Toast.show({
      type: 'info',
      text1: 'Settings',
      text2: 'You can change the permission in the app settings.',
    });
  };

  handleDontAllowLocation = (): void => {
    Alert.alert('Permission Denied', 'You have denied location access.');
    this.openSettings();
  };

  handleAllowLocation = async (): Promise<void> => {
    console.log("allow");
    try {
      const hasPermission = await this.requestLocationPermission();
      // if (!hasPermission) {
      //   this.openSettings();
      //   return;
      // }
      this.setState({loading: true});
         console.log('allow2');
      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude} = position.coords;
          const coordinates = {latitude, longitude};
          // console.log(coordinates);
          await AsyncStorage.setItem(
            'coordinates',
            JSON.stringify(coordinates),
          );
          this.setState({latitude, longitude});

          setTimeout(() => {
            this.setState({loading: false});
            this.props.navigation.navigate('BottomTab');
          }, 3000);
        },
        error => {
          Alert.alert('Error', 'Unable to fetch your location.');
          this.setState({loading: false});
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching location.');
      this.setState({loading: false});
    }
  };

  render() {
    const {loading} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
          barStyle={'dark-content'}
        />
        {loading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color={colors.black} />
          </View>
        )}

        <View style={styles.imageContainer}>
          <Image source={allowLocationImg} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Allow location</Text>
            <Text style={styles.descriptionText}>
              We need your permission to access your location
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <CustomButton
              title={'ALLOW LOCATION'}
              onPress={this.handleAllowLocation}
            />
          </View>
          <TouchableOpacity
            style={styles.dontAllowContainer}
            onPress={this.handleDontAllowLocation}>
            <Text style={styles.dontAllowText}>Don’t allow</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AllowLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: responsiveHeight(6),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(10),
  },
  image: {
    width: responsiveHeight(40),
    height: responsiveHeight(40),
  },
  textContainer: {
    gap: responsiveHeight(1),
  },
  buttonContainer: {},
  buttonWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  dontAllowContainer: {
    marginBottom: 10,
  },
  headerText: {
    color: colors.black,
    fontSize: responsiveFontSize(3),
    textAlign: 'center',
    fontFamily: fonts.bai.semiBold,
  },
  descriptionText: {
    color: colors.textColor,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    fontFamily: fonts.montserrat.medium,
  },
  dontAllowText: {
    color: colors.black,
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    fontFamily: fonts.montserrat.semiBold,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
});
