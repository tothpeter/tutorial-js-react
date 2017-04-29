import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

export default class Runinfo extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
        <Text>{this.props.value}</Text>
      </View>
    );
  }
}
