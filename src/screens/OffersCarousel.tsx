import {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import {fonts} from '../constants/fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {offerCarouselHeaderImg} from '../assets';
import OffersCarouselComponent from '../components/OffersCarouselComponent';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

class OffersCarouselScreen extends Component<Props> {
  goBackHandler = () => {
    this.props.navigation.navigate('RestNearByScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.headerContainer}
          source={offerCarouselHeaderImg}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={this.goBackHandler}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.titleText}>Super Veg</Text>
          <Text style={styles.subtitleText}>Delicious Pizza</Text>
          <Text style={styles.priceText}>₹100 ₹200</Text>
        </ImageBackground>
        <View style={styles.bodyCont}>
          <OffersCarouselComponent />
        </View>
      </View>
    );
  }
}

export default OffersCarouselScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: responsiveWidth(4),
    height: 207,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(6.5),
  },
  titleText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: fonts.bai.medium,
    color: colors.white,
    marginTop: -10,
  },
  subtitleText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: fonts.bai.medium,
    color: colors.white,
    marginTop: Platform.OS === 'ios' ? -20 : -30,
  },
  priceText: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: fonts.montserrat.medium,
    color: colors.red,
    marginTop: Platform.OS === 'ios' ? -15 : -20,
  },
  bodyCont: {
    paddingVertical: 50,
  },
});
