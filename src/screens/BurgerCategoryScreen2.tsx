import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import {
  bestChoiceBellIconImg,
  bestChoiceBurgerImg,
  hamburgerCheeseBurgerSushiBaconBurgerPizzaImg,
  burgerCategory2Img,
  pizzaCategoryImg,
} from '../assets';
import {colors} from '../utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {BestChoiceHomeImgs} from '../utils/Data';
import {fonts} from '../constants/fonts';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

export class BurgerCategoryScreenTwo extends Component<Props> {
  goBackHandler = () => {
    this.props.navigation.navigate('RestNearByScreen');
  };

  renderItem = () => {
    return (
      <View style={styles.bestChoiceHomeCont}>
        <View style={styles.bestChoiceFoodImgCont}>
          <Image
            source={hamburgerCheeseBurgerSushiBaconBurgerPizzaImg}
            style={styles.bestChoiceFoodImg}
          />
        </View>
        <View style={styles.bodyCardCont}>
          <Text style={styles.restaurantName}>Hamburger</Text>
          <View style={styles.rupeeCont}>
            <FontAwesome name="rupee" color={colors.red} size={15} />
            <Text style={styles.price}>90</Text>
          </View>
        </View>
        <View style={styles.whiteCircle}>
          <AntDesign name="plus" size={25} />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
          barStyle={'light-content'}
        />
        <ImageBackground
          style={styles.headerContainer}
          source={burgerCategory2Img}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={this.goBackHandler}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
        </ImageBackground>
        <FlatList
          data={BestChoiceHomeImgs}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatList}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    );
  }
}

export default BurgerCategoryScreenTwo;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},

  headerContainer: {
    paddingHorizontal: responsiveWidth(4),
    height: 175,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(6.8),
  },

  bodyCont: {
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: 100,
  },

  bodyCardCont: {
    paddingVertical: responsiveHeight(3.5),
  },

  flatList: {
    gap: 15,
    paddingVertical: responsiveHeight(3.5),
    paddingHorizontal: responsiveWidth(4),
  },

  bestChoiceHomeCont: {
    backgroundColor: '#FFF3E5',
    borderRadius: 20,
    height: 175,
    width: '48%',
    alignItems: 'center',
    position: 'relative',
    padding: responsiveHeight(1.25),
    paddingVertical: responsiveHeight(3.2),
    marginVertical: responsiveHeight(4),
    justifyContent: 'space-between',
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
    marginTop: 12,
  },

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
    marginTop: 6,
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
    shadowColor: Platform.OS === 'android' ? '#000' : '#FFE5E5',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 3.1,
    shadowRadius: 35,
    elevation: 10,
  },

  plusIcon: {
    width: 40,
    height: 40,
    color: colors.black,
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },
});
