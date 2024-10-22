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
import {todaySpecialImg} from '../assets';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';


interface FoodItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

interface Props {}
interface State {
  data: FoodItem[];
}

const foodData: FoodItem[] = [
  {
    id: '1',
    name: 'Best Veg Dum Biryani Rise',
    image: todaySpecialImg,
  },
  {
    id: '2',
    name: 'Best Dum Biryani',
    image: todaySpecialImg,
  },
  {
    id: '3',
    name: 'Aloo Salan with tandori roti',
    image: todaySpecialImg,
  },
  {
    id: '4',
    name: 'Fried chicken',
    image: todaySpecialImg,
  },
  {
    id: '5',
    name: 'dry manchurian',
    image: todaySpecialImg,
  },
  {
    id: '6',
    name: 'Fried chicken',
    image: todaySpecialImg,
  },
  {
    id: '7',
    name: 'dry manchurian',
    image: todaySpecialImg,
  },
];

class SearchScreenFood extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: foodData,
    };
  }

  renderItem: ListRenderItem<FoodItem> = ({item}) => (
    <View style={styles.card}>
      <View style={styles.imgCont}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
  );

  render() {
    const {data} = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        nestedScrollEnabled
      />
    );
  }
}

export default SearchScreenFood;

const styles = StyleSheet.create({
  flatList: {
    marginTop: 0,
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
    height: 93,
    shadowColor: Platform.OS === 'ios' ? '#fff3e5' : '#000',
  },
  imgCont: {
    width: 114,
    height: 93,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
  },
});
