import {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import TodaySpecial from '../components/TodaySpecial';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  ApiStatusConstants,
  todaysSpecialGetAction,
  TodaysSpecialGetInterface,
} from '../redux/slices/HomeSlice';
import {connect} from 'react-redux';
import {AppDispatch, RootState} from '../redux/Store';

interface Props {
  navigation: NavigationProp<ParamListBase>;
  todaysSpecialGetStatus: ApiStatusConstants;
  todaysSpecialGetSuccessData: TodaysSpecialGetInterface[];
  todaysSpecialGetErrData: string;
  todaysSpecialGetDataFunc: () => void;
}

class TodaySpecialScreen extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  componentDidMount(): void {
    this.props.todaysSpecialGetDataFunc();
  }

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
          {this.props.todaysSpecialGetStatus === 'Loading' ? (
            <ActivityIndicator
              size="large"
              color={colors.green}
              style={styles.loader}
            />
          ) : (
            <TodaySpecial
              todaysSpecialGetSuccessData={
                this.props.todaysSpecialGetSuccessData
              }
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  todaysSpecialGetStatus: state.home.todaysSpecialGetStatus,
  todaysSpecialGetSuccessData: state.home.todaysSpecialGetSuccessData,
  todaysSpecialGetErrData: state.home.todaysSpecialGetErrData,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    todaysSpecialGetDataFunc: () => dispatch(todaysSpecialGetAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodaySpecialScreen);

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(0.5),
    paddingVertical: responsiveHeight(2),
    paddingBottom: 100,
    paddingRight: responsiveWidth(2.5)
  },
  loader: {
    alignSelf: 'center',
  },
});
