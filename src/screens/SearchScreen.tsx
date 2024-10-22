import {Component} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import {colors} from '../utils/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import IonicIcons from "react-native-vector-icons/Ionicons"
import { fonts } from '../constants/fonts';
import TodaySpecial from '../components/TodaySpecial';
import SearchScreenFood from '../components/SearchScreenFood';

class SearchScreen extends Component {
  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            paddingTop: responsiveHeight(8),
            paddingHorizontal: responsiveWidth(4),
            gap: 10,
          }}>
          <View style={styles.inputCont}>
            <IonicIcons name="search" size={20} color={colors.black} />
            <TextInput
              style={styles.input}
              placeholderTextColor={colors.lightTextColor}
              placeholder='Search..'
              // value={values.email}
              // onChangeText={handleChange('email')}
              // onBlur={handleBlur('email')}
            />
            <IonicIcons name="close" size={20} color={colors.black} />
          </View>
          <View style={{gap: 10}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: fonts.bai.medium,
                lineHeight: 40,
              }}>
              History
            </Text>
            <View style={styles.historyCont}>
              {[
                'Food Shop',
                'Best Biryani nearby',
                'Best Restaurant',
                'Food',
                'Chicken',
              ].map((item, index) => (
                <View
                  key={index}
                  style={{
                    paddingHorizontal: 20,
                    backgroundColor: colors.greyColor,
                    borderRadius: 5,
                    shadowColor: Platform.OS === 'ios' ? '#fff3e5' : '#000',
                    paddingVertical: 10,
                    marginBottom: 10,
                  }}>
                  <Text style={styles.historyTxt}>{item}</Text>
                </View>
              ))}
            </View>
            <SearchScreenFood />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default SearchScreen;



const styles = StyleSheet.create({
  inputCont: {
    height: 68,
    paddingHorizontal: responsiveWidth(4),
    backgroundColor: colors.white,
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
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: colors.white,
    borderRadius: 12,
    fontSize: 16,
    height: '100%',
    color: colors.black,
  },

  historyCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: -10,
    rowGap: 0
  },

  historyTxt: {
    fontFamily: fonts.montserrat.medium,
    color: colors.lightTextColor,
    fontSize: responsiveFontSize(1.5),
    // lineHeight: 20
  },
});
