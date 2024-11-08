import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  FlatList,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import {categoryImages} from '../utils/Data';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

class CategoryScreen extends Component<Props> {
  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <>
        <View style={styles.categoryHeader}>
          <TouchableOpacity onPress={this.handleGoBack} style={styles.leftIcon}>
            <Entypo name="chevron-small-left" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.categoryText}>Category</Text>
        </View>
        <View style={styles.bodyCont}>
          <FlatList
            contentContainerStyle={styles.flatListHomeStyle}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            data={categoryImages}
            renderItem={({item}) => (
              <View>
                <Image style={styles.foodImg} source={item.image} />
              </View>
            )}
          />
        </View>
      </>
    );
  }
}

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  categoryHeader: {
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? '#F5ECE2' : '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 1,
    height: 98,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    marginTop: 40,
    marginLeft: 5,
  },
  categoryText: {
    fontSize: 20,
    marginTop: 40,
    fontFamily: fonts.bai.semiBold,
    color: colors.black,
    marginLeft: 4,
  },
  bodyCont: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: responsiveWidth(4),
  },
  flatListHomeStyle: {
    gap: 10,
    alignSelf: 'center',
    width: '100%',
  },
  foodImg: {
    resizeMode: 'cover',
    width: '100%',
    height: 137,
    borderRadius: 10,
  },
});
