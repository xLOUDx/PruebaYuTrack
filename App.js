import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  constructor(props){
    super (props)
    this.state = {
      lat: 0,
      lon: 0,
      name: '',
      x: ''
    }
  }

  async function getPlaces = (place) => {
    if(place == 'house'){
      this.setState({name: 'Casa'})
      this.setState({lat: -36.82379704})
      this.setState({lon: -73.05620264})

    }
    if(place == 'work'){
      this.setState({name: 'Trabajo'})
      this.setState({lat: -36.82269774})
      this.setState({lon: -73.04822039})

    }
    if(place == 'uni'){
      this.setState({name: 'Universidad'})
      this.setState({lat: -36.82530856})
      this.setState({lon: -73.06040835})

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <MapView
            style={ styles.map }
            region={{
              latitude: this.state.lat,
              longitude: this.state.lon,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
          >
          <MapView.Marker
            coordinate={{
              latitude: this.state.lat,
              longitude: this.state.lon
            }}
            title={ this.state.name }
          />

          <Marker draggable
            coordinate={this.state.x}
            onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
          />

          </MapView>
        </View>

          <View style={ styles.cordinates }>
            <Button
              onPress={ () => this.getPlaces('house') }
             title="Casa"
            />
            <Button
              onPress={ () =>this.getPlaces('work') }
             title="Trabajo"
            />
            <Button
              onPress={ () => this.getPlaces('uni') }
             title="Universidad"
            />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 50,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  cordinates: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 30
  },

});
