import {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
  FlatList,
} from 'react-native';
import {userProfileImg} from '../assets';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {foodHomeImages} from '../utils/Data';
import HomeCarousal from '../components/HomeCarousel';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: responsiveWidth(3),
    paddingTop: Platform.OS === 'ios' ? 60 : responsiveHeight(6),
    backgroundColor: colors.white,
  },

  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingRight: responsiveWidth(7),
    alignItems: 'center',
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
    paddingRight: 10,
    flexDirection: 'row',
    gap: responsiveWidth(3),
  },

  foodImg: {
    resizeMode: 'cover',
    width: 153,
    height: 65,
  },
});

export default HomeScreen;
