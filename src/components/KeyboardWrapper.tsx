import React, {Component, ReactNode} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

interface IProps {
  children: ReactNode;
}

class KeyboardWrapper extends Component<IProps, {}> {
  render() {
    return (
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {this.props.children}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    justifyContent: 'space-between',
    minHeight: '100%',
  },
});

export default KeyboardWrapper;
