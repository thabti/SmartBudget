import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import styles from './SplashScreen.scss';

const Application = (() => (
  <View
    className={[styles.container, styles.transparentContainer].join(' ')}
    style={{opacity: 1}}
  >
    <View className={styles.content}>
      <Text className={styles.helloworld}>Hello world!</Text>
    </View>
  </View>
));

export default Application;
