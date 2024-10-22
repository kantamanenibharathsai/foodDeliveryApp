import React from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface IProps {
  ratingNum: number;
}


interface IState {}

class RatingComponent extends React.Component<IProps, IState> {

  renderStars = (): string[] => {
    const {ratingNum} = this.props;
    const stars: string[] = [];

    const fullStars = Math.floor(ratingNum);
    const hasHalfStar = ratingNum % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }
    if (hasHalfStar) {
      stars.push('star-half-o');
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push('star-o');
    }

    return stars;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderStars().map((star, index) => (
          <FontAwesome
            key={`${index}-star`}
            name={star}
            color="#FCD200"
            size={16}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default RatingComponent;
