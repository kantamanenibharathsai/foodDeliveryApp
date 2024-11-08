import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  FlatList,
  Image,
  ScrollView,
  ListRenderItem,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import HomeCarousel from '../components/HomeCarousel';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  useResponsiveWidth,
} from 'react-native-responsive-dimensions';
import RatingComponent from '../components/RatingComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {foodHomeImages} from '../utils/Data';
import BestChoiceHome from '../components/BestChoiceHome';
import TodaySpecial, { foodData, FoodItem } from '../components/TodaySpecial';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {dishImg, galleryImg} from '../assets';


interface Props {
  navigation: NavigationProp<ParamListBase>;
}


class FavoriteScreen extends Component<Props> {
  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  mapHandler = () => {
    this.props.navigation.navigate('RestNearByScreen');
  };

  viewAllHandler = () => {
    this.props.navigation.navigate('TodaySpecialScreen');
  };

  renderItem: ListRenderItem<FoodItem> = ({item}) => (
    <View style={styles.card}>
      <View style={styles.imgCont}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    </View>
  );
  render() {
    return (
      <>
        <View style={styles.nearbyResHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.nearByResText}>Favorite</Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.bodyCont}>
            <View style={styles.todaySpecialCont}>
              <FlatList
                data={foodData}
                keyExtractor={item => item.id}
                renderItem={this.renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatList}
                nestedScrollEnabled
              />
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  nearbyResHeader: {
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
  nearByResText: {
    fontSize: 20,
    marginTop: 40,
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    marginLeft: 4,
  },
  bodyCont: {
    flex: 1,
    paddingVertical: 20,
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

  btnsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
    alignSelf: 'center',
  },

  favoriteBtn: {
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: responsiveWidth(8),
  },

  favoriteText: {
    fontFamily: fonts.bai.semiBold,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },

  foodReviewsText: {
    fontFamily: fonts.bai.semiBold,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },

  categoryCont: {
    flexDirection: 'column',
    gap: 10,
    paddingLeft: responsiveWidth(4),
    marginTop: 15,
  },

  flatListHomeStyle: {
    flexDirection: 'row',
    gap: responsiveWidth(3),
  },

  foodImg: {
    resizeMode: 'cover',
    width: 153,
    height: 65,
  },

  todaySpecialCont: {
    paddingHorizontal: responsiveWidth(4),
    gap: 20,
    marginTop: 5,
  },

  todaySpecialTopCont: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: responsiveWidth(3),
    marginBottom: responsiveHeight(1.5),
  },

  commonTxt: {
    fontSize: responsiveFontSize(3.0),
    fontWeight: '700',
    color: colors.black,
    lineHeight: 40,
    fontFamily: fonts.bai.semiBold,
    paddingLeft: responsiveWidth(3.8),
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

  list: {
    gap: 15,
    paddingRight: responsiveWidth(3.5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardTxtCont: {
    position: 'relative',
    top: 30,
    textAlign: 'center',
    zIndex: 10,
  },

  cardName: {
    fontSize: responsiveFontSize(2.1),
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
    textAlign: 'center',
  },

  imageCont: {
    width: 90,
    height: 90,
    borderWidth: 5,
    borderColor: '#fff',
    borderRadius: 100,
    position: 'absolute',
    top: -40,
    left: 36,
  },

  role: {
    fontSize: 15,
    color: colors.red,
    fontFamily: fonts.bai.medium,
    textAlign: 'center',
    marginTop: -5,
  },

  galleryList: {
    gap: responsiveWidth(4.5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  phoneImageCont: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    backgroundColor: colors.green,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatList: {
    // padding: responsiveWidth(4),
    marginTop: -5,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 3,
    shadowRadius: 15,
    elevation: 8,
    shadowColor: Platform.OS === 'ios' ? '#fff3e5' : '#000',
    height: 93
  },
  imgCont: {
    width: 114,
    height: 93,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  details: {
    // borderWidth: 2,
    // borderColor: "#000",
    marginLeft: 10,
    justifyContent: 'center',
    gap: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.black,
    fontFamily: fonts.bai.medium,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.red,
    marginRight: 3,
    fontFamily: fonts.bai.medium,
  },
});
