import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  FlatList,
  ScrollView,
  ImageSourcePropType,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {burgerPizzaImg} from '../assets';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/Button';
import PaymentModal from '../components/ChooseYourPaymentMethod';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface Item {
  id: number;
  name: string;
  image: ImageSourcePropType;
  price: number;
  originalPrice: number;
}

const cartData: Item[] = [
  {
    id: 1,
    name: 'Hamburger',
    image: burgerPizzaImg,
    price: 100,
    originalPrice: 200,
  },
  {
    id: 2,
    name: 'Vegetarian Pizza',
    image: burgerPizzaImg,
    price: 100,
    originalPrice: 200,
  },
  {
    id: 3,
    name: 'Chicken Biryani',
    image: burgerPizzaImg,
    price: 100,
    originalPrice: 200,
  },
  {
    id: 4,
    name: 'Chicken Biryani',
    image: burgerPizzaImg,
    price: 100,
    originalPrice: 200,
  },
  {
    id: 5,
    name: 'Chicken Biryani',
    image: burgerPizzaImg,
    price: 100,
    originalPrice: 200,
  },
  {
    id: 6,
    name: 'Chicken Biryani',
    image: burgerPizzaImg,
    price: 100,
    originalPrice: 200,
  },
  {
    id: 7,
    name: 'Chicken Biryani',
    image: burgerPizzaImg,
    price: 100,
    originalPrice: 200,
  },
];

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

interface State {
  cartItems: Item[];
  quantity: number;
  isModalVisible: boolean;
}

class CheckoutScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cartItems: cartData,
      quantity: 1,
      isModalVisible: false,
    };
  }

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  mapHandler = () => {
    this.props.navigation.navigate('RestNearByScreen');
  };

  viewAllHandler = () => {
    this.props.navigation.navigate('TodaySpecialScreen');
  };

  incrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}));
  };

  decrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1,
    }));
  };

  setIsModalVisible = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    return (
      <>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
          barStyle={'light-content'}
        />
        <View style={styles.reviewsHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.reviewsText}>Checkout</Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.bodyCont}>
            <View style={styles.orderItemDetailsCont}>
              <Text style={styles.commonName}>Order Item details</Text>
              <ScrollView>
                <FlatList
                  data={this.state.cartItems}
                  //   showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <View style={styles.orderItemProductontainer}>
                      <View style={styles.imageContainer}>
                        <Image source={item.image} style={styles.image} />
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={styles.priceRow}>
                          <Text style={styles.discountedPrice}>
                            ₹{item.price}
                          </Text>
                          <Text style={styles.originalPrice}>
                            ₹{item.originalPrice}
                          </Text>
                        </View>
                        <View style={styles.controls}>
                          <View style={styles.threeBtnsCont}>
                            <TouchableOpacity
                              onPress={this.decrementQuantity}
                              style={styles.iconButton}>
                              <Icon name="remove" size={16} color="#000" />
                            </TouchableOpacity>
                            <Text style={styles.quantity}>
                              {String(this.state.quantity).padStart(2, '0')}
                            </Text>
                            <TouchableOpacity
                              onPress={this.incrementQuantity}
                              style={[
                                styles.iconButton,
                                {borderRightWidth: 0},
                              ]}>
                              <Icon name="add" size={16} color="#000" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={styles.listContainer}
                />
              </ScrollView>
            </View>

            <View style={styles.couponOnCodeCont}>
              <Text style={styles.commonName}>Coupon on Code</Text>
              <View style={styles.textFieldCont}>
                <TextInput
                  style={styles.textInput}
                  //   value={couponCode}
                  //   onChangeText={setCouponCode}
                  placeholder="Enter Coupon Code"
                  placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.textFieldBtn}>
                  <Entypo name="chevron-right" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
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
              <View style={[styles.row, {borderBottomWidth: 0}]}>
                <Text style={styles.label}>Coupon Discount</Text>
                <Text style={styles.label}>₹30</Text>
              </View>
              <View style={styles.separator} />
              <View style={[styles.row, {borderBottomWidth: 0}]}>
                <Text style={styles.name}>Grand Total</Text>
                <Text style={styles.grandTotalValue}>₹324</Text>
              </View>
            </View>
            <View style={styles.orderItemDetailsCont}>
              <Text style={styles.commonName}>Order Item Details</Text>
              <View style={styles.yellowCont}>
                <View style={styles.radioCont}>
                  <Icon name="radio-button-on" size={22} />
                </View>
                <Text style={styles.address}>
                  Old Agra Rd, teka Naka, Gaikwad Nagar, Nagpur, Maharashtra
                  441001
                </Text>
                <View style={styles.btnsCont}>
                  <Icon name="mode-edit" size={22} color={colors.black} />
                  <Icon name="delete" size={22} color={colors.black} />
                </View>
              </View>
              <View style={styles.yellowCont}>
                <View style={styles.radioCont}>
                  <Icon name="radio-button-on" size={23} />
                </View>
                <Text style={styles.address}>
                  Old Agra Rd, teka Naka, Gaikwad Nagar, Nagpur, Maharashtra
                  441001
                </Text>
                <View style={styles.btnsCont}>
                  <Icon name="mode-edit" size={23} color={colors.black} />
                  <Icon name="delete" size={22} color={colors.black} />
                </View>
              </View>
              <Text style={styles.addNewAddress}>Add New Delivery Address</Text>
              <CustomButton
                title={'CONTINUE'}
                onPress={this.setIsModalVisible}
              />
            </View>
          </View>
        </ScrollView>
        {this.state.isModalVisible && (
          <GestureHandlerRootView style={styles.container}>
            <PaymentModal setIsModalVisible={this.setIsModalVisible} />
          </GestureHandlerRootView>
        )}
      </>
    );
  }
}

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  reviewsHeader: {
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

  reviewsText: {
    fontSize: 20,
    marginTop: 40,
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    marginLeft: 4,
  },

  bodyCont: {
    flex: 1,
    backgroundColor: '#F6f6f6',
    // paddingHorizontal: responsiveWidth(4),
    // paddingVertical: responsiveWidth(5),
  },

  orderItemDetailsCont: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveWidth(5),
    gap: 10,
    backgroundColor: colors.white,
  },

  commonName: {
    fontSize: responsiveFontSize(2.2),
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
  },

  cardCont: {
    backgroundColor: colors.white,
    borderRadius: 15,
    width: '100%',
    paddingLeft: 20,
    gap: 20,
    paddingBottom: 30,
  },

  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    gap: 5,
  },

  imgCont: {},
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  //   userName: {
  //     fontSize: responsiveFontSize(2.2),
  //     color: colors.black,
  //     fontFamily: fonts.bai.semiBold,
  //   },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    marginLeft: 5,
    color: '#999',
    fontFamily: fonts.montserrat.medium,
  },

  cardTxt: {
    fontSize: responsiveFontSize(2.0),
    color: colors.lightTextColor,
    fontFamily: fonts.bai.semiBold,
    lineHeight: 26,
  },

  reviewsCardImgsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 20,
    gap: 10,
  },

  reviewCardImg: {
    width: 214,
    height: 104,
    borderRadius: 5,
  },

  ImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  reviewCardImgContTwo: {
    width: 130,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },

  contentContainerStyle: {
    gap: 20,
    shadowColor: '#F5ECE2',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 10,
  },

  orderItemProductontainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveWidth(4),
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap: 25,
  },

  imageContainer: {
    width: '45%',
    height: 75,
    // borderRadius: 10,
    // borderWidth: 3,
    // borderColor: colors.greyColor,
  },

  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    // borderWidth: 3,
    // borderColor: colors.greyColor,
  },

  name: {
    fontSize: 14,
    fontFamily: fonts.montserrat.bold,
    // marginBottom: 5,
    color: colors.black,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  discountedPrice: {
    fontSize: 14,
    color: colors.red,
    marginRight: 5,
    fontFamily: fonts.montserrat.bold,
  },

  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: colors.red,
    fontFamily: fonts.montserrat.bold,
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 9,
  },

  threeBtnsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    height: 35,
    borderRadius: 8,
  },

  iconButton: {
    padding: 5,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: colors.lightTextColor,
  },
  quantity: {
    fontSize: 14,
    fontFamily: fonts.montserrat.bold,
    width: 40,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.lightTextColor,
    height: '100%',
    paddingTop: 7,
  },

  listContainer: {},

  couponOnCodeCont: {
    backgroundColor: colors.white,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveWidth(5),
    gap: 12,
  },

  moneyContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveWidth(5),
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 10,
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
  value: {
    fontSize: 16,
    color: '#444',
    fontWeight: '400',
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

  yellowCont: {
    backgroundColor: '#FFF3E5',
    height: 119,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffe3c1',
    flexDirection: 'row',
    paddingVertical: 19,
    paddingHorizontal: 14,
    gap: 18,
  },

  radioCont: {},

  address: {
    fontSize: 17,
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
    lineHeight: 26,
    flex: 1,
  },

  btnsCont: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  addNewAddress: {
    fontSize: 15,
    color: colors.red,
    fontFamily: fonts.bai.semiBold,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
