import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListRenderItem,
  ImageSourcePropType,
  Platform
} from 'react-native';
import {dishImg, todaySpecialImg} from '../assets';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import {
  NavigationProp,
  RouteProp,
  ParamListBase,
} from '@react-navigation/native';
export interface FoodItem {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  restaurant: string;
  image: ImageSourcePropType;
}

interface RootStackParamList extends ParamListBase {
  auth: undefined;
  home: undefined;
  'terms-and-conditions': undefined;
  'verify-otp': undefined;
  'forgot-password': undefined;
}

interface TodaySpecialProps {
}
interface TodaySpecialState {
  data: FoodItem[];
}

export const foodData: FoodItem[] = [
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
  {
    id: '6',
    name: 'Bset Veg Dum Biryani',
    price: '₹100',
    originalPrice: '₹200',
    restaurant: 'Golden Fish Restaurant',
    image: todaySpecialImg,
  },
  {
    id: '7',
    name: 'Bset Veg Dum Biryani',
    price: '₹100',
    originalPrice: '₹200',
    restaurant: 'Golden Fish Restaurant',
    image: todaySpecialImg,
  },
  {
    id: '8',
    name: 'Bset Veg Dum Biryani',
    price: '₹100',
    originalPrice: '₹200',
    restaurant: 'Golden Fish Restaurant',
    image: todaySpecialImg,
  },
];

class TodaySpecial extends React.Component<
  TodaySpecialProps,
  TodaySpecialState
> {
  constructor(props: TodaySpecialProps) {
    super(props);
    this.state = {
      data: foodData,
    };
  }

  renderItem: ListRenderItem<FoodItem> = ({item}) => (
    <View style={styles.card}>
      <View style={styles.imgCont}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        </View>
        <View style={styles.imgTxtCont}>
          <Image source={dishImg} style={styles.imgStyle} />
          <Text style={styles.restaurant}>{item.restaurant}</Text>
        </View>
      </View>
    </View>
  );

  render() {
    const {data} = this.state;


    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        nestedScrollEnabled
      />
    );
  }
}

export default TodaySpecial;

const styles = StyleSheet.create({
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
  },
  imgCont: {
    width: 114,
    height: 126,
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
});
