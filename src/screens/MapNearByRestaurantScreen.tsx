import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';

import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_DEFAULT, Region} from 'react-native-maps';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import RatingComponent from '../components/RatingComponent';
import {foodHomeImages} from '../utils/Data';
import {foodData, FoodItem} from '../components/SearchHydComponentScreen';



interface Props {
  loading: boolean;
  message: string;
  businessData: any;
  dispatch: AppDispatch;
}

interface State {
  currPosition: GeoPosition | null;
}

class MapNearByRestaurant extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currPosition: null,
    };
  }

  async componentDidMount() {
    const hasPermission = await this.requestLocationPermission();
    if (hasPermission || Platform.OS === 'ios') {
      this.addCurrentLocation();
    } else {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to show your location on the map.',
      );
    }

    const {currPosition} = this.state;
    const data = {
      latitude: currPosition ? currPosition.coords.latitude : 0,
      longitude: currPosition ? currPosition.coords.longitude : 0,
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

  renderDetails = ({item}: {item: FoodItem}) => (
    <View style={styles.detailsContainer}>
      <Image
        source={item.image}
        resizeMode="cover"
        style={styles.detailsImage}
      />
    </View>
  );

  render() {
    const {currPosition} = this.state;
    const {businessData} = this.props;

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
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent
          barStyle="light-content"
        />
        <View style={styles.topContainer}>
          <View style={styles.topLeftIconContainer}>
            <AntDesign
              name="arrowleft"
              size={responsiveFontSize(2.2)}
              color={colors.black}
            />
          </View>
          <View style={styles.searchContainer}>
            <AntDesign
              name="search1"
              size={responsiveFontSize(2.2)}
              color={colors.black}
            />
            <TextInput
              //   placeholder={config.serachPlaceholder}
              placeholderTextColor={colors.black}
              style={styles.textInput}
            />
            <Entypo
              name="cross"
              size={responsiveFontSize(2.2)}
              color={colors.black}
            />
          </View>
        </View>
        <MapView
          style={styles.mapStyles}
          region={initialRegion}
          showsUserLocation
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
        <View style={styles.orderedItemsContainer}>
          <FlatList
            data={foodData}
            renderItem={this.renderDetails}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
          <View style={styles.details}>
            <Text style={styles.name}>Golden Fish Restaurant</Text>
            <View style={styles.kmsRatingCont}>
              <View style={styles.kmsCont}>
                <Entypo name="location-pin" size={16} color={colors.red} />
                <Text style={styles.price}>2.5km</Text>
              </View>
              <RatingComponent ratingNum={3} />
            </View>
            <Text style={styles.address}>
              Manish Nagar, Ingole Nagar, Sonegaon, Nagpur
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  mapStyles: {
    width: '100%',
    height: Platform.OS === "android" ? responsiveHeight(68) : responsiveHeight(64),
  },
  topContainer: {
    position: 'absolute',
    height: responsiveHeight(6),
    width: responsiveWidth(95),
    top: responsiveHeight(7),
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  topLeftIconContainer: {
    backgroundColor: 'white',
    width: responsiveHeight(7),
    height: responsiveHeight(6),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderedItemsContainer: {
    paddingVertical: responsiveHeight(1),
  },
  flatListContent: {
    gap: 10,
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  distanceNrattingContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  detailsContainer: {
    width: responsiveWidth(80),
    height: responsiveHeight(18),
    marginTop: responsiveHeight(1),
  },
  detailsImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  searchContainer: {
    width: responsiveWidth(72),
    height: responsiveHeight(6),
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 5,
    elevation: 10,
    shadowOffset: {width: 2, height: 6},
    shadowColor: colors.greyColor,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
  },
  textInput: {
    width: responsiveWidth(52),
    fontFamily: fonts.montserrat.semiBold,
    fontSize: responsiveFontSize(1.5),
  },

  details: {
    marginLeft: 10,
    justifyContent: 'center',
    gap: Platform.OS === 'ios' ? 9 : responsiveHeight(0.3),
    paddingVertical: Platform.OS === 'ios' ? 18 : responsiveHeight(2),
    paddingLeft: 8,
  },
  name: {
    fontSize: 20,
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
  },
  kmsRatingCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  kmsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.red,
    marginRight: 3,
    fontFamily: fonts.bai.medium,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: colors.red,
  },
  imgTxtCont: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  imgStyle: {
    width: 24,
    height: 24,
  },
  restaurant: {
    fontSize: 15,
    color: colors.lightTextColor,
    fontFamily: fonts.bai.medium,
  },
  address: {
    fontSize: responsiveFontSize(1.9),
    color: colors.lightTextColor,
    fontFamily: fonts.montserrat.medium,
    lineHeight: 20,
  },
});

export default MapNearByRestaurant;
