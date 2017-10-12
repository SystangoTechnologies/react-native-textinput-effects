import React, { PropTypes, Component } from 'react';
import {
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

const PADDING = 10;

export default class Hoshi extends BaseInput {

  static propTypes = {
    borderColor: PropTypes.string,

    /*
     * this is used to set backgroundColor of label mask.
     * this should be replaced if we can find a better way to mask label animation.
     */
    backgroundColor: PropTypes.string,
    height: PropTypes.number,
  };

  static defaultProps = {
    borderColor: 'red',
    height: 48,
  };

  render() {
    var {
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
      backgroundColor: maskColor,
      borderColor,
      height: inputHeight,
      editable,
      _ref
    } = this.props;
    const {
      width,
      focusedAnim,
      value,
    } = this.state;

    return (
      <View
        style={[containerStyle, styles.container, {
          height: inputHeight + PADDING,
          width,
        }]}
        onLayout={this._onLayout}
      >
        <TextInput
          ref={_ref}
          {...this.props}
          style={[styles.textInput, inputStyle, {
            width,
            height: inputHeight,
          }]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={'transparent'}
          editable={editable == 'yes' ? true : false}
        />
        <TouchableWithoutFeedback onPress={this._focus}>
          <Animated.View style={[styles.labelContainer, {
            opacity: focusedAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 0, 1],
            }),
            top: focusedAnim.interpolate({
              inputRange: [0, 0.5, 0.51, 1],
              outputRange: [24, 24, 0, 0],
            }),
            left: focusedAnim.interpolate({
              inputRange: [0, 0.5, 0.51, 1],
              outputRange: [PADDING, 2 * PADDING, 0, 2],
            }),
          }]}>
            <Text style={[styles.label, labelStyle]}>
              {label}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <View style={[styles.labelMask, { backgroundColor: maskColor }]} />
        <Animated.View
          style={[styles.border, {
            width: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width],
            }),
            backgroundColor: borderColor,
          }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#b9c1ca',
  },
  labelContainer: {
    position: 'absolute',
  },
  label: {
    fontSize: 16,
    color: '#A9A9A9',
    marginLeft:0
  },
  textInput: {
    position: 'absolute',
    left: 2,
    padding: 0,
    color: '#6a7989',
    fontSize: 18,
    top:15
  },
  labelMask: {
    height: 24,
    width: PADDING,
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
  },
});
