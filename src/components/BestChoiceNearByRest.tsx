import {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {bestChoiceBurgerImg} from '../assets';
import {fonts} from '../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppDispatch, RootState} from '../redux/store';
import {
  ApiStatusConstants,
  bestChoiceNearByRestAction,
  BestChoiceNearByRestProductInterface,
} from '../redux/slices/HomeSlice';
import {connect} from 'react-redux';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<ParamListBase>;
  businessId: string;
  getBestChoicesNearByRestData?: (businessId: string) => void;
  bestChoiceNearByRestStatus: ApiStatusConstants;
  bestChoiceNearByRestSuccessData: BestChoiceNearByRestProductInterface[];
  bestChoiceNearByRestErrData: string;
}

class BestChoiceNearByRest extends Component<Props> {
  componentDidMount(): void {
    if (this.props.getBestChoicesNearByRestData)
      this.props.getBestChoicesNearByRestData(this.props.businessId);
  }

  renderItem = ({
    item: bestChoiceItem,
  }: {
    item: BestChoiceNearByRestProductInterface;
  }) => {
    return (
      <View style={styles.bestChoiceHomeCont}>
        <View style={styles.bestChoiceFoodImgCont}>
          <Image
            source={bestChoiceBurgerImg}
            style={styles.bestChoiceFoodImg}
          />
        </View>
        <View style={styles.bodyCont}>
          <Text style={styles.bestChoiceFoodText}>{bestChoiceItem.name}</Text>
          <View style={styles.rupeeCont}>
            <FontAwesome name="rupee" color={colors.red} size={15} />
            <Text style={styles.price}>{bestChoiceItem.price}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.whiteCircle}>
          <AntDesign name="plus" size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.bestChoiceNearByRestSuccessData}
        renderItem={this.renderItem}
        keyExtractor={item => item._id}
        horizontal
        contentContainerStyle={styles.flatList}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  bestChoiceNearByRestStatus: state.home.bestChoiceNearByRestStatus,
  bestChoiceNearByRestSuccessData: state.home.bestChoiceNearByRestSuccessData,
  bestChoiceNearByRestErrData: state.home.bestChoiceNearByRestErrData,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getBestChoicesNearByRestData: (businessId: string) =>
    dispatch(bestChoiceNearByRestAction(businessId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BestChoiceNearByRest);

const styles = StyleSheet.create({
  flatList: {
    gap: 20,
    paddingRight: responsiveWidth(3),
  },

  bestChoiceHomeCont: {
    backgroundColor: '#FFF3E5',
    borderRadius: 20,
    height: 155,
    width: 165,
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

  bodyCont: {
    position: 'relative',
    top: 29,
    alignItems: 'center',
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
    marginTop: 8,
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
    marginTop: 8,
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
    shadowColor: '#FFE9D0',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 35,
    elevation: 10,
  },

  plusIcon: {
    width: 40,
    height: 40,
    color: colors.black,
  },
});
