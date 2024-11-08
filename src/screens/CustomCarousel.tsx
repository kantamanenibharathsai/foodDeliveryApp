import React, {Component} from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface Props {

}

interface CarouselItem {
  id: number;
  image: string;
}

interface State {
  activeSlide: number;
}

export default class CustomCarousel extends Component<Props, State> {
  private scrollX = new Animated.Value(0);
  private screenWidth = Dimensions.get('window').width;
  private autoSlideInterval: NodeJS.Timeout | undefined;

  state = {
    activeSlide: 0,
  };

  items: CarouselItem[] = [
    {
      id: 1,
      image:
        'https://s3-alpha-sig.figma.com/img/56bb/2955/6939fec025c49731e72e82270e4410e8?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yd46-Bv-IeeJfFLB7e6QhktExNIKgUHk-H0bMc51kPaeomaChn0M6v0xH7KiK-2URMx3BUKpjDncNoGNSOMj3BfAT5T6NVN6Ru3R0SjVnPvBscvMNERIJwpbAxHrEByu5MIrQvbKgm3liKJWMpI970If95UPb2CxJPYo~pzfLiePkys3KcHAgMvtMHNpxh6~jw3z-GOkT2LHlTVQ-50KTXO0PRuTsVpWvuWMseiFtfiYoF-MoboKSpIJiaIEwHC7rKiogtm~nfYAQnoV4euMlNhb9RNIz5HkyKvM3K6G2HJG~kVAaXeE-WZXgBfDNR4AAQm6iSWfve4-I8dtavkotQ__',
    },
    {
      id: 2,
      image:
        'https://s3-alpha-sig.figma.com/img/4aaa/fd62/b1bac84a053525347430c5384018b0b7?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KG-yYVExcvrrkjpms4o8vf-HTblVEmIFD-dPIjdliJo2yc-LDt8EKvOfRiZqHt7OUHrUZ7tMlTI6gvZj7fs2hbfSOVaPh6LxczWjzYvjQ9R19okSPpsAQfq65LJEkqNaWgvz7EUFjZpnRovi~M2T-bGb7QEXSXEH7OF5AseQxRcfukw~-Kns2bCoNIWTQcbG0wHL9nJYy6YdGouUjosBgMoLmxyyh4Xx6sKQYOtAZL2H7soi7MA7Afz7w36~BateV7k5Lo03VxC1Yj3VoKnjt~3M1EoJlcbRYBHmy912F77R1Bptpcy7SYOzMZ~O5RORsJl0n2phY2WJECEK5ugLbw__',
    },
    {
      id: 3,
      image:
        'https://s3-alpha-sig.figma.com/img/efa5/87e5/70a191983c56a05d8f26780fee6759fb?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QUu-2y-L-mizlJXwCqRF-aQcqCiKf2pJ-fT6NZBJnY5XgLtQb8TTUns00h-gpnUqHYGwcbeYqwGNeRcFIOwgzDwKiZHGpqtxhtq~KRCy0wY3LWnUrmWfYh30rl-gs2kQ06AnhPeB3qC~5nOUK1SBpXq5LPvxG24LHJAnsSlJhWb-1d6IM~OXRxL9nH0pu6X~lCWKNw3tEs9fvJI2sEcPbmW8A~jrYHc6qRvKof-W0hNWwiG7Y9TeQf9Ilg29GUmGyq6NTUCKJqeTW40WZSutd3AEvOuQDV7R2Jb~UVuI34-jWXP8enuK1KFYtFMfwCvf0QJgeWBu~YoGK27lVpS4Fw__',
    },
    {
      id: 4,
      image:
        'https://s3-alpha-sig.figma.com/img/50de/3577/7e5c271214fddce2b8e422bc83d612e4?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VN1JhbNQuBBEEUk7bJ-aKTMEaau1xE4qXIjh7hJyPolUq2vbDn~gBM7vMK3dhhmA69j7YhuPqSdm51zzWCg9K-zaKzzVheCPbbujfT9ircsFMwfKoOMLJce1tlV9d~1~M9u9vL0r5urALLzNTUvZLqj~df6elOrj937eLGb~gpPT5WV37tT-baoy~KZw2hDAFuPECH1fqmpTOkk4LFUs5B88Zgj5-SdXZ8Bj5gUDoDZa-6Ga89yv2uinmYyQnjV4VrQ9Bry3QilcC1TwE3cVCeDzmfaYpXYe0uOVZxFraYhoYuQa5ptmiINm4xHneO7RbQteQmHwz0hKR8hLtoFgRg__',
    },
  ];

  componentDidMount() {
    this.startAutoSlide();
  }

  componentWillUnmount() {
    clearInterval(this.autoSlideInterval);
  }

  startAutoSlide = () => {
    this.autoSlideInterval = setInterval(() => {
      const nextSlide = (this.state.activeSlide + 1) % this.items.length;
      this.setState({activeSlide: nextSlide});
      this.scrollToSlide(nextSlide);
    }, 3000);
  };

  scrollToSlide = (index: number) => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo({
        x: this.screenWidth * index,
        animated: true,
      });
    }
  };

  onScroll = (event: any) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / this.screenWidth,
    );
    this.setState({activeSlide: slideIndex});
  };

  scrollViewRef: ScrollView | null = null;

  renderItem = (item: CarouselItem) => (
    <View
      key={item.id}
      style={{
        width: this.screenWidth,
        position: 'relative',
        top: 130,
      }}>
      <Image source={{uri: item.image}} style={styles.image} />
    </View>
  );

  renderDots = () => (
    <View style={styles.dotContainer}>
      {this.items.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            this.state.activeSlide === index && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );


  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={ref => (this.scrollViewRef = ref)}
          style={{}}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={this.onScroll}
          scrollEventThrottle={16}>
          {this.items.map(this.renderItem)}
        </ScrollView>
        {this.renderDots()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#FFE5E5',
    height: 375,
  },
  image: {
    width: 360,
    height: 182,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 22,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#DF201F',
  },
  mainCont: {
    flex: 1,
    backgroundColor: colors.white,
    position: 'relative',
  },
});
