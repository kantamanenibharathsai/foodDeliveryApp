import { ImageSourcePropType } from "react-native";
import { burgerImg, chickenImg, pizzaImg } from "../assets";

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


export interface StatesInterface {
  id: number;
  name: string;
}

export const statesData: StatesInterface[] = [
  { "id": 1, "name": "Andhra Pradesh" },
  { "id": 2, "name": "Arunachal Pradesh" },
  { "id": 3, "name": "Assam" },
  { "id": 4, "name": "Bihar" },
  { "id": 5, "name": "Chhattisgarh" },
  { "id": 6, "name": "Goa" },
  { "id": 7, "name": "Gujarat" },
  { "id": 8, "name": "Haryana" },
  { "id": 9, "name": "Himachal Pradesh" },
  { "id": 10, "name": "Jharkhand" },
  { "id": 11, "name": "Karnataka" },
  { "id": 12, "name": "Kerala" },
  { "id": 13, "name": "Madhya Pradesh" },
  { "id": 14, "name": "Maharashtra" },
  { "id": 15, "name": "Manipur" },
  { "id": 16, "name": "Meghalaya" },
  { "id": 17, "name": "Mizoram" },
  { "id": 18, "name": "Nagaland" },
  { "id": 19, "name": "Odisha" },
  { "id": 20, "name": "Punjab" },
  { "id": 21, "name": "Rajasthan" },
  { "id": 22, "name": "Sikkim" },
  { "id": 23, "name": "Tamil Nadu" },
  { "id": 24, "name": "Telangana" },
  { "id": 25, "name": "Tripura" },
  { "id": 26, "name": "Uttar Pradesh" },
  { "id": 27, "name": "Uttarakhand" },
  { "id": 28, "name": "West Bengal" },
  { "id": 29, "name": "Andaman and Nicobar Islands" },
  { "id": 30, "name": "Chandigarh" },
  { "id": 31, "name": "Dadra and Nagar Haveli and Daman and Diu" },
  { "id": 32, "name": "Lakshadweep" },
  { "id": 33, "name": "Delhi" },
  { "id": 34, "name": "Puducherry" },
  { "id": 35, "name": "Ladakh" },
  { "id": 36, "name": "Jammu and Kashmir" }
]

export interface FoodHomeImageInterface {
  id: number;
  image: ImageSourcePropType;
}

export const foodHomeImages = [{ id: 1, image: pizzaImg }, { id: 2, image: pizzaImg }, { id: 3, image: chickenImg }]