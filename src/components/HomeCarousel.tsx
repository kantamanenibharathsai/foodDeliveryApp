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

const ITEM_WIDTH = rw(85);
const ITEM_MARGIN = rw(2); 

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
    marginTop: rh(2),
  } as ViewStyle,
  carouselItem: {
    width: ITEM_WIDTH,
    borderRadius: rw(2),
    overflow: 'hidden',
  } as ViewStyle,
  carouselBg: {
    width: '100%',
    height: rh(19),
    borderRadius: rw(2),
  } as ImageStyle,
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: rh(1.5),
  } as ViewStyle,
  dot: {
    width: rw(2.5),
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



