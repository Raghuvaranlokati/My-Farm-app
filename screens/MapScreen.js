import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [mapType, setMapType] = useState('standard');
  const [area, setArea] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (coordinates.length >= 3) {
      setArea(calculatePolygonArea(coordinates));
    } else {
      setArea(0);
    }
  }, [coordinates]);

  const calculatePolygonArea = (coords) => {
    const EarthRadiusInKm = 6371; // Radius of the Earth in kilometers
    let totalArea = 0;

    // Convert latitude and longitude from degrees to radians
    const toRadians = (degrees) => {
      return degrees * Math.PI / 180;
    };

    // Calculate area for each triangle formed by consecutive vertices
    for (let i = 0; i < coords.length - 2; i++) {
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2];

      const dLon1 = toRadians(p2.longitude - p1.longitude);
      const dLat1 = toRadians(p2.latitude - p1.latitude);
      const dLon2 = toRadians(p3.longitude - p1.longitude);
      const dLat2 = toRadians(p3.latitude - p1.latitude);

      // Haversine formula for triangle area calculation
      const a = Math.sin(dLat1 / 2) * Math.sin(dLat1 / 2) +
                Math.cos(toRadians(p1.latitude)) * Math.cos(toRadians(p2.latitude)) *
                Math.sin(dLon1 / 2) * Math.sin(dLon1 / 2);
      const b = Math.sin(dLat2 / 2) * Math.sin(dLat2 / 2) +
                Math.cos(toRadians(p1.latitude)) * Math.cos(toRadians(p3.latitude)) *
                Math.sin(dLon2 / 2) * Math.sin(dLon2 / 2);
      
      // Calculate central angle between the vertices
      const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) +
                           2 * Math.atan2(Math.sqrt(b), Math.sqrt(1 - b));

      // Calculate area of triangle using spherical excess formula
      const sphericalExcess = centralAngle - Math.PI;
      const triangleArea = EarthRadiusInKm * EarthRadiusInKm * sphericalExcess;

      totalArea += triangleArea;
    }

    // Convert total area to square meters
    return Math.abs(totalArea) * 1000000;
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    if (coordinates.length === 0) {
      setCoordinates([coordinate]);
      fitToCoordinates([coordinate]);
      return;
    }
    let minDistance = Infinity;
    let insertIndex = 0;
    for (let i = 0; i < coordinates.length; i++) {
      const j = (i + 1) % coordinates.length;
      const [x1, y1] = [coordinates[i].latitude, coordinates[i].longitude];
      const [x2, y2] = [coordinates[j].latitude, coordinates[j].longitude];
      const [x, y] = [coordinate.latitude, coordinate.longitude];
      const distance = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
      if (distance < minDistance) {
        minDistance = distance;
        insertIndex = j;
      }
    }
    const newCoordinates = [...coordinates.slice(0, insertIndex), coordinate, ...coordinates.slice(insertIndex)];
    setCoordinates(newCoordinates);
    fitToCoordinates(newCoordinates);
  };

  const handleMapTypeChange = () => {
    setMapType(mapType === 'standard' ? 'satellite' : 'standard');
  };

  const handleUndo = () => {
    if (coordinates.length > 0) {
      const newCoordinates = coordinates.slice(0, coordinates.length - 1);
      setCoordinates(newCoordinates);
      fitToCoordinates(newCoordinates);
    }
  };

  const fitToCoordinates = (coords) => {
    mapRef.current.fitToCoordinates(coords, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType={mapType}
          showsUserLocation={true}
          followsUserLocation={true}
          onPress={handleMapPress}
        >
          {coordinates.map((coord, index) => (
            <Marker
              key={index}
              coordinate={coord}
            />
          ))}
          {coordinates.length > 2 && (
            <Polygon
              coordinates={coordinates}
              strokeWidth={2}
              strokeColor="red"
              fillColor="rgba(255,0,0,0.5)"
            />
          )}
        </MapView>
      )}
      {!location && <Text>Loading...</Text>}
      <TouchableOpacity style={{ position: 'absolute', bottom: 60, left: 20 }} onPress={handleUndo}>
        <MaterialIcons name="undo" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={{ position: 'absolute', bottom: 20, left: 20 }} onPress={handleMapTypeChange}>
        <MaterialIcons name={mapType === 'standard' ? 'satellite' : 'map'} size={24} color="black" />
      </TouchableOpacity>
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Text>Area: {area.toFixed(2)} sq meters</Text>
      </View>
    </View>
  );
};

export default MapScreen;
