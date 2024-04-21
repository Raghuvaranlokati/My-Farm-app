import React from 'react';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }) => {
  const { uri } = route.params;

  return (
    <WebView
      source={{ uri }}
      style={{ flex: 1 }}
    />
  );
};

export default WebViewScreen;
