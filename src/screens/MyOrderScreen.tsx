import {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
  Permission,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {fonts} from '../constants/fonts';

import {burgerPizzaImg} from '../assets';
import CartItem from '../components/CartItem';
import CustomButton from '../components/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {colors} from '../utils/Colors';
import RatingComponent from '../components/RatingComponent';
import { foodData, FoodItem } from '../components/SearchHydComponentScreen';
import { ScrollView } from 'react-native-gesture-handler';

interface Item {
  id: number;
  name: string;
  image: any;
  price: number;
}

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

interface AppState {
  cartItems: Item[];
}

class MyOrderScreen extends Component<Props, AppState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cartItems: [
        {
          id: 1,
          name: 'Hamburger',
          image: burgerPizzaImg,
          price: 100,
        },
        {
          id: 2,
          name: 'Vegetarian Pizza',
          image: burgerPizzaImg,
          price: 100,
        },
        {
          id: 3,
          name: 'Chicken Biryani',
          image: burgerPizzaImg,
          price: 100,
        },
        {
          id: 4,
          name: 'Chicken Biryani',
          image: burgerPizzaImg,
          price: 100,
        },
        {
          id: 5,
          name: 'Chicken Biryani',
          image: burgerPizzaImg,
          price: 100,
        },
        {
          id: 6,
          name: 'Chicken Biryani',
          image: burgerPizzaImg,
          price: 100,
        },
        {
          id: 7,
          name: 'Chicken Biryani',
          image: burgerPizzaImg,
          price: 100,
        },
      ],
    };
  }

  handleRemoveItem = (id: number) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: () =>
          this.setState(prevState => ({
            cartItems: prevState.cartItems.filter(item => item.id !== id),
          })),
      },
    ]);
  };

  handleGoBack = () => {
    this.props.navigation.goBack();
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
    return (
      <>
        <View style={styles.myOrderCont}>
          <View style={styles.myOrderHeader}>
            <TouchableOpacity
              onPress={this.handleGoBack}
              style={styles.leftIcon}>
              <Entypo
                name="chevron-small-left"
                size={30}
                color={colors.black}
              />
            </TouchableOpacity>
            <Text style={styles.orderText}>Order</Text>
          </View>
          <View style={styles.bodyCont}>
            <View style={styles.bodyTopCont}>
              <View style={styles.trackOrderCont}>
                <Text style={styles.trackOrderIdText}>Order# ORD00003</Text>
                <Text style={styles.dateText}>25 March, 03:25 PM</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.trackOrderBtnText}>Track Order</Text>
              </TouchableOpacity>
            </View>

            <View style={{backgroundColor: colors.white}}>
              <Text style={styles.orderedItemsTxt}>Ordered Items</Text>
              <FlatList
                data={this.state.cartItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <View style={styles.listItem}>
                    <View style={styles.liImgCont}>
                      <Image source={item.image} style={styles.liImg} />
                    </View>
                    <View style={styles.txtCont}>
                      <Text style={styles.liName}>{item.name}</Text>
                      <Text style={styles.liPrice}>₹{item.price}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
              />
            </View>
            <View style={styles.moneyContainer}>
              <View style={[styles.row, {borderBottomWidth: 0}]}>
                <Text style={styles.name}>Total Bill</Text>
                <Text style={styles.name}>₹300</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.row}>
                <Text style={styles.label}>Delivery Charge</Text>
                <Text style={styles.label}>₹0.00</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Packing Charge</Text>
                <View style={styles.separator} />
                <Text style={styles.label}>₹9</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Tax Amount(5.0%)</Text>
                <Text style={styles.label}>₹15</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Total Discount</Text>
                <Text style={styles.label}>₹0.00</Text>
              </View>
              <View style={styles.separator} />
              <View style={[styles.row, {borderBottomWidth: 0}]}>
                <Text style={styles.name}>Grand Total</Text>
                <Text style={styles.grandTotalValue}>₹324</Text>
              </View>
            </View>

            <View style={styles.orderedItemsContainer}>
              <Text style={styles.orderedItemsTxt}>Restaurant Details</Text>
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
        </View>
        <View style={styles.phoneImageCont}>
          <Entypo name="phone" color={colors.white} size={30} />
        </View>
      </>
    );
  }
}

