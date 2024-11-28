import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ListRenderItem,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import {dishImg, todaySpecialImg} from '../assets';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {
  TodaysSpecialGetInterface,
} from '../redux/slices/HomeSlice';
import {responsiveWidth} from 'react-native-responsive-dimensions';

export interface FoodItem {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  restaurant: string;
  image: ImageSourcePropType;
}
interface TodaySpecialProps {
  todaysSpecialGetSuccessData?: TodaysSpecialGetInterface[];
  // businessId?: string;
  // todaysSpecialGetRestNearByDataFunc?: (businessId: string) => void;
  // todaysSpecialRestNearByGetSuccessData?: TodaysSpecialGetNearByRestInterface[];
  // todaysSpecialRestNearByGetErrData?: string;
  // todaysSpecialRestNearByGetStatus?: ApiStatusConstants;
}


class TodaySpecial extends React.Component<TodaySpecialProps, {}> {
  constructor(props: TodaySpecialProps) {
    super(props);
  }

  componentDidMount(): void {
    // if (
    //   this.props.businessId &&
    //   this.props.todaysSpecialGetRestNearByDataFunc
    // ) {
    //   this.props.todaysSpecialGetRestNearByDataFunc(this.props.businessId);
    // } else if (this.props.todaysSpecialGetDataFunc) {
    //   console.log('componentdidmountcalled');
    //   this.props.todaysSpecialGetDataFunc();
    // }
  }

  renderItem: ListRenderItem<TodaysSpecialGetInterface> = ({item}) => (
    <View style={styles.card}>
      <View style={styles.imgCont}>
        <Image source={todaySpecialImg} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.originalPrice}>₹200</Text>
        </View>
        <View style={styles.imgTxtCont}>
          <Image source={dishImg} style={styles.imgStyle} />
          <Text style={styles.restaurant}>{item.category}</Text>
        </View>
      </View>
    </View>
  );

  render() {
    console.log(
      'this.props.todaysSpecialGetSuccessData',
      this.props.todaysSpecialGetSuccessData,
    );
    return (
      <FlatList
        data={this.props.todaysSpecialGetSuccessData}
        keyExtractor={item => item._id}
        renderItem={this.renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        nestedScrollEnabled
        ListEmptyComponent={() => (
          <View>
            <Text>Data Not Found</Text>
          </View>
        )}
      />
    );
  }
}

// const mapStateToProps = (state: RootState) => ({
//   // todaysSpecialGetStatus: state.home.todaysSpecialGetStatus,
//   // todaysSpecialGetSuccessData: state.home.todaysSpecialGetSuccessData,
//   // todaysSpecialGetErrData: state.home.todaysSpecialGetErrData,
//   // todaysSpecialRestNearByGetStatus: state.home.todaysSpecialGetStatus,
//   // todaysSpecialRestNearByGetSuccessData: state.home.todaysSpecialGetSuccessData,
//   // todaysSpecialRestNearByGetErrData:
//   //   state.home.todaysSpecialRestNearByGetErrData,
// });

// const mapDispatchToProps = (dispatch: AppDispatch) => {
//   return {
//     // todaysSpecialGetDataFunc: () => dispatch(todaysSpecialGetAction()),
//     // todaysSpecialGetRestNearByDataFunc: (businessId: string) =>
//     //   dispatch(todaysSpecialGetRestNearByAction(businessId)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(TodaySpecial);
export default TodaySpecial;

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: responsiveWidth(4),
    marginTop: -0,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 3,
    shadowRadius: 15,
    elevation: 8,
    shadowColor: Platform.OS === 'ios' ? '#fff3e5' : '#000',
  },
  imgCont: {
    width: 114,
    height: 126,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 0,
  },
  details: {
    marginLeft: 10,
    justifyContent: 'center',
    gap: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.black,
    fontFamily: fonts.bai.medium,
    width: responsiveWidth(61),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.red,
    marginRight: 3,
    fontFamily: fonts.bai.medium,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: colors.red,
  },

  imgTxtCont: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },

  imgStyle: {
    width: 24,
    height: 24,
  },

  restaurant: {
    fontSize: 15,
    color: colors.lightTextColor,
    fontFamily: fonts.bai.medium,
  },
});
