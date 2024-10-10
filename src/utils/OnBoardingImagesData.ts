import { ImageSourcePropType } from "react-native";

export interface ImagesState {
  id: number;
  image: ImageSourcePropType | undefined;
  continueBtn: ImageSourcePropType | undefined;
  circleImg: ImageSourcePropType | undefined;
  title: string;
  description: string;
}
export const onBoardingImagesData = [
  {
    id: 1,
    image: require('../assets/images/OnBoarding1.jpg'),
    continueBtn: require('../assets/images/Continuebtn.png'),
    circleImg: require('../assets/images/Circle.png'),
    title: 'We have Quality Chef',
    description:
      'It is a long established fact that a reader will be distracted',
  },
  {
    id: 2,
    image: require('../assets/images/OnBoarding2.jpg'),
    continueBtn: require('../assets/images/Continuebtn.png'),
    circleImg: require('../assets/images/Circle.png'),
    title: 'Swift Delivery',
    description:
      'It is a long established fact that a reader will be distracted',
  },
  {
    id: 3,
    image: require('../assets/images/OnBoarding3.jpg'),
    continueBtn: require('../assets/images/Continuebtn.png'),
    circleImg: require('../assets/images/Circle.png'),
    title: 'Choose your Tasty Food',
    description:
      'It is a long established fact that a reader will be distracted',
  },
  {
    id: 4,
    image: require('../assets/images/OnBoarding4.jpg'),
    continueBtn: require('../assets/images/Continuebtn.png'),
    circleImg: require('../assets/images/Circle.png'),
    title: '10% Discount On first order',
    description:
      'It is a long established fact that a reader will be distracted',
  },
];
