/* eslint-disable global-require */
import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Toolbar, Paper } from 'react-native-paper';

const icons = [
  require('../assets/icons/instagram.png'),
  require('../assets/icons/tinder.png'),
  require('../assets/icons/messenger.png'),
];

export default class Home extends React.Component {
  static navigationOptions = () => ({
    header: (
      <Toolbar dark>
        <Toolbar.Content title="Animations" />
      </Toolbar>
    ),
  });

  render() {
    const { navigate } = this.props.navigation;
    const renderItem = (navigateTo, icon) => (
      <TouchableOpacity
        onPress={() => {
          navigate(navigateTo);
        }}
        style={styles.paper}
      >
        <Paper style={[styles.paper, { elevation: 5 }]}>
          <Image style={styles.icon} source={icon} />
        </Paper>
      </TouchableOpacity>
    );

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {renderItem('InstagramAnimation', icons[0])}
        {renderItem('TinderAnimation', icons[1])}
        {renderItem('MessengerAnimation', icons[2])}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  paper: {
    margin: 40,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 40,
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
  },
});
