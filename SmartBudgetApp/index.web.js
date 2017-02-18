/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import Application from './Application';

export default class SmartBudget extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Application />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

let container = document.getElementById('react-root');
if (!container) {
  container = document.createElement('div');
  container.style.height = '100%';
  container.style.width = '100%';
  document.body.appendChild(container);
}

AppRegistry.registerComponent('SmartBudget', () => SmartBudget);
AppRegistry.runApplication('SmartBudget', { rootTag: container });