export default MyOrderScreen;

const styles = StyleSheet.create({
  myOrderCont: {
    flex: 1,
    marginBottom: 500,
  },

  myOrderHeader: {
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

  orderText: {
    fontSize: 20,
    marginTop: 40,
    fontFamily: fonts.montserrat.bold,
    color: colors.black,
    marginLeft: 4,
  },

  listContainer: {
    paddingTop: responsiveHeight(2.8),
    paddingHorizontal: responsiveWidth(3.1),
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.white,
  },

  leftIcon: {
    marginTop: 40,
    marginLeft: 5,
  },

  bodyCont: {
    flex: 1,
    // paddingVertical: 13,
    backgroundColor: colors.white,
  },

  bodyTopCont: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: 10,
  },

  trackOrderCont: {
    display: 'flex',
    flexDirection: 'column',
    gap: Platform.OS === 'ios' ? responsiveHeight(1) : 0,
  },

  trackOrderIdText: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
  },

  dateText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: fonts.bai.regular,
    color: colors.lightTextColor,
  },

  trackOrderBtnText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: fonts.bai.semiBold,
    color: colors.green,
  },

  orderedItemsTxt: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    paddingLeft: responsiveWidth(4),
  },

  listItem: {
    // width: 260,
    height: 80,
    borderWidth: 1,
    borderColor: colors.lightTextColor,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingRight: responsiveWidth(4.5),
    paddingLeft: responsiveWidth(4),
    marginTop: -15,
  },

  liImgCont: {
    width: 102,
    height: 58,
  },

  liImg: {
    width: '100%',
    height: '100%',
  },

  txtCont: {
    display: 'flex',
    flexDirection: 'column',
    // gap: 2,
  },

  liName: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
  },

  liPrice: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: fonts.bai.medium,
    color: colors.red,
  },

  moneyContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: responsiveWidth(4),
    // paddingVertical: responsiveWidth(5),
    padding: 15,
    // marginVertical: 10,
  },

  textFieldCont: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.red,
    borderStyle: 'dashed',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    // marginVertical: 10,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.montserrat.bold,
    // marginLeft: 10,
  },

  textFieldBtn: {
    backgroundColor: colors.red,
    width: 34,
    height: 34,
    borderRadius: 15000,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightTextColor,
  },

  name: {
    fontSize: responsiveFontSize(2),
    fontFamily: fonts.montserrat.bold,
    // marginBottom: 5,
    color: colors.black,
  },
  separator: {
    height: 1,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    borderWidth: 0.8,
    // marginVertical: 10,
  },
  label: {
    fontSize: 12,
    color: colors.lightTextColor,
    // fontWeight: '400',
    fontFamily: fonts.montserrat.medium,
  },

  grandTotalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  grandTotalValue: {
    fontSize: 14,
    // fontWeight: '600',
    fontFamily: fonts.montserrat.bold,
    color: colors.red,
  },

  orderedItemsContainer: {
    marginTop: -14,
    backgroundColor: colors.white,
  },

  flatListContent: {
    gap: 10,
    paddingHorizontal: responsiveWidth(3),
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
    // borderColor: colors.borderColor,
    elevation: 10,
    shadowOffset: {width: 2, height: 6},
    shadowColor: colors.greyColor,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
  },

  details: {
    marginLeft: 10,
    justifyContent: 'center',
    gap: Platform.OS === 'ios' ? 9 : responsiveHeight(0.3),
    paddingTop: Platform.OS === 'ios' ? 18 : responsiveHeight(1.6),
    paddingLeft: 8,
    // marginBottom: 60
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
    fontSize: responsiveFontSize(1.5),
    color: colors.lightTextColor,
    fontFamily: fonts.montserrat.medium,
    lineHeight: 20,
    paddingBottom: 20,
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
});
