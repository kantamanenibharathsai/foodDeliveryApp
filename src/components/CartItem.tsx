import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../utils/Colors';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {fonts} from '../constants/fonts';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    image: ImageSourcePropType;
    price: number;
    originalPrice: number;
  };
  onRemove: (id: number) => void;
}

interface CartItemState {
  quantity: number;
}

export default class CartItem extends Component<CartItemProps, CartItemState> {
  constructor(props: CartItemProps) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  incrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}));
  };

  decrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1,
    }));
  };

  render() {
    const {item, onRemove} = this.props;
    const {quantity} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.discountedPrice}>₹{item.price}</Text>
            <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
          </View>
          <View style={styles.controls}>
            <View style={styles.threeBtnsCont}>
              <TouchableOpacity
                onPress={this.decrementQuantity}
                style={styles.iconButton}>
                <Icon name="remove" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.quantity}>
                {String(quantity).padStart(2, '0')}
              </Text>
              <TouchableOpacity
                onPress={this.incrementQuantity}
                style={[styles.iconButton, {borderRightWidth: 0}]}>
                <Icon name="add" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => onRemove(item.id)}
              style={styles.trashButton}>
              <Icon name="delete" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingHorizontal: responsiveWidth(8),
    paddingVertical: responsiveWidth(4),
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    // gap:15
  },

  imageContainer: {
    width: '35%',
    height: 80,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.greyColor,
  },

  image: {
    width: '100%',
    height: '100%',
  },
  details: {},
  name: {
    fontSize: 18,
    fontFamily: fonts.montserrat.bold,
    marginBottom: 5,
    color: colors.black,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPrice: {
    fontSize: 15,
    color: colors.red,
    marginRight: 5,
    fontFamily: fonts.montserrat.bold,
  },
  originalPrice: {
    fontSize: 15,
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
    height: 38,
    borderRadius: 8,
  },

  iconButton: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: colors.lightTextColor,
  },
  quantity: {
    fontSize: 16,
    fontFamily: fonts.montserrat.bold,
    width: 40,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.lightTextColor,
    height: "100%",
    paddingTop: 7,

  },
  trashButton: {
    backgroundColor: colors.red,
    borderRadius: 5,
    width: 45,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
