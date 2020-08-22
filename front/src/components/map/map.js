import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBTj2p2YAu5z3sVoptX_7LixQ_NqEAW5JY'}}
          defaultCenter={{lat:this.props.lat, lng:this.props.lng}  }
          defaultZoom={this.props.zoom}
        >
        <Marker
            lat={this.props.lat}
            lng={this.props.lng}
            name="My Marker"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;