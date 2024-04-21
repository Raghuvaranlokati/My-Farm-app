import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const LanguageScreen = ({ navigation }) => {
  const handleLanguageSelect = (lang) => {
    if (lang === 'te') {
      navigation.navigate('SelectionScreenTel');
    } else if (lang === 'en') {
      navigation.navigate('SelectionScreenEn');
    }
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
