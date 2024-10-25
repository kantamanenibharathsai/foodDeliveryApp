import {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {ellipseImg, notifiEllipseImg, targetImg, tickImg} from '../assets';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

class NotificationsScreen extends Component<Props> {
  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.searchLocCont}>
        <View style={styles.searchLocHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.searchLocText}>Notifications</Text>
        </View>

        <View style={styles.bodyCont}>
          <View style={styles.notifiCardCont}>
            <View style={styles.imageCont}>
              <Image source={notifiEllipseImg} style={styles.image} />
              <Image
                source={tickImg}
                style={{position: 'absolute', top: '30%', bottom: '50%'}}
              />
            </View>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.bai.semiBold,
                    fontSize: 18,
                    color: colors.black,
                  }}>
                  Order Placed
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.montserrat.medium,
                    fontSize: 15,
                    color: '#919592',
                  }}>
                  12: 20pm
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: fonts.montserrat.medium,
                  fontSize: 15,
                  color: '#919592',
                }}>
                Your Order has been placed successfully
              </Text>
            </View>
          </View>

          <View style={styles.notifiCardCont}>
            <View style={styles.imageCont}>
              <Image source={notifiEllipseImg} style={styles.image} />
              <Image
                source={tickImg}
                style={{position: 'absolute', top: '30%', bottom: '50%'}}
              />
            </View>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.bai.semiBold,
                    fontSize: 18,
                    color: colors.black,
                  }}>
                  Get 30% Off burger
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.montserrat.medium,
                    fontSize: 15,
                    color: '#919592',
                  }}>
                  12: 20pm
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: fonts.montserrat.medium,
                  fontSize: 15,
                  color: '#919592',
                }}>
                Your Order has been placed successfully
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default NotificationsScreen;

const styles = StyleSheet.create({
  searchLocCont: {
    flex: 1,
  },
  searchLocHeader: {
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
  searchLocText: {
    fontSize: 20,
    marginTop: 40,
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    marginLeft: 4,
  },
  inputCont: {
    height: 68,
    paddingHorizontal: responsiveWidth(4),
    backgroundColor: '#F0EFFB',
    borderRadius: 12,
    fontSize: 16,
    color: colors.black,
    shadowColor: Platform.OS === 'ios' ? '#fff3e5' : '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 3,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E7E7E9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: responsiveWidth(1),
    borderRadius: 12,
    fontSize: 16,
    height: '100%',
    color: colors.black,
  },
  bodyCont: {
    paddingVertical: responsiveWidth(5),
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: 60,
  },
  savedAddressCont: {
    marginTop: 20,
  },
  savedAddressText: {
    fontSize: 18,
    fontFamily: fonts.bai.semiBold,
    color: colors.red,
  },
  addressCont: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 14,
  },
  addressTextCont: {
    gap: Platform.OS === 'ios' ? responsiveHeight(0.8) : responsiveHeight(0),
  },
  name: {
    fontSize: 16,
    marginTop: -5,
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
  },
  address: {
    fontSize: 12,
    color: colors.lightTextColor,
    fontFamily: fonts.montserrat.medium,
    marginTop: -2,
    fontWeight: '600',
  },
  flatListContainer: {
    gap: 1,
    marginTop: responsiveHeight(1),
    paddingBottom: 210,
  },
  ellipseImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 98,
    width: 98,
  },
  targetImage: {
    position: 'absolute',
    bottom: 33,
    right: 33,
    height: 34,
    width: 34,
  },

  notifiCardCont: {
    borderWidth: 2,
    borderColor: '#cfe4d4',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingRight: 20,
    gap: 15,
    backgroundColor: '#cfe4d4',
    marginBottom: 20
    // justifyContent: 'center',
  },

  imageCont: {
    width: 60,
    height: 60,
    // borderWidth: 2,
    // borderColor: '#000',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  tickImg: {
    width: 26,
    height: 26,
  },
});
