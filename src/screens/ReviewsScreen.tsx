import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  useResponsiveWidth,
} from 'react-native-responsive-dimensions';
import RatingComponent from '../components/RatingComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {foodHomeImages} from '../utils/Data';
import BestChoiceHome from '../components/BestChoiceHome';
import TodaySpecial from '../components/TodaySpecial';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  reviewCardImg,
  reviewCardScaleImg,
  reviewsUserImg,
  userProfileImg,
} from '../assets';

interface Person {
  id: string;
  name: string;
  role: string;
  image: string;
}

const teamData: Person[] = [
  {
    id: '1',
    name: 'Prasad Singh',
    role: 'Manager',
    image:
      'https://s3-alpha-sig.figma.com/img/7426/7aa9/ebaab2639afb8cfcadd5f9cbcca5358c?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AOzCuF-RF7pd8CS3T0n669M3sLVWi6dV7beEqzpEZm6VWJ5XXTfxIUybpfQVI4-2CzDjgaNivytDwfuLubTUEqerZVw677qlXgY1BHhQ9pO0GvOLqd7y8S4xAjuJDPjldg2pL2-c~X6zen-GKNNLSrxg3aiNvU7MFmNSXcdhBn1LZqm76wx3~6nqHYVZOf8KI3PFnoE2bq1-DxjmUZ8GzeEQeKmrX04GP2vEps2GqyYQoKyPF4IHFmP~mP-WaPMZXg0-mBqRXI6-JLym4SKrjoBySAYpgNC2~hMlbTT5LQvY6HO7EFPDXxKiv2LZRFnXilnGzoDx956wrkR8sh92nA__',
  },
  {
    id: '2',
    name: 'Mohan Lal',
    role: 'Chef',
    image:
      'https://s3-alpha-sig.figma.com/img/7426/7aa9/ebaab2639afb8cfcadd5f9cbcca5358c?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AOzCuF-RF7pd8CS3T0n669M3sLVWi6dV7beEqzpEZm6VWJ5XXTfxIUybpfQVI4-2CzDjgaNivytDwfuLubTUEqerZVw677qlXgY1BHhQ9pO0GvOLqd7y8S4xAjuJDPjldg2pL2-c~X6zen-GKNNLSrxg3aiNvU7MFmNSXcdhBn1LZqm76wx3~6nqHYVZOf8KI3PFnoE2bq1-DxjmUZ8GzeEQeKmrX04GP2vEps2GqyYQoKyPF4IHFmP~mP-WaPMZXg0-mBqRXI6-JLym4SKrjoBySAYpgNC2~hMlbTT5LQvY6HO7EFPDXxKiv2LZRFnXilnGzoDx956wrkR8sh92nA__',
  },
  {
    id: '3',
    name: 'Mohan Lal',
    role: 'Chef',
    image:
      'https://s3-alpha-sig.figma.com/img/7426/7aa9/ebaab2639afb8cfcadd5f9cbcca5358c?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AOzCuF-RF7pd8CS3T0n669M3sLVWi6dV7beEqzpEZm6VWJ5XXTfxIUybpfQVI4-2CzDjgaNivytDwfuLubTUEqerZVw677qlXgY1BHhQ9pO0GvOLqd7y8S4xAjuJDPjldg2pL2-c~X6zen-GKNNLSrxg3aiNvU7MFmNSXcdhBn1LZqm76wx3~6nqHYVZOf8KI3PFnoE2bq1-DxjmUZ8GzeEQeKmrX04GP2vEps2GqyYQoKyPF4IHFmP~mP-WaPMZXg0-mBqRXI6-JLym4SKrjoBySAYpgNC2~hMlbTT5LQvY6HO7EFPDXxKiv2LZRFnXilnGzoDx956wrkR8sh92nA__',
  },
  {
    id: '4',
    name: 'Mohan Lal',
    role: 'Chef',
    image:
      'https://s3-alpha-sig.figma.com/img/7426/7aa9/ebaab2639afb8cfcadd5f9cbcca5358c?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AOzCuF-RF7pd8CS3T0n669M3sLVWi6dV7beEqzpEZm6VWJ5XXTfxIUybpfQVI4-2CzDjgaNivytDwfuLubTUEqerZVw677qlXgY1BHhQ9pO0GvOLqd7y8S4xAjuJDPjldg2pL2-c~X6zen-GKNNLSrxg3aiNvU7MFmNSXcdhBn1LZqm76wx3~6nqHYVZOf8KI3PFnoE2bq1-DxjmUZ8GzeEQeKmrX04GP2vEps2GqyYQoKyPF4IHFmP~mP-WaPMZXg0-mBqRXI6-JLym4SKrjoBySAYpgNC2~hMlbTT5LQvY6HO7EFPDXxKiv2LZRFnXilnGzoDx956wrkR8sh92nA__',
  },
  {
    id: '5',
    name: 'Mohan Lal',
    role: 'Chef',
    image:
      'https://s3-alpha-sig.figma.com/img/7426/7aa9/ebaab2639afb8cfcadd5f9cbcca5358c?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AOzCuF-RF7pd8CS3T0n669M3sLVWi6dV7beEqzpEZm6VWJ5XXTfxIUybpfQVI4-2CzDjgaNivytDwfuLubTUEqerZVw677qlXgY1BHhQ9pO0GvOLqd7y8S4xAjuJDPjldg2pL2-c~X6zen-GKNNLSrxg3aiNvU7MFmNSXcdhBn1LZqm76wx3~6nqHYVZOf8KI3PFnoE2bq1-DxjmUZ8GzeEQeKmrX04GP2vEps2GqyYQoKyPF4IHFmP~mP-WaPMZXg0-mBqRXI6-JLym4SKrjoBySAYpgNC2~hMlbTT5LQvY6HO7EFPDXxKiv2LZRFnXilnGzoDx956wrkR8sh92nA__',
  },
  {
    id: '6',
    name: 'Mohan Lal',
    role: 'Chef',
    image:
      'https://s3-alpha-sig.figma.com/img/7426/7aa9/ebaab2639afb8cfcadd5f9cbcca5358c?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AOzCuF-RF7pd8CS3T0n669M3sLVWi6dV7beEqzpEZm6VWJ5XXTfxIUybpfQVI4-2CzDjgaNivytDwfuLubTUEqerZVw677qlXgY1BHhQ9pO0GvOLqd7y8S4xAjuJDPjldg2pL2-c~X6zen-GKNNLSrxg3aiNvU7MFmNSXcdhBn1LZqm76wx3~6nqHYVZOf8KI3PFnoE2bq1-DxjmUZ8GzeEQeKmrX04GP2vEps2GqyYQoKyPF4IHFmP~mP-WaPMZXg0-mBqRXI6-JLym4SKrjoBySAYpgNC2~hMlbTT5LQvY6HO7EFPDXxKiv2LZRFnXilnGzoDx956wrkR8sh92nA__',
  },
];

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const {width} = Dimensions.get('window');

