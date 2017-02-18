import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

// import Styles from './Application.scss';
// scss not working for native (android and ios), I will try to fix it soon.

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  }
});

const Application = (() => (
  <View style={Styles.container}>
    <Text>Hello world!</Text>
  </View>
));

export default Application;
