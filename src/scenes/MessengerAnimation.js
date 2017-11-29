import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
} from 'react-native';
import { Toolbar, Paper } from 'react-native-paper';

import SnowflakeIcon from '../components/Snowflake';

const { width, height } = Dimensions.get('window');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default class MessengerAnimation extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Toolbar dark>
        <Toolbar.BackAction onPress={() => navigation.goBack()} />
        <Toolbar.Content title="Messenger" />
      </Toolbar>
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      snowflakes: [],
      animationCounter: 0,
    };

    this.handleAddSnowflake = this.handleAddSnowflake.bind(this);
  }

  handleAddSnowflake() {
    const snowAnimations = [...new Array(30)].map(
      () => new Animated.Value(height)
    );
    this.state.animationCounter < 3 &&
      this.setState(
        () => ({
          snowflakes: [
            ...this.state.snowflakes,
            ...snowAnimations.map(animation => ({
              animation,
              right: Math.floor(Math.random() * 10 + 1) > 5,
              start: getRandomInt(50, width - 50),
            })),
          ],
          animationCounter: this.state.animationCounter + 1,
        }),
        () => {
          Animated.stagger(
            400,
            snowAnimations.map(animation =>
              Animated.timing(animation, {
                toValue: 0,
                duration: 5000,
                useNativeDriver: true,
              })
            )
          ).start(() => {
            this.setState({
              animationCounter: this.state.animationCounter - 1,
            });
          });
        }
      );
  }

  render() {
    return (
      <Paper style={styles.container}>
        <View style={StyleSheet.absoluteFill}>
          {this.state.snowflakes.map(({ animation, start, right }, index) => {
            const positionInterpolate = animation.interpolate({
              inputRange: [0, height],
              outputRange: [height - 50, 0],
            });

            const opacityInterpolate = animation.interpolate({
              inputRange: [0, height - 200],
              outputRange: [0, 1],
            });

            const scaleInterpolate = animation.interpolate({
              inputRange: [0, height / 2, height],
              outputRange: [0, 1.5, 1],
              extrapolate: 'clamp',
            });

            const spin = animation.interpolate({
              inputRange: [0, 50],
              outputRange: right ? ['0deg', '30deg'] : ['0deg', '-30deg'],
            });

            const snowflakeStyle = {
              left: start,
              transform: [
                { translateY: positionInterpolate },
                { scale: scaleInterpolate },
                { rotate: spin },
              ],
              opacity: opacityInterpolate,
            };

            return <Snowflake key={`${index + 1}`} style={snowflakeStyle} />;
          })}
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TouchableWithoutFeedback onPress={this.handleAddSnowflake}>
              <View style={{ justifyContent: 'center', alignSelf: 'flex-end' }}>
                <SnowflakeIcon />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Paper>
    );
  }
}

const Snowflake = ({ style }) => (
  <Animated.View style={[styles.snowflake, style]}>
    <View style={[styles.stroke]} />
    <View style={[styles.stroke, styles.stroke2]} />
    <View style={[styles.stroke, styles.stroke3]} />
    <View style={[styles.stroke, styles.stroke4]} />
  </Animated.View>
);

const styles = StyleSheet.create({
  snowflake: {
    width: 50,
    height: 50,
    position: 'absolute',
  },
  stroke: {
    height: 30,
    width: 4,
    top: 0,
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
  container: {
    flex: 1,
    marginTop: -50,
    backgroundColor: '#2F1E5E',
  },
});
