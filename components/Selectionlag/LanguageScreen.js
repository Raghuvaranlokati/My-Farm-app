import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const LanguageScreen = ({ navigation }) => {
  const handleLanguageSelect = (lang) => {
    if (lang === 'te') {
      navigation.navigate('SelectionScreenTel');
    } else if (lang === 'en') {
      navigation.navigate('SelectionScreenEn');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://w0.peakpx.com/wallpaper/543/315/HD-wallpaper-farmer-field-nature-farmer.jpg' }} // Replace with your background image URL
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Choose a Language</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLanguageSelect('te')}
          >
            <Text style={styles.buttonText}>తెలుగు</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLanguageSelect('en')}
          >
            <Text style={styles.buttonText}>English</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // Text color for better contrast with the background
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default LanguageScreen;
