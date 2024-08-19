import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { Iconify } from "react-native-iconify";
import useData from "../hook/db";

const Map = () => {
  const [location, setLocation] = useState([]);
  const [polygon, setPolygon] = useState([]);
  const data = useData();

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  useEffect(() => {
    if (data.length > 0) {
      const mapLocation = data.map((item) => {
        const [lat, long, time] = item.coords;
        return {
          latitude: lat,
          longitude: long,
          color: item.imag,
         
        };
      });
      const polygonCoordinates = data.map(item =>(
       {
       coordinates: item.coord.map((coord) => ({
        latitude: coord[0],
        longitude: coord[1],
      })),
       color: item.imag,
        }));
      


      setPolygon(polygonCoordinates);
      setLocation(mapLocation);
    }
  }, [data]);

    

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    map: {
      width: "100%",
       height: "160%",
      
    },
  });
 



  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -8.113436,
          longitude: -79.029644,
          latitudeDelta: 0.1,
          longitudeDelta: 0.05,
        }}
        style={styles.map}
        customMapStyle={customMapStyle}
       
      >
        {location.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            title="Mi ubicacion"
            description="Aqui estoy"
          >
            <Iconify icon="mdi:car" size={21} color={`#${item.color}`} />
          </Marker>
        ))}
       {polygon.map((polygon, index) => {

         const rgb = hexToRgb(`#${polygon.color}`);
         return (
            <Polygon
                key={index}
                coordinates={polygon.coordinates}
                strokeColor="#000"
                fillColor={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`}
                strokeWidth={0.2}
            />
            );
         })}

         
       
      </MapView>
    </View>
  );
};

export default Map;

const customMapStyle =
[
  {
      "featureType": "all",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#202c3e"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "gamma": 0.01
          },
          {
              "lightness": 20
          },
          {
              "weight": "1.39"
          },
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "weight": "0.96"
          },
          {
              "saturation": "9"
          },
          {
              "visibility": "on"
          },
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": 30
          },
          {
              "saturation": "9"
          },
          {
              "color": "#29446b"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
          {
              "saturation": 20
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": 20
          },
          {
              "saturation": -20
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": 10
          },
          {
              "saturation": -30
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#193a55"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "saturation": 25
          },
          {
              "lightness": 25
          },
          {
              "weight": "0.01"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "lightness": -20
          }
      ]
  }
]