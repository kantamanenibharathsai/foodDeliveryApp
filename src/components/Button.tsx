import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { colors } from '../utils/Colors';
import { fonts } from '../constants/fonts';


interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
}

export default class Button extends Component<ButtonProps> {
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
    borderRadius: 60,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    shadowColor: '#94CD00',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: fonts.bai.black,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: responsiveFontSize(2),
  },
});
