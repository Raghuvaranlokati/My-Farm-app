import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const LanguageScreen = ({ navigation }) => {
  const handleLanguageSelect = (lang) => {
    let redirectUrl;
    if (lang === 'te') {
      redirectUrl = 'https://dharani.telangana.gov.in/knowLandStatus?lang=te&null=';
    } else if (lang === 'en') {
      redirectUrl = 'https://dharani.telangana.gov.in/knowLandStatus?lang=en';
    }
    navigation.navigate('WebView', { uri: redirectUrl });
  };

  return (
    <View style={styles.container}>
      <Button title="Telugu" onPress={() => handleLanguageSelect('te')} />
      <Button title="English" onPress={() => handleLanguageSelect('en')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LanguageScreen;
