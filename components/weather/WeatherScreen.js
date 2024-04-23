import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, Linking, Animated, Easing } from 'react-native';
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
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

        // Fetch forecast data for the next 5 days
        const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
        const filteredForecast = filterForecastData(forecastResponse.data.list);
        setForecastData(filteredForecast);

        // Fade in animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    })();
  }, []);

  const filterForecastData = (forecastList) => {
    const filteredForecast = {};
    forecastList.forEach(item => {
      const date = item.dt_txt.split(' ')[0].split('-').slice(-1)[0]; // Extract only the day part of the date
      if (!filteredForecast[date]) {
        filteredForecast[date] = item;
      }
    });
    return Object.values(filteredForecast);
  };

  if (!weatherData || !forecastData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const temperature = Math.round(weatherData.main.temp - 273.15); // Convert temperature to Celsius

  const openInBrowser = () => {
    Linking.openURL('https://weather.com/en-GB/weather/tenday/l/f397efa5ffdce3a2d19b6e26e0ac0f79b55cce9157240e8208b98c596f3235a2?par=oppo_widget&frontCode=2.0');
  };

  const handleSearch = async (city) => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      setWeatherData(response.data);

      // Fetch forecast data for the next 5 days
      const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
      const filteredForecast = filterForecastData(forecastResponse.data.list);
      setForecastData(filteredForecast);

      setCityName(city);
      setShowSearch(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.cityName}>{cityName}</Text>
        <TouchableOpacity onPress={() => setShowSearch(true)}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.weatherContainer}>
          <Text style={styles.temperature}>{temperature}°C</Text>
          <View style={styles.weatherDetails}>
            <Text style={styles.description}>{weatherData.weather[0].description}</Text>
          </View>
        </View>
        <View style={styles.todayWeatherCard}>
          <Text style={styles.todayWeatherTitle}>Today's Weather Details</Text>
          <View style={styles.todayWeatherDetails}>
            <View style={styles.weatherDetailCard}>
              <Text style={styles.weatherDetailLabel}>Apparent Temperature</Text>
              <Text style={styles.weatherDetailValue}>{Math.round(weatherData.main.feels_like - 273.15)}°C</Text>
            </View>
            <View style={styles.weatherDetailCard}>
              <Text style={styles.weatherDetailLabel}>Humidity</Text>
              <Text style={styles.weatherDetailValue}>{weatherData.main.humidity}%</Text>
            </View>
            <View style={styles.weatherDetailCard}>
              <Text style={styles.weatherDetailLabel}>Wind Direction</Text>
              <Text style={styles.weatherDetailValue}>{getWindDirection(weatherData.wind.deg)}</Text>
            </View>
            <View style={styles.weatherDetailCard}>
              <Text style={styles.weatherDetailLabel}>Visibility</Text>
              <Text style={styles.weatherDetailValue}>{(weatherData.visibility / 1000).toFixed(2)} km</Text>
            </View>
            <View style={styles.weatherDetailCard}>
              <Text style={styles.weatherDetailLabel}>Air Pressure</Text>
              <Text style={styles.weatherDetailValue}>{weatherData.main.pressure} hPa</Text>
            </View>
          </View>
        </View>
        {forecastData.map((forecast, index) => (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.forecastDate}>{forecast.dt_txt.split(' ')[0].split('-').slice(-1)[0]}</Text>
            <View style={styles.forecastDetails}>
              <Text style={styles.forecastDescription}>{forecast.weather[0].description}</Text>
              <Text style={styles.forecastTemperature}>{Math.round(forecast.main.temp - 273.15)}°C</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.infoButton} onPress={openInBrowser}>
        <Text style={styles.infoButtonText}>More Info</Text>
      </TouchableOpacity>
      <Modal visible={showSearch} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowSearch(false)}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <SearchScreen onSubmit={handleSearch} />
        </View>
      </Modal>
    </Animated.View>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  weatherContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  weatherDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    fontSize: 20,
    textTransform: 'capitalize',
  },
  todayWeatherCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  todayWeatherTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todayWeatherDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  weatherDetailCard: {
    width: '48%',
    marginBottom: 10,
  },
  weatherDetailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weatherDetailValue: {
    fontSize: 16,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  forecastDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  forecastDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forecastDescription: {
    fontSize: 16,
    textTransform: 'capitalize',
    marginRight: 10,
  },
  forecastTemperature: {
    fontSize: 16,
  },
  infoButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  infoButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
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

