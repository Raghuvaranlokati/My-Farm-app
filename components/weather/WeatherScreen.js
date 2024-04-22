import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import SearchScreen from './SearchScreen';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo icons

const API_KEY = '8a36c340baddd0b90a02ed68ec1e5e7b'; // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [showSearch, setShowSearch] = useState(false); // State to control the visibility of the search modal

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Location permission denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let { latitude, longitude } = location.coords;

        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        setWeatherData(response.data);

        // Fetch city name using reverse geocoding
        const cityResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
        const city = cityResponse[0].city;
        setCityName(city);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    })();
  }, []);

  const handleSearch = async (city) => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      setWeatherData(response.data);
      setCityName(city);
      setShowSearch(false); // Close the search modal after submitting the search
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const temperature = Math.round(weatherData.main.temp - 273.15); // Convert temperature to Celsius
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const uvIndex = weatherData.uv;
  const visibility = weatherData.visibility / 1000; // Convert visibility to km
  const airPressure = weatherData.main.pressure;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.cityName}>{cityName}</Text>
        <TouchableOpacity onPress={() => setShowSearch(true)}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.temperature}>Temperature: {temperature}°C</Text>
        <Text style={styles.description}>Description: {weatherData.weather[0].description}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.weatherDetails}>
          Weather Details: {temperature}°C, {humidity}% humidity, {windSpeed} km/h wind, UV: {uvIndex}, Visibility: {visibility} km, Pressure: {airPressure} hPa
        </Text>
      </View>
      <Modal visible={showSearch} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowSearch(false)}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <SearchScreen onSubmit={handleSearch} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Add space between city name and search icon
    marginBottom: 20,
    paddingHorizontal: 20, // Add horizontal padding for better spacing
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperature: {
    fontSize: 18,
  },
  description: {
    fontSize: 16,
  },
  footer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherDetails: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
