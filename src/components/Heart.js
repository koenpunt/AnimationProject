import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const Heart = ({ filled, style, ...props }) => (
  <Animated.View {...props} style={[styles.heart, style]}>
    <View style={[styles.leftHeart, styles.heartShape]} />
    <View style={[styles.rightHeart, styles.heartShape]} />
  </Animated.View>
);

const styles = StyleSheet.create({
  heart: {
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
  },
  heartShape: {
    width: 48,
    height: 72,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'white',
  },
  filledHeart: {
    backgroundColor: 'white',
  },
  leftHeart: {
    transform: [{ rotate: '-45deg' }],
    left: 7,
  },
  rightHeart: {
    transform: [{ rotate: '45deg' }],
    right: 7,
  },
});

export default Heart;
