import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {downArrowIcon, phoneIcon} from '../assets';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

interface PhoneInputFieldProps {
  onChangePhone: (phone: string) => void;
  onBlur: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value: string;
  name: string;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean | undefined>;
}

interface PhoneInputFieldState {
  showPicker: boolean;
  selectedCountryCode: string;
  selectedFlag: string;
  selectedCountryAbbreviation: string;
  noCountriesFound: boolean;
  searchQuery: string;
  placeholderVisible: boolean;
}

class PhoneInputField extends Component<
  PhoneInputFieldProps,
  PhoneInputFieldState
> {
  constructor(props: PhoneInputFieldProps) {
    super(props);
    this.state = {
      showPicker: false,
      selectedCountryCode: '+91',
      selectedFlag: '🇮🇳',
      selectedCountryAbbreviation: 'IND',
      noCountriesFound: false,
      searchQuery: '',
      placeholderVisible: true,
    };
  }

  handlePickerSelect = async (country: {
    dial_code: string;
    flag: string;
    code: string;
  }) => {
    console.log('dail-code', country.dial_code);
    this.setState({
      selectedCountryCode: country.dial_code,
      selectedFlag: country.flag,
      selectedCountryAbbreviation: country.code.toUpperCase(),
      showPicker: false,
    });
    await AsyncStorage.setItem('selectedCountryCode', country.dial_code);
  };

  render() {
    const {
      showPicker,
      selectedCountryCode,
      selectedFlag,
      noCountriesFound,
      placeholderVisible,
    } = this.state;

    const {onChangePhone, onBlur, value, errors, touched} = this.props;

    return (
      <View style={styles.inputLabelContainer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => this.setState({showPicker: true})}
            style={styles.flagContainer}>
            <View style={styles.flagCont}>
              <Text style={styles.flagIcon}>{selectedFlag}</Text>
            </View>
            <Text style={styles.codeText}>{selectedCountryCode}</Text>
            <Image source={downArrowIcon} style={styles.arrowIcon} />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, styles.commonText]}
            placeholder="Mobile No"
            placeholderTextColor={colors.black}
            value={value}
            onChangeText={text => {
              const filteredText = text.replace(/[^0-9]/g, '');
              onChangePhone(filteredText);
              this.setState({placeholderVisible: text === ''});
            }}
            onBlur={onBlur}
            keyboardType="phone-pad"
            maxLength={10}
          />
          {/* {placeholderVisible && (
            <Text style={styles.placeholderText}>Mobile No</Text>
          )} */}
          <Image source={phoneIcon} style={styles.inputIcon} />
        </View>

        {touched.phone && errors.phone && (
          <Text style={styles.errorText}>{errors.phone}</Text>
        )}
        <CountryPicker
          show={showPicker}
          onBackdropPress={() => this.setState({showPicker: false})}
          pickerButtonOnPress={this.handlePickerSelect}
          style={{
            modal: {
              height: 450,
              backgroundColor: 'white',
              borderRadius: 10,
            },
            itemsList: {
              maxHeight: 500,
            },
            textInput: {
              height: 50,
              borderBottomWidth: 1,
              borderColor: '#ddd',
              paddingHorizontal: 10,
            },
            countryButtonStyles: {
              height: 50,
              paddingHorizontal: 20,
              alignItems: 'center',
              flexDirection: 'row',
            },
            flag: {
              fontSize: 20,
              marginRight: 10,
            },
            dialCode: {
              fontSize: 16,
              color: '#333',
            },
            countryName: {
              fontSize: 16,
              color: '#333',
            },
          }}
          lang="en"
          searchMessage={!noCountriesFound ? 'No countries found' : ''}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputLabelContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 375,
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 20,
    borderBottomWidth: 1.5,
    borderColor: '#CFCFCF',
  },
  input: {
    flex: 1,
    color: colors.black,
    fontSize: 18,
    paddingLeft: 10,
  },
  placeholderText: {
    position: 'absolute',
    left: 138,
    top: 11,
    color: colors.black,
    fontFamily: fonts.montserrat.extraBold,
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 28,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#CFCFCF',
  },
  codeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    marginLeft: 2,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    marginRight: -5,
  },
  errorText: {
    color: colors.red,
    fontSize: responsiveFontSize(1.3),
    marginTop: 5,
    fontFamily: fonts.montserrat.medium,
  },
  commonText: {
    fontSize: 14,
    fontFamily: fonts.montserrat.medium,
  },
  flagCont: {
    width: 24,
    height: 24,
    borderRadius: 100,
    marginRight: 7,
  },
  flagIcon: {
    width: 25,
    height: 25,
    fontSize: 16,
  },
});

export default PhoneInputField;
