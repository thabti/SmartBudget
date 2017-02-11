import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

function onClick() {
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#F5FCFF',
  }
});

class Application extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text onClick={onClick}>Hello world!</Text>
      </View>
    );
  }
};

export default Application;
