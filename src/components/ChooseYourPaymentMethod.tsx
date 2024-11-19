import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageSourcePropType,
  Image,
} from 'react-native';
import {creditCardImg, bankAccImg, upiImg, cashOnDeliveryImg} from '../assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../utils/Colors';
import {fonts} from '../constants/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface PaymentOption {
  id: string;
  title: string;
  subtitle?: string;
  image: ImageSourcePropType;
}

interface State {
  selectedOption: string | null;
  isModalVisible: boolean;
}

interface Props {
  setIsModalVisible: () => void;
}

class PaymentModal extends Component<Props, State> {
  state: State = {
    selectedOption: null,
    isModalVisible: true,
  };

  paymentOptions: PaymentOption[] = [
    {
      id: 'creditCard',
      title: 'Credit Card',
      subtitle: 'XXXX XXXX XXXX',
      image: creditCardImg,
    },
    {
      id: 'bankAccount',
      title: 'Bank Account',
      image: bankAccImg,
    },
    {
      id: 'upi',
      title: 'UPI',
      image: upiImg,
    },
    {
      id: 'cashOnDelivery',
      title: 'Cash On Delivery',
      image: cashOnDeliveryImg,
    },
  ];

  setSelectedOption = (optionId: string) => {
    this.setState({selectedOption: optionId});
  };

  renderPaymentOption = ({item}: {item: PaymentOption}) => {
    const {selectedOption} = this.state;
    const isSelected = selectedOption === item.id;

    return (
      <View style={styles.optionContainer}>
        <View style={styles.imgTxtCont}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.cardImg} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>{item.title}</Text>
            {item.subtitle && (
              <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
            )}
          </View>
        </View>
        {isSelected ? (
          <TouchableOpacity onPress={() => this.setSelectedOption(item.id)}>
            <MaterialIcons
              name={'radio-button-on'}
              size={20}
              color={colors.red}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.setSelectedOption(item.id)}>
            <MaterialIcons
              name={'radio-button-off'}
              size={20}
              color={colors.lightTextColor}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  continueBtnFunc = () => {
    this.props.setIsModalVisible();
  };

  render() {
    const {isModalVisible} = this.state;

    return (
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => this.setState({isModalVisible: false})}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={this.continueBtnFunc}>
          <View style={styles.modalContainer}>
            <FlatList
              data={this.paymentOptions}
              keyExtractor={item => item.id}
              renderItem={this.renderPaymentOption}
              style={styles.flatList}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={this.continueBtnFunc}
                activeOpacity={0.7}
                disabled={!this.state.selectedOption}
                style={[
                  styles.buttonContainer,
                  {
                    backgroundColor: this.state.selectedOption
                      ? colors.green
                      : colors.lightTextColor,
                    shadowColor: this.state.selectedOption
                      ? '#94CD00'
                      : colors.greyColor,
                  },
                ]}>
                <Text style={styles.buttonText}>CONTINUE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default PaymentModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(3.5),
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(6.5),
    paddingVertical: responsiveWidth(1.5),
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderColor: '#EDEDED',
    borderWidth: 2,
    justifyContent: 'space-between',
    height: 75,
  },
  selectedOption: {
    borderColor: 'green',
    borderWidth: 2,
  },
  imageContainer: {
    marginRight: responsiveWidth(2),
  },
  cardImg: {
    width: 54,
    height: 36,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: responsiveFontSize(2),
    color: colors.black,
    fontFamily: fonts.bai.semiBold,
  },
  optionSubtitle: {
    fontSize: responsiveFontSize(1.3),
    color: colors.lightTextColor,
    fontFamily: fonts.montserrat.medium,
    marginLeft: 10,
  },
  radio: {
    fontSize: 18,
    color: 'green',
  },
  continueButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  iconPlaceholder: {
    fontSize: 20,
  },

  imgTxtCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  flatList: {
    marginBottom: 13,
  },

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
