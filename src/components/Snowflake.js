import React from 'react';
import { View, StyleSheet } from 'react-native';

const Snowflake = ({ style }) => (
  <View style={[styles.snowflake, style]}>
    <View style={styles.stroke} />
    <View style={[styles.stroke, styles.stroke2]} />
    <View style={[styles.stroke, styles.stroke3]} />
    <View style={[styles.stroke, styles.stroke4]} />
  </View>
);

const styles = StyleSheet.create({
  snowflake: {
    width: 50,
    height: 50,
  },
  stroke: {
    height: 30,
    width: 4,
    backgroundColor: '#87CEFA',
    position: 'absolute',
  },
  stroke2: {
    transform: [{ rotate: '90deg' }],
  },
  stroke3: {
    transform: [{ rotate: '45deg' }],
  },
  stroke4: {
    transform: [{ rotate: '-45deg' }],
  },
});

export default Snowflake;
