import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen</Text>
      <Button
        title="Go to Map Screen"
        onPress={() => navigation.navigate('Map')}
      />
      <Button
        title="Darani"
        onPress={() => navigation.navigate('Language')}
      />
      <Button
        title="Weather"
        onPress={() => navigation.navigate('Weather')}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
