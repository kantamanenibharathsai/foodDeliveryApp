import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default class CustomButton extends Component<ButtonProps> {
  render() {
    const {title, onPress, style, textStyle} = this.props;

    return (
      <View style={[styles.buttonContainer, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 385,
    height: 75,
    alignSelf: 'center',
    borderRadius: 60,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    marginVertical: 10,
    shadowColor: '#94CD00',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: fonts.bai.black,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: responsiveFontSize(2.3),
  },
});
