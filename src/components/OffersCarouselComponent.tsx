import {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {
  bestChoiceBellIconImg,
  bestChoiceBurgerImg,
  plusIconImg,
} from '../assets';
import {fonts} from '../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const DATA = [
  {id: '1', foodName: 'Burger', price: 90, image: bestChoiceBurgerImg},
  {id: '2', foodName: 'Pizza', price: 120, image: bestChoiceBurgerImg},
  {id: '3', foodName: 'Pasta', price: 150, image: bestChoiceBurgerImg},
  {id: '4', foodName: 'Sandwich', price: 80, image: bestChoiceBurgerImg},
  {id: '5', foodName: 'Fries', price: 50, image: bestChoiceBurgerImg},
  {id: '6', foodName: 'Fries', price: 50, image: bestChoiceBurgerImg},
  {id: '7', foodName: 'Fries', price: 50, image: bestChoiceBurgerImg},
  {id: '8', foodName: 'Fries', price: 50, image: bestChoiceBurgerImg},
  {id: '9', foodName: 'Fries', price: 50, image: bestChoiceBurgerImg},
  {id: '10', foodName: 'Fries', price: 50, image: bestChoiceBurgerImg},
];

class OffersCarouselComponent extends Component {
  renderItem = () => {
    return (
      <View style={styles.offersCarouselHomeCont}>
        <View style={styles.bestChoiceFoodImgCont}>
          <Image
            source={bestChoiceBurgerImg}
            style={styles.bestChoiceFoodImg}
            // resizeMode="contain"
          />
        </View>
        <View style={styles.bodyCont}>
          <Text style={styles.bestChoiceFoodText}>Burger</Text>
          <View style={styles.rupeeCont}>
            <FontAwesome
              name="rupee"
              style={styles.rupeeIcon}
              color={colors.red}
              size={15}
            />
            <Text style={styles.price}>90</Text>
          </View>

          <Image source={bestChoiceBellIconImg} style={styles.bellIconImg} />
          <Text style={styles.restaurantName}>Barbeque Nation</Text>
        </View>
        <View style={styles.whiteCircle}>
          <AntDesign name="plus" size={25} />
          {/* <Image source={plusIconImg} style={styles.plusIcon} /> */}
        </View>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={DATA}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatList}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
      />
    );
  }
}

export default OffersCarouselComponent;

const styles = StyleSheet.create({
  flatList: {
    // alignItems: 'center',
    // flexDirection: 'row',
    // gap: 20,
    paddingHorizontal: responsiveWidth(3.8),
    justifyContent: 'space-between',
    // alignItems: '',
    // flex: 1,
    columnGap: 40,
    paddingTop: responsiveWidth(5),
    paddingBottom: 210,
    borderWidth: 2,
    borderColor: "red"
  },

  columnWrapper: {
    justifyContent: "space-between"
  },

  offersCarouselHomeCont: {
    backgroundColor: '#FFF3E5',
    borderRadius: 20,
    height: 245,
    width: 174,
    alignItems: 'center',
    position: 'relative',
    padding: responsiveHeight(1.25),
    paddingVertical: responsiveHeight(3.2),
    marginVertical: responsiveHeight(4),
    justifyContent: 'space-between',
    // paddingHorizontal: responsiveWidth(1.2),
  },

  bestChoiceFoodImgCont: {
    width: '100%',
    height: responsiveHeight(10),
    alignItems: 'center',
    position: 'absolute',
    top: -35,
  },

  bestChoiceFoodImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  bodyCont: {
    position: 'relative',
    top: 29,
    alignItems: 'center',
  },

  bestChoiceFoodText: {
    color: '#212121',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fonts.bai.medium,
  },

  rupeeCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  rupeeIcon: {},

  price: {
    color: '#FF5722',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fonts.montserrat.medium,
    marginTop: -3,
  },

  bellIconImg: {
    width: 24,
    height: 24,
    marginTop: 8,
  },

  restaurantName: {
    color: colors.black,
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: fonts.bai.medium,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
  },

  whiteCircle: {
    width: 64,
    height: 64,
    borderRadius: 100,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    bottom: -30,
    shadowColor: '#FFE9D0',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 35,
    elevation: 10,
  },

  plusIcon: {
    width: 40,
    height: 40,
    color: colors.black,
  },
});
