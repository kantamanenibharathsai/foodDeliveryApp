import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  FlatList,
  Image,
  ScrollView
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
import { foodHomeImages } from '../utils/Data';
import BestChoiceHome from '../components/BestChoiceHome';
import TodaySpecial from '../components/TodaySpecial';
import { NavigationProp, ParamListBase } from '@react-navigation/native';


interface Person {
  id: string;
  name: string;
  role: string;
  image: string;
}

const teamData: Person[] = [
  {
    id: '1',
    name: 'Prasad Singh',
    role: 'Manager',
    image:
      'https://s3-alpha-sig.figma.com/img/7426/7aa9/ebaab2639afb8cfcadd5f9cbcca5358c?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AOzCuF-RF7pd8CS3T0n669M3sLVWi6dV7beEqzpEZm6VWJ5XXTfxIUybpfQVI4-2CzDjgaNivytDwfuLubTUEqerZVw677qlXgY1BHhQ9pO0GvOLqd7y8S4xAjuJDPjldg2pL2-c~X6zen-GKNNLSrxg3aiNvU7MFmNSXcdhBn1LZqm76wx3~6nqHYVZOf8KI3PFnoE2bq1-DxjmUZ8GzeEQeKmrX04GP2vEps2GqyYQoKyPF4IHFmP~mP-WaPMZXg0-mBqRXI6-JLym4SKrjoBySAYpgNC2~hMlbTT5LQvY6HO7EFPDXxKiv2LZRFnXilnGzoDx956wrkR8sh92nA__',
  },
  {
    id: '2',
    name: 'Mohan Lal',
    role: 'Chef',
    image:
      'https://s3-alpha-sig.figma.com/img/7426/7aa9/ebaab2639afb8cfcadd5f9cbcca5358c?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AOzCuF-RF7pd8CS3T0n669M3sLVWi6dV7beEqzpEZm6VWJ5XXTfxIUybpfQVI4-2CzDjgaNivytDwfuLubTUEqerZVw677qlXgY1BHhQ9pO0GvOLqd7y8S4xAjuJDPjldg2pL2-c~X6zen-GKNNLSrxg3aiNvU7MFmNSXcdhBn1LZqm76wx3~6nqHYVZOf8KI3PFnoE2bq1-DxjmUZ8GzeEQeKmrX04GP2vEps2GqyYQoKyPF4IHFmP~mP-WaPMZXg0-mBqRXI6-JLym4SKrjoBySAYpgNC2~hMlbTT5LQvY6HO7EFPDXxKiv2LZRFnXilnGzoDx956wrkR8sh92nA__',
  },
];


interface Props {
  navigation: NavigationProp<ParamListBase>;
}
class NearByRestaurantBigScreen extends Component<Props> {
  mapHandler = () => {
    this.props.navigation.navigate('RestNearByScreen');
  };

  viewAllHandler = () => {
    this.props.navigation.navigate('TodaySpecialScreen');
  };

  renderItem = ({item}: {item: Person}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
    </View>
  );
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.nearbyResHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.nearByResText}>Nearby Restaurant</Text>
        </View>
        <View style={styles.bodyCont}>
          <HomeCarousel />
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
          <View style={styles.btnsCont}>
            <TouchableOpacity style={styles.favoriteBtn}>
              <Text style={styles.favoriteText}>Favorite</Text>
              <AntDesign name="plus" size={20} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.favoriteBtn, {backgroundColor: colors.green}]}>
              <Text style={styles.foodReviewsText}>Food Reviews</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryCont}>
            <Text style={styles.name}>Category</Text>
            <FlatList
              contentContainerStyle={styles.flatListHomeStyle}
              horizontal
              data={foodHomeImages}
              renderItem={({item}) => (
                <Image style={styles.foodImg} source={item.image} />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.categoryCont}>
            <Text style={styles.name}>Best Choice</Text>
            <BestChoiceHome />
          </View>

          <View style={styles.todaySpecialCont}>
            <View style={styles.todaySpecialTopCont}>
              <Text style={styles.name}>Today Special</Text>
              <TouchableOpacity
                onPress={this.viewAllHandler}
                style={styles.navigateBtn}>
                <Text style={styles.viewAllTxt}>View All</Text>
                <AntDesign name="arrowright" size={19} color={colors.green} />
              </TouchableOpacity>
            </View>
            <TodaySpecial />
          </View>

          <View style={styles.categoryCont}>
            <Text style={styles.name}>Team</Text>
            <FlatList
              data={teamData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
              contentContainerStyle={styles.list}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default NearByRestaurantBigScreen;


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
    fontSize: responsiveFontSize(1.9),
    color: colors.lightTextColor,
    fontFamily: fonts.montserrat.medium,
    lineHeight: 20,
  },

  btnsCont: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
    alignSelf: 'center',
  },

  favoriteBtn: {
    // width: 170,
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
    // borderWidth: 2,
    // borderColor: "#000",
    paddingLeft: responsiveWidth(4),
    marginTop: 15,
  },

  flatListHomeStyle: {
    // paddingHorizontal: responsiveWidth(2.5),
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

  todaySpecialCont: {
    paddingHorizontal: responsiveWidth(4),
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
});
