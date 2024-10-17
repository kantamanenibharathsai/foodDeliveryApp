import React, {RefObject} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../utils/Colors';
import {homeCarouselImg} from '../assets';

interface CarouselItemData {
  id: string;
  image: ImageSourcePropType;
}

interface HomeCarouselState {
  activeIndex: number;
}

const data: CarouselItemData[] = [
  {id: '1', image: homeCarouselImg},
  {id: '2', image: homeCarouselImg},
  {id: '3', image: homeCarouselImg},
  {id: '4', image: homeCarouselImg},
];

class HomeCarousel extends React.Component<{}, HomeCarouselState> {
  private carouselRef: RefObject<Carousel<CarouselItemData>>;

  constructor(props: {}) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this.carouselRef = React.createRef<Carousel<CarouselItemData>>();
  }

  handleSnapToItem = (index: number) => {
    this.setState({activeIndex: index});
  };

  renderItem = ({item}: {item: CarouselItemData}) => (
    <View style={styles.carouselItem}>
      <Image
        style={styles.carouselBg}
        source={item.image}
        resizeMode="stretch"
      />
    </View>
  );

  render() {
    const {activeIndex} = this.state;

    return (
      <View
        style={[
          styles.carouselContainer,
          {
            paddingLeft: activeIndex !== 0 ? responsiveWidth(2) : 0, // Dynamic padding
          },
        ]}>
        <Carousel<CarouselItemData>
          ref={this.carouselRef}
          data={data}
          renderItem={this.renderItem}
          sliderWidth={responsiveWidth(100)}
          itemWidth={responsiveWidth(85)}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.7}
          autoplayInterval={2000}
          autoplay
          vertical={false}
          onSnapToItem={this.handleSnapToItem}
          slideStyle={styles.slideStyle}
        />
        <Pagination
          activeDotIndex={activeIndex}
          dotsLength={data.length}
          dotStyle={styles.activeDot}
          inactiveDotStyle={styles.inactiveDot}
          containerStyle={styles.paginationContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: responsiveWidth(100),
  } as ViewStyle,
  carouselItem: {
    borderRadius: 15,
    overflow: 'hidden',
  } as ViewStyle,
  slideStyle: {
    marginRight: responsiveWidth(2), // Space to peek the next slide
  } as ViewStyle,
  carouselBg: {
    width: '100%',
    height: 170,
    borderRadius: 15,
  } as ImageStyle,
  paginationContainer: {
    marginTop: -19,
  } as ViewStyle,
  activeDot: {
    backgroundColor: colors.red,
    width: 11,
    height: 11,
    borderRadius: 5,
    marginHorizontal: -8,
  } as ViewStyle,
  inactiveDot: {
    backgroundColor: colors.white,
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: -8,
    borderWidth: 2,
    borderColor: colors.green,
  } as ViewStyle,
});

export default HomeCarousel;
