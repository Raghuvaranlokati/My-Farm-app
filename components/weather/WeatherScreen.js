import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo icons
import SearchScreen from "./SearchScreen";

const API_KEY = '8a36c340baddd0b90a02ed68ec1e5e7b'; // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [showSearch, setShowSearch] = useState(false); // State to control the visibility of the search modal
  const [forecastData, setForecastData] = useState(null);

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

        // Fetch forecast data for the next 7 days
        const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
        setForecastData(forecastResponse.data.list);
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

  if (!weatherData || !forecastData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const temperature = Math.round(weatherData.main.temp - 273.15); // Convert temperature to Celsius
  const apparentTemperature = Math.round(weatherData.main.feels_like - 273.15);
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const windDirection = getWindDirection(weatherData.wind.deg);
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.body}>
          <Text style={styles.temperature}>Temperature: {temperature}°C</Text>
          <Text style={styles.description}>Description: {weatherData.weather[0].description}</Text>
        </View>
        <View style={styles.weatherDetailsContainer}>
          <View style={styles.weatherDetailCard}>
            <Text style={styles.weatherDetailLabel}>Apparent Temperature:</Text>
            <Text style={styles.weatherDetailValue}>{apparentTemperature}°C</Text>
          </View>
          <View style={styles.weatherDetailCard}>
            <Text style={styles.weatherDetailLabel}>Humidity:</Text>
            <Text style={styles.weatherDetailValue}>{humidity}%</Text>
          </View>
        </View>
        <View style={styles.weatherDetailsContainer}>
          <View style={styles.weatherDetailCard}>
            <Text style={styles.weatherDetailLabel}>Wind:</Text>
            <Text style={styles.weatherDetailValue}>{windSpeed} km/h {windDirection} wind</Text>
          </View>
          <View style={styles.weatherDetailCard}>
            <Text style={styles.weatherDetailLabel}>UV Index:</Text>
            <Text style={styles.weatherDetailValue}>{uvIndex}</Text>
          </View>
        </View>
        <View style={styles.weatherDetailsContainer}>
          <View style={styles.weatherDetailCard}>
            <Text style={styles.weatherDetailLabel}>Visibility:</Text>
            <Text style={styles.weatherDetailValue}>{visibility} km</Text>
          </View>
          <View style={styles.weatherDetailCard}>
            <Text style={styles.weatherDetailLabel}>Air Pressure:</Text>
            <Text style={styles.weatherDetailValue}>{airPressure} hPa</Text>
          </View>
        </View>
      </ScrollView>
      <Modal visible={showSearch} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowSearch(false)}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          {/* Replace SearchScreen with your actual search component */}
          <SearchScreen onSubmit={handleSearch} />
        </View>
      </Modal>
    </View>
  );
}

const getWindDirection = (degree) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((degree % 360) / 45);
  return directions[index % 8];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
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
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 18,
  },
  description: {
    fontSize: 16,
  },
  weatherDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Add some space between rows
    width: '100%',
    paddingHorizontal: 20, // Add horizontal padding for better spacing
  },
  weatherDetailCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    width: '48%', // Adjust width to fit two cards per row with space between them
  },
  weatherDetailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weatherDetailValue: {
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