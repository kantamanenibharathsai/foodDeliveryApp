import {Component} from 'react';
import {View, Text, StyleSheet, Platform, Alert, FlatList} from 'react-native';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {fonts} from '../constants/fonts';
import {colors} from 'react-native-elements';
import {burgerPizzaImg} from '../assets';
import CartItem from '../components/CartItem';
import CustomButton from '../components/Button';

interface Item {
  id: number;
  name: string;
  image: any;
  price: number;
  originalPrice: number;
}

interface AppState {
  cartItems: Item[];
}

class CartScreen extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cartItems: [
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

  render() {
    return (
      <View style={styles.addToCartCont}>
        <View style={styles.cartHeader}>
          <Text style={styles.cartText}>Cart</Text>
        </View>
        <FlatList
          data={this.state.cartItems}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <CartItem item={item} onRemove={this.handleRemoveItem} />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
        <CustomButton title={'CHECKOUT'} onPress={() => { /* Handle button press */}} />
      </View>
    );
  }
}

export default CartScreen;

const styles = StyleSheet.create({
  addToCartCont: {
    flex: 1,
  },

  cartHeader: {
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? '#F5ECE2' : '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 1,
    height: 98,
  },

  cartText: {
    fontSize: 20,
    marginTop: 55,
    fontFamily: fonts.montserrat.bold,
    color: colors.black,
    marginLeft: 16,
  },

  listContainer: {
    paddingTop: responsiveHeight(2.8),
    paddingHorizontal: responsiveWidth(3.1),
  },
});
