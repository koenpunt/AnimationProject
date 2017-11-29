import { StackNavigator } from 'react-navigation';

import Home from './scenes/Home';
import InstagramAnimation from './scenes/InstagramAnimation';
import MessengerAnimation from './scenes/MessengerAnimation';
import TinderAnimation from './scenes/TinderAnimation';

export default StackNavigator({
  Home: {
    screen: Home,
  },
  InstagramAnimation: {
    screen: InstagramAnimation,
  },
  MessengerAnimation: {
    screen: MessengerAnimation,
  },
  TinderAnimation: {
    screen: TinderAnimation,
  },
});
