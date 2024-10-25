import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  editProfileImg,
  favoriteImg,
  shoppingBagImg,
  userProfileImg,
} from '../assets';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface ProfileScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

interface ProfileScreenState {
  selectedMenu: string;
}

export default class ProfileScreen extends Component<
  ProfileScreenProps,
  ProfileScreenState
> {
  constructor(props: ProfileScreenProps) {
    super(props);
    this.state = {
      selectedMenu: '',
    };
  }

  handleMenuPress = (menuName: string) => {
    this.setState({selectedMenu: menuName});
  };

  isActive = (menuName: string) => {
    return this.state.selectedMenu === menuName;
  };

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  renderMenuItem(
    iconName: string,
    label: string,
    menuName: string,
    IconComponent: any,
  ) {
    const isActive = this.isActive(menuName);
    return (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => this.handleMenuPress(menuName)}>
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: isActive ? '#DF201F' : '#FFE5E5'},
          ]}>
          <IconComponent
            name={iconName}
            size={20}
            color={isActive ? '#ffffff' : '#EF8382'}
            style={styles.menuIcon}
          />
        </View>
        <Text
          style={[styles.menuText, {color: isActive ? '#DF201F' : 'black'}]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.profileText}>Profile</Text>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.imgCont}>
            <Image source={userProfileImg} style={styles.profileImage} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Hi, Sachin</Text>
            <View style={styles.locationContainer}>
              <Icon name="map-marker" size={14} color="#999" />
              <Text style={styles.locationText}>Nagpur, Maharashtra</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Image source={shoppingBagImg} style={styles.profileImg} />
            <Text style={styles.actionText}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Image source={editProfileImg} style={styles.profileImg} />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {borderRightWidth: 0, paddingRight: 0},
            ]}>
            <AntDesign
              style={styles.heartImg}
              name="heart"
              size={24}
              color={colors.red}
            />
            <Text style={styles.actionText}>Favorite</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menu}>
          {this.renderMenuItem('home', 'Home', 'home', MaterialCommunityIcons)}
          {this.renderMenuItem(
            'brightness-percent',
            'Offers',
            'offers',
            MaterialCommunityIcons,
          )}
          {this.renderMenuItem(
            'message-alert',
            'Privacy Policy',
            'privacy',
            MaterialCommunityIcons,
          )}
          {this.renderMenuItem(
            'file-document',
            'Terms & Conditions',
            'terms',
            MaterialCommunityIcons,
          )}
          {this.renderMenuItem('logout', 'Logout', 'logout', MaterialIcons)}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  profileHeader: {
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
  profileText: {
    fontSize: 20,
    marginTop: 40,
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    marginLeft: 4,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
    gap: 5,
  },
  imgCont: {},
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    color: colors.black,
    fontWeight: '700',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    marginLeft: 5,
    color: '#999',
    fontFamily: fonts.montserrat.medium,
  },
  menu: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: colors.greyColor,
    borderBottomWidth: 1,
    gap: 25,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {},
  menuText: {
    fontSize: 20,
    fontFamily: fonts.bai.semiBold,
  },

  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: responsiveWidth(10),
    borderRadius: 10,
    shadowColor: Platform.OS === 'ios' ? '#F5ECE2' : '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
    backgroundColor: '#FFF',
    marginHorizontal: responsiveWidth(4),
    height: 95,
    paddingVertical: 13,
  },
  actionButton: {
    alignItems: 'center',
    // padding: 10,
    backgroundColor: '#FFF',
    paddingRight: responsiveWidth(7),
    borderRightWidth: 1,
    borderRightColor: colors.greyColor,
    gap: 10,
  },
  actionText: {
    // marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
    // color: '#555',
  },

  profileImg: {
    height: 34,
    width: 34,
    color: colors.greyColor,
  },

  heartImg: {
    marginTop: 10,
  },
});
