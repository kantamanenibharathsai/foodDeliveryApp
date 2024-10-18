// import React, {RefObject} from 'react';
// import {
//   Image,
//   ImageSourcePropType,
//   StyleSheet,
//   View,
//   ViewStyle,
//   ImageStyle,
// } from 'react-native';
// import {responsiveWidth} from 'react-native-responsive-dimensions';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
// import {colors} from '../utils/Colors';
// import {homeCarouselImg} from '../assets';

// interface CarouselItemData {
//   id: string;
//   image: ImageSourcePropType;
// }

// interface HomeCarouselState {
//   activeIndex: number;
// }

// const data: CarouselItemData[] = [
//   {id: '1', image: homeCarouselImg},
//   {id: '2', image: homeCarouselImg},
//   {id: '3', image: homeCarouselImg},
//   {id: '4', image: homeCarouselImg},
// ];

// class HomeCarousel extends React.Component<{}, HomeCarouselState> {
//   private carouselRef: RefObject<Carousel<CarouselItemData>>;

//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       activeIndex: 0,
//     };
//     this.carouselRef = React.createRef<Carousel<CarouselItemData>>();
//   }

//   handleSnapToItem = (index: number) => {
//     this.setState({activeIndex: index});
//   };

//   renderItem = ({item}: {item: CarouselItemData}) => (
//     <View style={styles.carouselItem}>
//       <Image
//         style={styles.carouselBg}
//         source={item.image}
//         resizeMode="stretch"
//       />
//     </View>
//   );

//   render() {
//     const {activeIndex} = this.state;

//     return (
//       <View style={styles.carouselContainer}>
//         <Carousel<CarouselItemData>
//           ref={this.carouselRef}
//           data={data}
//           renderItem={this.renderItem}
//           sliderWidth={responsiveWidth(100)}
//           itemWidth={responsiveWidth(88)}
//           inactiveSlideScale={1}
//           inactiveSlideOpacity={0.7}
//           autoplayInterval={2000}
//           autoplay
//           vertical={false}
//           onSnapToItem={this.handleSnapToItem}
//           slideStyle={styles.slideStyle}
//           contentContainerCustomStyle={{
//             paddingLeft: 0,
//           }}
//         />
//         <Pagination
//           activeDotIndex={activeIndex}
//           dotsLength={data.length}
//           dotStyle={styles.activeDot}
//           inactiveDotStyle={styles.inactiveDot}
//           containerStyle={styles.paginationContainer}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   carouselContainer: {
//     width: responsiveWidth(100),
//     marginTop: 20,
//     paddingHorizontal: responsiveWidth(3.8),
//     // gap: 3
//   } as ViewStyle,
//   carouselItem: {
//     borderRadius: 15,
//     overflow: 'hidden',
//   } as ViewStyle,
//   slideStyle: {
//     // marginRight: responsiveWidth(1.5), // Space to peek the next slide
//   } as ViewStyle,
//   carouselBg: {
//     width: '100%',
//     height: 170,
//     borderRadius: 15,
//   } as ImageStyle,
//   paginationContainer: {
//     marginTop: -19,
//   } as ViewStyle,
//   activeDot: {
//     backgroundColor: colors.red,
//     width: 11,
//     height: 11,
//     borderRadius: 5,
//     marginHorizontal: -8,
//   } as ViewStyle,
//   inactiveDot: {
//     backgroundColor: colors.white,
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     marginHorizontal: -8,
//     borderWidth: 2,
//     borderColor: colors.green,
//   } as ViewStyle,
// });

// export default HomeCarousel;



import React, {createRef, RefObject, Component} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  ListRenderItemInfo,
  ViewToken,
  ImageSourcePropType,
} from 'react-native';
import {colors} from '../utils/Colors';
import {homeCarouselImg} from '../assets';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';

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

const ITEM_WIDTH = rw(85); // 85% of screen width
const ITEM_MARGIN = rw(2); // 2% margin between items

class HomeCarousel extends Component<{}, HomeCarouselState> {
  private flatListRef: RefObject<FlatList<CarouselItemData>>;
  private autoSlideInterval?: NodeJS.Timeout;

  constructor(props: {}) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this.flatListRef = createRef<FlatList<CarouselItemData>>();
  }

  componentDidMount() {
    this.startAutoSlide();
  }

  componentWillUnmount() {
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
  }

  startAutoSlide = () => {
    this.autoSlideInterval = setInterval(() => {
      const {activeIndex} = this.state;
      const nextIndex = (activeIndex + 1) % data.length;
      this.flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      this.setState({activeIndex: nextIndex});
    }, 2000);
  };

  handleViewableItemsChanged = (info: {viewableItems: ViewToken[]}) => {
    if (info.viewableItems.length > 0) {
      const newIndex = info.viewableItems[0].index;
      if (newIndex !== null) this.setState({activeIndex: newIndex});
    }
  };

  renderItem = ({item}: ListRenderItemInfo<CarouselItemData>) => (
    <View style={styles.carouselItem}>
      <Image
        style={styles.carouselBg}
        source={item.image}
        resizeMode="stretch"
      />
    </View>
  );

  renderPagination = () => {
    const {activeIndex} = this.state;
    return (
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.carouselContainer}>
        <FlatList
          ref={this.flatListRef}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH + ITEM_MARGIN}
          decelerationRate="fast"
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
          onViewableItemsChanged={this.handleViewableItemsChanged}
          contentContainerStyle={{
            paddingHorizontal: (rw(100) - ITEM_WIDTH) / 2,
          }}
          ItemSeparatorComponent={() => <View style={{width: ITEM_MARGIN}} />}
        />
        {this.renderPagination()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: rh(2), // 2% of screen height
  } as ViewStyle,
  carouselItem: {
    width: ITEM_WIDTH,
    borderRadius: rw(2),
    overflow: 'hidden',
  } as ViewStyle,
  carouselBg: {
    width: '100%',
    height: rh(19), // 25% of screen height
    borderRadius: rw(2),
  } as ImageStyle,
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: rh(1.5), // 1.5% of screen height
  } as ViewStyle,
  dot: {
    width: rw(2.5), // 2.5% of screen width
    height: rw(2.5),
    borderRadius: rw(1.25),
    marginHorizontal: rw(1),
  } as ViewStyle,
  activeDot: {
    backgroundColor: colors.red,
  } as ViewStyle,
  inactiveDot: {
    backgroundColor: colors.white,
    borderColor: colors.green,
    borderWidth: 2,
  } as ViewStyle,
});

export default HomeCarousel;



