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
      x: '',
      house: {},
      work: {},
      university: {}
    }
  }

async componentDidMount() {
  fetch('http://192.168.0.12:3000')
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          house: responseJson[0],
          work: responseJson[1],
          university: responseJson[2]
        })
      }) .catch((error) => {
        console.warn(error);
      });
}

   getPlaces = (place) => {
    if(place == 'house'){
      this.setState({name: this.state.house.name })
      this.setState({lat: this.state.house.place[0] })
      this.setState({lon: this.state.house.place[1] })
    }
    if(place == 'work'){
      this.setState({name: this.state.work.name })
      this.setState({lat: this.state.work.place[0] })
      this.setState({lon: this.state.work.place[1] })
    }
    if(place == 'uni'){
      this.setState({name: this.state.university.name })
      this.setState({lat: this.state.university.place[0] })
      this.setState({lon: this.state.university.place[1] })
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
