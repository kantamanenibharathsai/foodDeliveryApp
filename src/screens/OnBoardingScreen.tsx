import {NavigationProp} from '@react-navigation/native';
import React, {Component, createRef} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SkipIcon from 'react-native-vector-icons/Ionicons';
import {ImagesState, onBoardingImagesData} from '../utils/OnBoardingImagesData';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';

type RootStackParamList = {
  LoginScreen: undefined;
};

interface IProps {
  navigation: NavigationProp<RootStackParamList>;
}

interface IState {
  activeIndex: number;
}

class OnBoardingScreen extends Component<IProps, IState> {
  private carouselRef = createRef<Carousel<ImagesState>>();

  constructor(props: IProps) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  handleSkipBtn = () => {
    this.props.navigation.navigate('LoginScreen');
  };

  handleContinueBtn = () => {
    const {activeIndex} = this.state;

    if (activeIndex < onBoardingImagesData.length - 1) {
      const nextIndex = activeIndex + 1;
      this.carouselRef.current?.snapToNext();
      this.setState({activeIndex: nextIndex});
    } else {
      this.props.navigation.navigate('LoginScreen');
    }
  };

  renderItem = ({item}: {item: ImagesState}) => {
    const {activeIndex} = this.state;

    return (
      <View style={styles.onBoardingContainer}>
        <Image source={item.image} style={styles.carouselImg}/>
        <Image source={item.circleImg} style={styles.circleImgStyle} />
        <TouchableHighlight
          underlayColor="transparent"
          style={styles.continueBtnStyle}
          onPress={this.handleContinueBtn}>
          <Image source={item.continueBtn} style={styles.continueBtn} />
        </TouchableHighlight>
        <View style={styles.onBoardingTextContainer}>
          <Text style={styles.titleStyle}>{item.title}</Text>
          <Text style={styles.descStyle}>{item.description}</Text>
        </View>
        <View style={styles.paginationContainer}>
          <Pagination
            dotsLength={onBoardingImagesData.length}
            activeDotIndex={activeIndex}
            dotStyle={styles.activeDot}
            inactiveDotStyle={styles.inactiveDot}
          />
        </View>
        {activeIndex < onBoardingImagesData.length - 1 && (
          <TouchableHighlight
            style={styles.skipBtnContainer}
            onPress={this.handleSkipBtn}>
            <View style={styles.skipBtn}>
              <SkipIcon
                name="play-skip-forward-sharp"
                size={20}
                color={colors.black}
              />
              <Text style={styles.skipText}>Skip</Text>
            </View>
          </TouchableHighlight>
        )}
      </View>
    );
  };

  render() {
    return (
      <View>
        <Carousel
          ref={this.carouselRef}
          data={onBoardingImagesData}
          renderItem={this.renderItem}
          sliderWidth={responsiveScreenWidth(100)}
          itemWidth={responsiveScreenWidth(100)}
          layout={'default'}
          onSnapToItem={index => this.setState({activeIndex: index})}
          vertical={false}
          containerCustomStyle={{}}
        />
      </View>
    );
  }
}

export default OnBoardingScreen;

const styles = StyleSheet.create({
  circleImgStyle: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? -38 : 0,
    // width: '100%',
    height: '43%',
    width:
      Platform.OS === 'android' ? responsiveWidth(100) : responsiveWidth(99),
    resizeMode: 'cover',
    // zIndex: 0
  },
  onBoardingContainer: {
    height: '100%',
    width: '100%',
    // borderWidth: 3,
    // borderColor: colors.green,
    // borderRadius: 100,
    // overflow: 'hidden',
  },
  continueBtnStyle: {
    position: 'absolute',
    transform: [{translateX: -55}, {translateY: -55}],
    left: '54%',
    top: Platform.OS === 'android' ? '64%' : '59%',
  },
  onBoardingTextContainer: {
    paddingHorizontal: 50,
    marginTop: Platform.OS === 'android' ? -15 : 20,
    position: 'absolute',
    zIndex: 100,
    bottom: Platform.OS === 'android' ? '17%' : '21%',
    // borderWidth: 3,
    // borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(100),
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: fonts.bai.black,
    color: colors.black,
  },
  descStyle: {
    textAlign: 'center',
    color: colors.textColor,
    marginTop: Platform.OS === 'ios' ? 10 : 0,
    fontFamily: fonts.montserrat.medium,
  },
  activeDot: {
    backgroundColor: colors.red,
    width: 12,
    height: 12,
    borderRadius: 50,
  },
  inactiveDot: {
    borderColor: colors.green,
    borderWidth: 5,
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  paginationContainer: {
    // marginTop: Platform.OS === 'ios' ? 10 : 30,
    position: 'absolute',
    alignSelf: 'center',
    bottom: Platform.OS === 'ios' ? 55 : 55,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtnContainer: {
    position: 'absolute',
    top: 60,
    right: 30,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    width: responsiveWidth(25),
  },
  skipText: {
    fontSize: responsiveFontSize(2),
    color: colors.black,
    fontFamily: fonts.montserrat.bold,
    fontWeight: '600',
  },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  continueBtn: {
    width: 80,
    height: 80,
  },
  carouselImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
