import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import {restaurantNearByImg, todaySpecialImg} from '../assets';

import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import RatingComponent from './RatingComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import {RestaurantNearByGetInterface} from '../redux/slices/HomeSlice';

interface FoodItem {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  restaurant: string;
  image: ImageSourcePropType;
}

const foodData: FoodItem[] = [
  {
    id: '1',
    name: 'Bset Veg Dum Biryani',
    price: '₹100',
    originalPrice: '₹200',
    restaurant: 'Golden Fish Restaurant',
    image: todaySpecialImg,
  },
  {
    id: '2',
    name: 'Chicken Tikka',
    price: '₹80',
    originalPrice: '₹120',
    restaurant: 'Barbeque Nation',
    image: todaySpecialImg,
  },
  {
    id: '3',
    name: 'Pizza',
    price: '₹90',
    originalPrice: '₹140',
    restaurant: 'Naivedhyam Restaurant',
    image: todaySpecialImg,
  },
  {
    id: '4',
    name: 'Chicken Biryani',
    price: '₹60',
    originalPrice: '₹80',
    restaurant: 'Saoji Bhojnalaya',
    image: todaySpecialImg,
  },
  {
    id: '5',
    name: 'Bset Veg Dum Biryani',
    price: '₹100',
    originalPrice: '₹200',
    restaurant: 'Golden Fish Restaurant',
    image: todaySpecialImg,
  },
];

interface RestaurantNearByProps {
  isRestNearByScreen: boolean;
  restNearByGetSuccessData: RestaurantNearByGetInterface[];
}
interface RestaurantNearByState {
  data: FoodItem[];
}

class RestaurantNearBy extends React.Component<
  RestaurantNearByProps,
  RestaurantNearByState
> {
  constructor(props: RestaurantNearByProps) {
    super(props);
    this.state = {
      data: foodData,
    };
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
    const {data} = this.state;
    console.log(
      this.props.restNearByGetSuccessData,
      'aaaagauayfgasuyfgauyfsgasufyg',
    );

    return (
      <FlatList
        data={this.props.restNearByGetSuccessData}
        renderItem={({item}) => this.renderItem(item)}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        horizontal={true}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

export default RestaurantNearBy;

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: responsiveWidth(4),
    flexDirection: 'row',
    gap: 16,
    marginBottom: responsiveHeight(1.7),
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
    width: 296,
    height: 289,
  },
  imgCont: {
    width: '100%',
    height: 140,
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
    gap: 5,
    paddingTop: 8,
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
    fontWeight: '600',
  },
});



