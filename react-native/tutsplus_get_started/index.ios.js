import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

import MapView from 'react-native-maps';
import haversine from 'haversine';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import RunInfo from './components/run-info';
import RunInfoNumeric from './components/run-info-numeric';

const styles = StyleSheet.create({
  infoWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1
  },

  map: {
    ...StyleSheet.absoluteFillObject
  }
});

let id = 0;
import reducer from './reducer';
import { incrementDistance, setSpeed, setDirection } from './actions';
const store = createStore(reducer);

export default class tutsplus_get_started extends Component {
  constructor(props) {
    super(props);

    let watchID = navigator.geolocation.watchPosition((position) => {
      store.dispatch(setSpeed(position.coords.speed));

      if (this.state.previousCoordinate) {
        let distance = haversine(this.state.previousCoordinate, position.coords);
        store.dispatch(incrementDistance(distance));
      }

      store.dispatch(setDirection(position.coords.heading));

      this.setState({
        markers: [
          ...this.state.markers, {
            coordinate: position.coords,
            key: id++
          }
        ],
        previousCoordinate: position.coords
      })
    }, null, { distanceFilter: 10 });

    this.state = { markers: [], watchID };
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchID);
  }

  addMarker(region) {
    let now = (new Date).getTime();

    if (this.state.lastAddedMarker > now - 5000) {
      return;
    }

    this.setState({
      markers: [
        ...this.state.markers, {
          coordinate: region,
          key: id++
        }
      ],

      lastAddedMarker: now
    })
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MapView style={styles.map}
            showsUserLocation
            followsUserLocation
          >
            <MapView.Polyline
              coordinates={this.state.markers.map((marker) => marker.coordinate )}
              strokeWidth={5}
            />
          </MapView>
          <View style={styles.infoWrapper}>
            <RunInfoNumeric title="Distance" type="distance"
              unit="km"
              ref={(info) => this.distanceInfo = info}
              />
            <RunInfoNumeric title="Speed" type="speed"
              unit="km/h"
              ref={(info) => this.speedInfo = info}
            />
            <RunInfo title="Direction" type="direction"
              value="NE"
              ref={(info) => this.directionInfo = info}
            />
          </View>
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('tutsplus_get_started', () => tutsplus_get_started);
