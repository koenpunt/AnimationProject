/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Image,
  PanResponder,
  Dimensions,
} from 'react-native';
import { Toolbar, Paper } from 'react-native-paper';

const photos = [
  require('../assets/photos/ryu.jpg'),
  require('../assets/photos/ryu2.jpg'),
  require('../assets/photos/ryu3.jpg'),
];

const { width, height } = Dimensions.get('window');

export default class TinderAnimation extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Toolbar dark>
        <Toolbar.BackAction onPress={() => navigation.goBack()} />
        <Toolbar.Content title="Tinder" />
      </Toolbar>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
      animatedAxisZ: new Animated.Value(0),
      animatedResponderValue: new Animated.ValueXY(0),
      currentPhotoIndex: 0,
      img: photos[0],
      liked: false,
      nope: false,
    };
  }

  componentWillMount() {
    this._value = { x: 0, y: 0 };
    this.state.animatedResponderValue.addListener(value => {
      this.state.animatedAxisZ.setValue(value.x);
      value.x >= 0
        ? this.setState({ liked: true, nope: false })
        : this.setState({ nope: true, liked: false });
      this._value = value;
    });
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animatedResponderValue.x,
          dy: this.state.animatedResponderValue.y,
        },
      ]),
      onPanResponderRelease: (e, gestureState) => {
        Animated.decay(this.state.animatedResponderValue, {
          deceleration: 0.9,
          velocity: { x: gestureState.vx, y: gestureState.vy },
        }).start(() => {
          if (this.state.animatedResponderValue.x._value > width * 0.25) {
            Animated.parallel([
              Animated.timing(this.state.animatedResponderValue.x, {
                toValue: width * 1.16,
                duration: 200,
              }),
              Animated.timing(this.state.animatedResponderValue.y, {
                toValue: -height * 0.3,
                duration: 200,
              }),
            ]).start();
          } else if (
            this.state.animatedResponderValue.x._value <
            -width * 0.25
          ) {
            Animated.parallel([
              Animated.timing(this.state.animatedResponderValue.x, {
                toValue: -width * 1.16,
                duration: 200,
              }),
              Animated.timing(this.state.animatedResponderValue.y, {
                toValue: -height * 0.3,
                duration: 200,
              }),
            ]).start();
          } else this.state.animatedResponderValue.setValue({ x: 0, y: 0 });
          this.setState({ liked: false, nope: false });
        });
      },
    });
  }

  flipCard(leftSide) {
    Animated.spring(this.state.animatedValue, {
      toValue: leftSide ? -15 : 15,
      speed: 100,
      bounciness: 100,
    }).start(() => {
      this.state.animatedValue.setValue(0);
    });
  }

  onNextPhoto = () => {
    this.setState({
      currentPhotoIndex: this.state.currentPhotoIndex + 1,
    });
  };

  onPrevPhoto = () => {
    this.setState({
      currentPhotoIndex: this.state.currentPhotoIndex - 1,
    });
  };

  render() {
    const flipStyle = this.state.animatedValue.interpolate({
      inputRange: [0, 15],
      outputRange: ['0deg', '15deg'],
    });

    const zAxisInterpolate = this.state.animatedAxisZ.interpolate({
      inputRange: [0, width],
      outputRange: ['0deg', '20deg'],
    });

    const opacityInterpolate = this.state.animatedAxisZ.interpolate({
      inputRange:
        this.state.animatedAxisZ._value > 0 ? [0, width / 2] : [-width / 2, 0],
      outputRange: this.state.animatedAxisZ._value > 0 ? [0, 1] : [1, 0],
    });

    const flipAnimatedStyle = {
      transform: [{ perspective: 1000 }, { rotateY: flipStyle }],
    };

    const rotateAnimatedStyle = {
      transform: [
        { rotateZ: zAxisInterpolate },
        { translateX: this.state.animatedResponderValue.x },
        { translateY: this.state.animatedResponderValue.y },
      ],
    };

    const opacityStyle = {
      opacity: opacityInterpolate,
    };

    const isLastItem = this.state.currentPhotoIndex + 1 === photos.length;
    const isFirstItem = this.state.currentPhotoIndex === 0;

    return (
      <Paper style={styles.container}>
        <View>
          <Animated.View
            style={rotateAnimatedStyle}
            {...this.panResponder.panHandlers}
          >
            <Animated.View style={[styles.flipCard, flipAnimatedStyle]}>
              {this.state.liked && (
                <View style={styles.textContainer}>
                  <Animated.Text style={[styles.likeText, opacityStyle]}>
                    LIKE
                  </Animated.Text>
                </View>
              )}
              {this.state.nope && (
                <View style={styles.textContainer}>
                  <Animated.Text style={[styles.nopeText, opacityStyle]}>
                    NOPE
                  </Animated.Text>
                </View>
              )}
              <Image
                source={photos[this.state.currentPhotoIndex]}
                style={styles.photo}
              />
              <TouchableOpacity
                style={styles.leftSide}
                onPress={leftSide =>
                  isFirstItem ? this.flipCard(leftSide) : this.onPrevPhoto()
                }
              />
              <TouchableOpacity
                style={styles.rightSide}
                onPress={() =>
                  isLastItem ? this.flipCard() : this.onNextPhoto()
                }
              />
            </Animated.View>
          </Animated.View>
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
    overflow: 'hidden',
  },
  photo: {
    width: 350,
    height: 350,
    borderRadius: 15,
    position: 'absolute',
  },
  textContainer: {
    zIndex: 999,
    position: 'absolute',
  },
  flipCard: {
    width: 350,
    height: 350,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    justifyContent: 'center',
    elevation: 9,
  },
  leftSide: {
    width: 175,
    height: 350,
  },
  rightSide: {
    width: 175,
    height: 350,
  },
  likeText: {
    color: '#66ff99',
    fontSize: 35,
    bottom: 100,
    right: 100,
    transform: [
      {
        rotateZ: '-30deg',
      },
    ],
    borderWidth: 5,
    padding: 5,
    borderColor: '#66ff99',
  },
  nopeText: {
    color: '#ff3333',
    fontSize: 35,
    bottom: 100,
    left: 100,
    transform: [
      {
        rotateZ: '30deg',
      },
    ],
    borderWidth: 5,
    padding: 5,
    borderColor: '#ff3333',
  },
});
