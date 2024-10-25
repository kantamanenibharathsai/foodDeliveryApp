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
import {ellipseImg, targetImg} from '../assets';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

class SearchLocationScreen extends Component<Props> {
  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  addressData = Array.from({length: 30}, (_, i) => ({
    id: i.toString(),
    name: `Golden Fish Restaurant ${i + 1}`,
    address: 'Manish Nagar, Ingole Nagar, Sonegaon, Nagpur',
  }));

  renderAddressItem = ({item}: {item: {name: string; address: string}}) => (
    <View style={styles.addressCont}>
      <Entypo name="location-pin" size={21} color={colors.black} />
      <View style={styles.addressTextCont}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.searchLocCont}>
        <View style={styles.searchLocHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.searchLocText}>Search Location</Text>
        </View>

        <View style={styles.bodyCont}>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.input}
              placeholderTextColor={colors.black}
              placeholder="Search.."
            />
            <IonicIcons name="search" size={20} color={colors.black} />
          </View>

          <View style={styles.savedAddressCont}>
            <Text style={styles.savedAddressText}>Saved Addresses</Text>
          </View>
          <FlatList
            data={this.addressData}
            renderItem={this.renderAddressItem}
            keyExtractor={item => item.id}
            numColumns={1}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>

        <ImageBackground source={ellipseImg} style={styles.ellipseImage}>
          <Image source={targetImg} style={styles.targetImage} />
        </ImageBackground>
      </View>
    );
  }
}

export default SearchLocationScreen;

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
});
