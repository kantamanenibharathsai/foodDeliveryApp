import {Component} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import TodaySpecial from '../components/TodaySpecial';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

class TodaySpecialScreen extends Component<Props> {
  handleGoBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={styles.todaySpecialCont}>
        <View style={styles.todaySpecialHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.restNearByText}>Today Special</Text>
        </View>
        <View style={styles.bodyCont}>
          <TodaySpecial />
        </View>
      </View>
    );
  }
}

export default TodaySpecialScreen;

const styles = StyleSheet.create({
  todaySpecialCont: {
    flex: 1,
  },

  todaySpecialHeader: {
    backgroundColor: '#fff',
    shadowColor: '#F5ECE2',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 6,
    height: 98,
    flexDirection: 'row',
    alignItems: 'center',
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

  bodyCont: {
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: 100,
  },
});
