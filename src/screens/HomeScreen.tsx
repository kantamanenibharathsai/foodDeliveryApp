import {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {userProfileImg} from '../assets';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {foodHomeImages} from '../utils/Data';
import HomeCarousal from '../components/HomeCarousel';
import BestChoiceHome from '../components/BestChoiceHome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TodaySpecial from '../components/TodaySpecial';
import RestaurantNearBy from '../components/RestaurantNearBy';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {AppDispatch, RootState} from '../redux/store';
import {
  ApiStatusConstants,
  bestChoiceAction,
  BestChoicesObjectInterface,
  RestaurantNearByGetInterface,
  restNearByGetGetAction,
  todaysSpecialGetAction,
  TodaysSpecialGetInterface,
} from '../redux/slices/HomeSlice';
import {connect} from 'react-redux';

interface Props {
  navigation: NavigationProp<ParamListBase>;
  bestChoiceStatus: ApiStatusConstants;
  bestChoiceSuccessData: BestChoicesObjectInterface[];
  bestChoiceErrMsg: string;

  todaysSpecialGetStatus: ApiStatusConstants;
  todaysSpecialGetSuccessData: TodaysSpecialGetInterface[];
  todaysSpecialGetErrData: string;
  todaysSpecialGetDataFunc: () => void;

  restNearByGetStatus: ApiStatusConstants;
  restNearByGetSuccessData: RestaurantNearByGetInterface[];
  restNearByGetErrData: string;
  restNearByGetDataFunc: () => void;
}
class HomeScreen extends Component<Props> {
  mapHandler = () => {
    this.props.navigation.navigate('RestNearByScreen');
  };

  viewAllHandler = () => {
    this.props.navigation.navigate('TodaySpecialScreen');
  };

  componentDidMount(): void {
    this.props.todaysSpecialGetDataFunc();
    this.props.restNearByGetDataFunc();
  }

  render() {

    return (
      <ScrollView style={styles.container}>
        <View style={styles.cont}>
          <View style={styles.profileContainer}>
            <View style={styles.imgTextContainer}>
              <View style={styles.imgCont}>
                <Image source={userProfileImg} style={styles.profileImg} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.userName}>Hi, Sachin</Text>
                <View style={styles.locationContainer}>
                  <IonicIcons
                    name="location-sharp"
                    size={18}
                    color={colors.greyColor}
                  />
                  <Text style={styles.locationText}>Nagpur, Maharashtra</Text>
                </View>
              </View>
            </View>
            <View style={styles.notificationContainer}>
              <MaterialCommunityIcons
                name="bell-outline"
                size={42}
                color={colors.black}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>10+</Text>
              </View>
            </View>
          </View>
          <FlatList
            contentContainerStyle={styles.flatListHomeStyle}
            horizontal
            data={foodHomeImages}
            renderItem={({item}) => (
              <Image style={styles.foodImg} source={item.image} />
            )}
            showsHorizontalScrollIndicator={false}
          />
          <HomeCarousal />
          <View style={styles.bestChoiceContainer}>
            <Text style={styles.commonTxt}>Best Choice</Text>
            <BestChoiceHome />
          </View>

          {this.props.todaysSpecialGetSuccessData?.length !== 0 && (
            <View style={styles.todaySpecialCont}>
              <View style={styles.todaySpecialTopCont}>
                <Text style={styles.commonTxt}>Today Special</Text>
                <TouchableOpacity
                  onPress={this.viewAllHandler}
                  style={styles.navigateBtn}>
                  <Text style={styles.viewAllTxt}>View All</Text>
                  <AntDesign name="arrowright" size={19} color={colors.green} />
                </TouchableOpacity>
              </View>
              <TodaySpecial
                todaysSpecialGetSuccessData={
                  this.props.todaysSpecialGetSuccessData
                }
              />
            </View>
          )}
          <View style={styles.todaySpecialCont}>
            <View style={styles.todaySpecialTopCont}>
              <Text style={styles.commonTxt}>Restaurant Nearby</Text>
              <TouchableOpacity
                onPress={this.mapHandler}
                style={styles.navigateBtn}>
                <View style={styles.viewAllCont}>
                  <Text style={styles.viewAllTxt}>Map</Text>
                  <AntDesign name="arrowright" size={19} color={colors.green} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <RestaurantNearBy isRestNearByScreen={false} restNearByGetSuccessData={this.props.restNearByGetSuccessData}/>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  bestChoiceStatus: state.home.bestChoiceStatus,
  bestChoiceSuccessData: state.home.bestChoiceSuccessData,
  loginErrMsg: state.auth.loginErrMsg,

  todaysSpecialGetStatus: state.home.todaysSpecialGetStatus,
  todaysSpecialGetSuccessData: state.home.todaysSpecialGetSuccessData,
  todaysSpecialGetErrData: state.home.todaysSpecialGetErrData,

  restNearByGetStatus: state.home.restNearByGetStatus,
  restNearByGetSuccessData: state.home.restNearByGetSuccessData,
  restNearByGetErrData: state.home.restNearByGetErrData

});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getBestChoicesData: () => dispatch(bestChoiceAction()),
    todaysSpecialGetDataFunc: () => dispatch(todaysSpecialGetAction()),
    restNearByGetDataFunc : () => dispatch(restNearByGetGetAction())
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  cont: {
    paddingTop: responsiveHeight(6),
  },

  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingRight: responsiveWidth(4),
    alignItems: 'center',
    marginHorizontal: responsiveWidth(3.5),
  },

  imgTextContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  imgCont: {
    height: responsiveWidth(16),
    width: responsiveWidth(16),
    backgroundColor: colors.white,
    borderRadius: 160,
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImg: {
    height: responsiveHeight(8),
    width: responsiveWidth(18),
    color: colors.greyColor,
  },

  textContainer: {
    gap: 6,
  },

  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
    lineHeight: 20,
    fontFamily: fonts.bai.semiBold,
  },

  locationContainer: {
    flexDirection: 'row',
    gap: 4,
  },

  locationText: {
    fontSize: 15,
    color: colors.greyColor,
    lineHeight: 18,
    fontFamily: fonts.montserrat.bold,
    fontWeight: 'bold',
  },

  notificationContainer: {
    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: 0,
    width: 35,
    height: 21,
    left: 16,
    backgroundColor: colors.red,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: '700',
    fontFamily: fonts.montserrat.bold,
  },

  flatListHomeStyle: {
    paddingHorizontal: responsiveWidth(3.8),
    flexDirection: 'row',
    gap: responsiveWidth(3),
    // borderWidth: 1,
    // borderColor: colors.greyColor,
  },

  foodImg: {
    resizeMode: 'cover',
    width: 153,
    height: 65,
  },

  bestChoiceContainer: {
    gap: 10,
    marginTop: 10,
    // marginBottom: 10,
    // paddingHorizontal: responsiveWidth(3.8),
  },

  commonTxt: {
    fontSize: responsiveFontSize(3.0),
    fontWeight: '700',
    color: colors.black,
    lineHeight: 40,
    fontFamily: fonts.bai.semiBold,
    paddingLeft: responsiveWidth(3.8),
  },

  todaySpecialCont: {
    // paddingHorizontal: responsiveWidth(3.8),
    gap: 20,
    marginTop: 5,
  },

  todaySpecialTopCont: {
    // paddingHorizontal: responsiveWidth(3.0),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: responsiveWidth(3),
    marginBottom: responsiveHeight(1.5),
  },

  viewAllCont: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },

  viewAllTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    lineHeight: 31,
    fontFamily: fonts.bai.semiBold,
  },

  navigateBtn: {flexDirection: 'row', alignItems: 'center', gap: 10},
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
