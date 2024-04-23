import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen({ onSubmit }) {
  const [city, setCity] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load search history from local storage when component mounts
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('@searchHistory');
      if (savedHistory !== null) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const saveHistory = async (newCity) => {
    try {
      const updatedHistory = [...history, newCity];
      await AsyncStorage.setItem('@searchHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSubmit(city);
      saveHistory(city); // Save search history when a new search is made
      setCity('');
    }
  };

  const handleHistoryPress = (item) => {
    setCity(item); // Set the selected history item as the city in the input field
    onSubmit(item); // Perform a search when a history item is pressed
  };

  const handleClearHistory = async () => {
    try {
      await AsyncStorage.removeItem('@searchHistory');
      setHistory([]);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city or area name"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.historyScrollView}>
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleHistoryPress(item)} style={styles.historyItemContainer}>
              <View style={styles.historyItem}>
                <Text style={styles.historyText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.historyContainer}
        />
      </ScrollView>
      <TouchableOpacity onPress={handleClearHistory} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    width: '80%',
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  historyScrollView: {
    width: '80%',
    maxHeight: 200,
    marginBottom: 20,
  },
  historyContainer: {
    alignItems: 'center',
  },
  historyItemContainer: {
    width: '100%',
    marginBottom: 10,
  },
  historyItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  historyText: {
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: '60%',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});