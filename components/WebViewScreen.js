import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }) => {
  const { uri } = route.params;
  const [loading, setLoading] = useState(true);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri }}
        style={{ flex: 1 }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#0000ff"
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 27,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default WebViewScreen;
