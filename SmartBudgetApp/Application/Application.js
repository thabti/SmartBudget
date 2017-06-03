import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import textStyles from './Application.scss';

const Application = (() => (
  <View className={textStyles.container}>
    <View className={textStyles.content}>
      <Text className={textStyles.helloworld}>Hello world!</Text>
      <Text className={textStyles.helloworld}>Greeting!</Text>
      <Text className={textStyles.helloworld}>Hello!</Text>
      <Text className={textStyles.helloworld}>Hello!</Text>
      <Text className={textStyles.helloworld}>Nothing else!</Text>
      <Text className={textStyles.helloworld}>Nothing else!</Text>
      <Text className={textStyles.helloworld}>Hello!</Text>
      <Text className={textStyles.helloworld}>Nothing else!</Text>
      <Text className={textStyles.helloworld}>Nothing else!</Text>
      <Text className={textStyles.helloworld}>Nothing else!</Text>
      <Text className={textStyles.helloworld}>Nothing else!</Text>
      <Text className={textStyles.helloworld}>Nothing else!</Text>
      <Text className={textStyles.helloworld}>Nothing else!</Text>
    </View>
  </View>
));

export default Application;
