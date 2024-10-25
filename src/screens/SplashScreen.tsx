import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {spalshScreen1, spalshScreen2} from '../assets';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';


export type RootStackParamList = {
  // SplashScreen: undefined;
  OnBoardingScreen: undefined;
  // LoginScreen: undefined;
  // Add more screens if needed
};

type SplashScreenNavigationProp = NavigationProp<
  RootStackParamList
>;

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

interface IState {
  currentImage: number;
}

class SplashScreen extends Component<IProps, IState> {
  private timer: NodeJS.Timeout | null = null;

  constructor(props: IProps) {
    super(props);
    this.state = {
      currentImage: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(this.handleTimeout, 2000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  handleTimeout = () => {
    const {currentImage} = this.state;
    const {navigation} = this.props;
    const images = [spalshScreen1, spalshScreen2];

    if (currentImage < images.length - 1) {
      this.setState({currentImage: currentImage + 1}, () => {
        this.timer = setTimeout(this.handleTimeout, 2000);
      });
    } else {
      navigation.navigate('OnBoardingScreen');
    }
  };

  render() {
    const {currentImage} = this.state;
    const images = [spalshScreen1, spalshScreen2];

    return (
      <View>
        <Image source={images[currentImage]} style={styles.imageStyle} />
      </View>
    );
  }
}

export default SplashScreen;

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