class ReviewsScreen extends Component<Props> {
  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  mapHandler = () => {
    this.props.navigation.navigate('RestNearByScreen');
  };

  viewAllHandler = () => {
    this.props.navigation.navigate('TodaySpecialScreen');
  };

  //   renderItem = ({item}: {item: Person}) => (
  //     <View style={styles.card}>
  //       <View style={styles.imageCont}>
  //         <Image source={{uri: item.image}} style={styles.image} />
  //       </View>
  //       <View style={styles.cardTxtCont}>
  //         <Text style={styles.cardName}>{item.name}</Text>
  //         <Text style={styles.role}>{item.role}</Text>
  //       </View>
  //     </View>
  //   );
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.reviewsHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.reviewsText}>Reviews</Text>
        </View>
        <View style={styles.bodyCont}>
          {/* <View style={styles.cardCont}>
            <View style={styles.profileInfo}>
              <View style={styles.imgCont}>
                <Image source={reviewsUserImg} style={styles.profileImage} />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Rajesh Singh</Text>
                <RatingComponent ratingNum={5} />
              </View>
            </View>
            <Text style={styles.cardTxt}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </Text>
            {/* <View style={styles.reviewsCardImgsCont}>
                  <Image source={reviewCardImg} style={styles.reviewCardImg} />
                  <View style={styles.ImgContainer}>
                    <ImageBackground
                      source={reviewCardImg}
                      style={styles.reviewCardImgContTwo}
                      imageStyle={{borderRadius: 12}}>
                      <View style={styles.overlay}>
                        <Text style={styles.text}>3+</Text>
                      </View>
                    </ImageBackground>
                  </View>
                </View> */}
          {/* </View> */}
          <FlatList
            // contentContainerStyle={styles.flatListStyle}
            // horizontal
            data={foodHomeImages}
            renderItem={({item}) => (
              <View style={styles.cardCont}>
                <View style={styles.profileInfo}>
                  <View style={styles.imgCont}>
                    <Image
                      source={reviewsUserImg}
                      style={styles.profileImage}
                    />
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>Rajesh Singh</Text>
                    <RatingComponent ratingNum={5} />
                  </View>
                </View>
                <Text style={styles.cardTxt}>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </Text>
                <View style={styles.reviewsCardImgsCont}>
                  <Image source={reviewCardImg} style={styles.reviewCardImg} />
                  <View style={styles.ImgContainer}>
                    <ImageBackground
                      source={reviewCardImg}
                      style={styles.reviewCardImgContTwo}
                      imageStyle={{borderRadius: 12}}>
                      <View style={styles.overlay}>
                        <Text style={styles.text}>3+</Text>
                      </View>
                    </ImageBackground>
                  </View>
                </View>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
      </ScrollView>
    );
  }
}

