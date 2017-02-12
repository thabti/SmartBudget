import React, {
  Component
} from 'react';
import {
  Text,
  View
} from 'react-native';

import Styles from './Application.scss';

function onClick() {
  alert('TEST');
}

class Application extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text onClick={onClick}>Hello world!</Text>
      </View>
    );
  }
};

export default Application;
