import React, { Component } from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import color from 'color';

import Routes from './routes';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    primaryDark: color('tomato')
      .darken(0.2)
      .rgb()
      .string(),
    accent: 'yellow',
  },
};

export default class AnimationProject extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
  }
  render() {
    return (
      <PaperProvider theme={theme}>
        <Routes />
      </PaperProvider>
    );
  }
}

AppRegistry.registerComponent('AnimationProject', () => AnimationProject);
