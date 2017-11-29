/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { Toolbar, Paper } from 'react-native-paper';

import Heart from '../components/Heart';

export default class InstagramAnimation extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Toolbar dark>
        <Toolbar.BackAction onPress={() => navigation.goBack()} />
        <Toolbar.Content title="Instagram" />
      </Toolbar>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      lastPress: 0,
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
    };
  }

  onPress = () => {
    const delta = new Date().getTime() - this.state.lastPress;

    if (delta < 200) {
      this.toggleAnimation();
    }

    this.setState({
      lastPress: new Date().getTime(),
    });
  };

  toggleAnimation() {
    this.setState({
      liked: true,
    });
    Animated.sequence([
      Animated.parallel([
        Animated.spring(this.state.scale, {
          toValue: 2,
          friction: 3,
        }),
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 0,
        }),
      ]),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 100,
      }),
    ]).start(() => {
      this.state.scale.setValue(0);
    });
  }

  render() {
    const bouncyHeart = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 0.8, 1],
    });

    const heartStyle = {
      transform: [{ scale: bouncyHeart }],
      position: 'absolute',
      top: 160,
      left: 160,
      opacity: this.state.opacity,
    };

    return (
      <Paper style={styles.container}>
        <View>
          <TouchableWithoutFeedback onPress={this.onPress}>
            <View>
              <Image
                source={require('../assets/photos/ryu.jpg')}
                style={styles.photo}
              />
              <Heart style={heartStyle} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Paper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: 400,
    height: 400,
  },
});