export default ReviewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  reviewsHeader: {
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
  reviewsText: {
    fontSize: 20,
    marginTop: 40,
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    marginLeft: 4,
  },
  bodyCont: {
    flex: 1,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveWidth(5),
  },

  cardCont: {
    backgroundColor: colors.white,
    borderRadius: 15,
    width: '100%',
    paddingLeft: 20,
    gap: 20,
    paddingBottom: 30,
  },

  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    gap: 5,
  },

  imgCont: {},
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: responsiveFontSize(2.2),
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
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

  cardTxt: {
    fontSize: responsiveFontSize(2.0),
    color: colors.lightTextColor,
    fontFamily: fonts.bai.semiBold,
    lineHeight: 26,
  },

  reviewsCardImgsCont: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 20,
    gap: 10,
  },

  reviewCardImg: {
    width: 214,
    height: 104,
    borderRadius: 5,
  },

  ImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  reviewCardImgContTwo: {
    width: 130,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },

  contentContainerStyle: {
    gap: 20,
    shadowColor: '#F5ECE2',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 10,
  },

  

  //   imgsCont : {
  //     flexDirection: 'row',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     marginTop: 20,
  //     gap: 10,
  //   }
  //   details: {
  //     marginLeft: 10,
  //     justifyContent: 'center',
  //     gap: Platform.OS === 'ios' ? 9 : responsiveHeight(0.3),
  //     paddingVertical: Platform.OS === 'ios' ? 18 : responsiveHeight(2),
  //     paddingLeft: 8,
  //   },
  //   name: {
  //     fontSize: 20,
  //     color: colors.black,
  //     fontFamily: fonts.bai.semiBold,
  //   },
  //   kmsRatingCont: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     gap: 15,
  //   },
  //   kmsCont: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     gap: 1,
  //   },
  //   price: {
  //     fontSize: 15,
  //     fontWeight: '600',
  //     color: colors.red,
  //     marginRight: 3,
  //     fontFamily: fonts.bai.medium,
  //   },
  //   originalPrice: {
  //     fontSize: 14,
  //     textDecorationLine: 'line-through',
  //     color: colors.red,
  //   },
  //   imgTxtCont: {
  //     flexDirection: 'row',
  //     gap: 5,
  //     alignItems: 'center',
  //   },
  //   imgStyle: {
  //     width: 24,
  //     height: 24,
  //   },
  //   restaurant: {
  //     fontSize: 15,
  //     color: colors.lightTextColor,
  //     fontFamily: fonts.bai.medium,
  //   },
  //   address: {
  //     fontSize: responsiveFontSize(1.9),
  //     color: colors.lightTextColor,
  //     fontFamily: fonts.montserrat.medium,
  //     lineHeight: 20,
  //   },

  //   btnsCont: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     marginTop: 10,
  //     gap: 10,
  //     alignSelf: 'center',
  //   },

  //   favoriteBtn: {
  //     height: 60,
  //     borderRadius: 8,
  //     backgroundColor: colors.red,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     flexDirection: 'row',
  //     gap: 10,
  //     paddingHorizontal: responsiveWidth(8),
  //   },

  //   favoriteText: {
  //     fontFamily: fonts.bai.semiBold,
  //     fontSize: 20,
  //     color: '#fff',
  //     textAlign: 'center',
  //     lineHeight: 24,
  //   },

  //   foodReviewsText: {
  //     fontFamily: fonts.bai.semiBold,
  //     fontSize: 20,
  //     color: '#fff',
  //     textAlign: 'center',
  //     lineHeight: 24,
  //   },

  //   categoryCont: {
  //     flexDirection: 'column',
  //     gap: 10,
  //     paddingLeft: responsiveWidth(4),
  //     marginTop: 15,
  //   },

  //   flatListHomeStyle: {
  //     flexDirection: 'row',
  //     gap: responsiveWidth(3),
  //   },

  //   foodImg: {
  //     resizeMode: 'cover',
  //     width: 153,
  //     height: 65,
  //   },

  //   todaySpecialCont: {
  //     paddingHorizontal: responsiveWidth(4),
  //     gap: 20,
  //     marginTop: 5,
  //   },

  //   todaySpecialTopCont: {
  //     justifyContent: 'space-between',
  //     flexDirection: 'row',
  //     paddingRight: responsiveWidth(3),
  //     marginBottom: responsiveHeight(1.5),
  //   },

  //   commonTxt: {
  //     fontSize: responsiveFontSize(3.0),
  //     fontWeight: '700',
  //     color: colors.black,
  //     lineHeight: 40,
  //     fontFamily: fonts.bai.semiBold,
  //     paddingLeft: responsiveWidth(3.8),
  //   },

  //   viewAllCont: {
  //     flexDirection: 'row',
  //     gap: 4,
  //     alignItems: 'center',
  //   },

  //   viewAllTxt: {
  //     fontSize: 18,
  //     fontWeight: '600',
  //     color: colors.black,
  //     lineHeight: 31,
  //     fontFamily: fonts.bai.semiBold,
  //   },

  //   navigateBtn: {flexDirection: 'row', alignItems: 'center', gap: 10},

  //   list: {
  //     gap: 15,
  //     paddingRight: responsiveWidth(3.5),
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //   },

  //   card: {
  //     width: 165,
  //     height: 135,
  //     borderRadius: 20,
  //     backgroundColor: '#FFF3E5',
  //     position: 'relative',
  //     top: 35,
  //     alignItems: 'center',
  //     padding: responsiveHeight(1.25),
  //     paddingVertical: responsiveHeight(3.2),
  //     marginBottom: responsiveHeight(4),
  //     justifyContent: 'space-between',
  //   },

  //   cardTxtCont: {
  //     position: 'relative',
  //     top: 30,
  //     textAlign: 'center',
  //     zIndex: 10,
  //   },

  //   cardName: {
  //     fontSize: responsiveFontSize(2.1),
  //     color: colors.black,
  //     fontFamily: fonts.bai.semiBold,
  //     textAlign: 'center',
  //   },

  //   imageCont: {
  //     width: 90,
  //     height: 90,
  //     borderWidth: 5,
  //     borderColor: '#fff',
  //     borderRadius: 100,
  //     position: 'absolute',
  //     top: -40,
  //     left: 36,
  //   },

  //   image: {
  //     width: '100%',
  //     height: '100%',
  //     borderRadius: 100,
  //     resizeMode: 'cover',
  //   },

  //   role: {
  //     fontSize: 15,
  //     color: colors.red,
  //     fontFamily: fonts.bai.medium,
  //     textAlign: 'center',
  //     marginTop: -5,
  //   },

  //   galleryList: {
  //     gap: responsiveWidth(4.5),
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //   },

  //   phoneImageCont: {
  //     position: 'absolute',
  //     bottom: 20,
  //     right: 20,
  //     height: 60,
  //     width: 60,
  //     backgroundColor: colors.green,
  //     borderRadius: 100,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
});
