import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {restaurantNearByImg} from '../assets';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import RatingComponent from './RatingComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  ApiStatusConstants,
  RestaurantNearByGetInterface,
  restNearByGetGetAction,
} from '../redux/slices/HomeSlice';
import {AppDispatch, RootState} from '../redux/store';
import {connect} from 'react-redux';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface RestaurantNearByProps {
  navigation?: NavigationProp<ParamListBase>;
  restNearByGetStatus?: ApiStatusConstants;
  restNearByGetSuccessData?: RestaurantNearByGetInterface[];
  restNearByGetErrData?: string;
  restNearByGetDataFunc?: () => void;
}
class RestaurantNearByScreenVertical extends React.Component<
  RestaurantNearByProps,
  {hasCalledApi: boolean}
> {
  constructor(props: RestaurantNearByProps) {
    super(props);
    this.state = {
      hasCalledApi: false,
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      if (!this.state.hasCalledApi) {
        const {restNearByGetDataFunc = () => {}} = this.props;
        restNearByGetDataFunc();
        this.setState({hasCalledApi: true});
      }
    }, 3000);
  }
  renderItem = (item: RestaurantNearByGetInterface) => {
    return (
      <View style={styles.card}>
        <View style={styles.imgCont}>
          <Image source={restaurantNearByImg} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{item.businessName}</Text>
          <View style={styles.kmsRatingCont}>
            <View style={styles.kmsCont}>
              <Entypo name="location-pin" size={16} color={colors.red} />
              <Text style={styles.price}>{item.distance}km</Text>
            </View>
            <RatingComponent ratingNum={3} />
          </View>
          <Text style={styles.address}>
            Manish Nagar, Ingole Nagar, Sonegaon, Nagpur
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const {restNearByGetStatus, restNearByGetSuccessData} = this.props;

    if (restNearByGetStatus === 'Loading') {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.red} />
        </View>
      );
    }

    return (
      <FlatList
        data={restNearByGetSuccessData}
        renderItem={({item}) => this.renderItem(item)}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.flatList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          if (restNearByGetStatus === 'Failed') {
            return (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  Failed to load restaurants.
                </Text>
              </View>
            );
          }
        }}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  restNearByGetStatus: state.home.restNearByGetStatus,
  restNearByGetSuccessData: state.home.restNearByGetSuccessData,
  restNearByGetErrData: state.home.restNearByGetErrData,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  restNearByGetDataFunc: () => dispatch(restNearByGetGetAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantNearByScreenVertical);

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: responsiveWidth(4),
    gap: 16,
    marginVertical: responsiveHeight(1.7),
    paddingBottom: responsiveHeight(4),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: Platform.OS === 'ios' ? '#fff3e5' : '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 3,
    shadowRadius: 15,
    elevation: 8,
  },
  imgCont: {
    width: '100%',
    height: Platform.OS === 'ios' ? 140 : 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
    fontWeight: '600',
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
    fontSize: 15,
    color: colors.lightTextColor,
    fontFamily: fonts.montserrat.medium,
    lineHeight: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  errorText: {
    fontSize: responsiveFontSize(1.7),
    color: colors.red,
    fontFamily: fonts.bai.medium,
  },
});
