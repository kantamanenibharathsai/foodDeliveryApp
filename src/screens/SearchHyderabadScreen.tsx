import {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import { arrowBackImg } from '../assets';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import SearchHydComponentScreen from '../components/SearchHydComponentScreen';


interface Props {
  navigation: NavigationProp<ParamListBase>;
}

class SearchHydScreen extends Component<Props> {
  handleGoBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={styles.searchHydCont}>
        <View style={styles.searchHydHeader}>
          <TouchableOpacity
            onPress={this.handleGoBack}
            style={{
              width: 55,
              height: 68,
              borderColor: '#e7e7e9',
              borderWidth: 1,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={arrowBackImg} style={{width: 28, height: 28}} />
          </TouchableOpacity>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.input}
              placeholderTextColor={colors.black}
              placeholder="Search.."
            />
            <IonicIcons name="search" size={20} color={colors.black} />
          </View>
        </View>
        <SearchHydComponentScreen />
      </View>
    );
  }
}

export default SearchHydScreen;

const styles = StyleSheet.create({
  searchHydCont: {
    flex: 1,
  },

  searchHydHeader: {
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? '#F5ECE2' : '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 1,
    height: 133,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(5)

  },

  leftIcon: {
    marginTop: 40,
    marginLeft: 5,
  },

  restNearByText: {
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
    flex: 1
  },
  input: {
    flex: 1,
    paddingHorizontal: responsiveWidth(1),
    borderRadius: 12,
    fontSize: 16,
    height: '100%',
    color: colors.black,
  },
});
