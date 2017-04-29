import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import Runinfo from './components/run-info';

export default class tutsplus_get_started extends Component {
  render() {
    return (
      <View>
        <Text>MAPVIEW</Text>
        <View>
          <Runinfo title="Distance" value="0 km"></Runinfo>
          <Runinfo title="Speed" value="0 km/h"></Runinfo>
          <Runinfo title="Direction" value="NE"></Runinfo>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('tutsplus_get_started', () => tutsplus_get_started);
