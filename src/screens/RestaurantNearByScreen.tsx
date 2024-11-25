import {Component} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import RestaurantNearByScreenVertical from '../components/RestuarantNearByScreenVertical';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {ApiStatusConstants} from '../redux/slices/AuthSlice';
import {
  RestaurantNearByGetInterface,
  restNearByGetGetAction,
} from '../redux/slices/HomeSlice';
import {AppDispatch, RootState} from '../redux/store';
import {connect} from 'react-redux';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

class RestaurantNearByScreen extends Component<Props> {
  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.restNearByCont}>
        <View style={styles.restNearByHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.restNearByText}>Restaurant Nearby</Text>
        </View>
        <RestaurantNearByScreenVertical />
      </View>
    );
  }
}



export default RestaurantNearByScreen;

const styles = StyleSheet.create({
  restNearByCont: {
    flex: 1,
  },

  restNearByHeader: {
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? '#F5ECE2' : '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 1,
    height: 98,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
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
});
