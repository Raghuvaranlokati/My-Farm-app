import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/LandManagement/MapScreen";
import LanguageScreen from "./components/LanguageScreen"
import WebViewScreen from './components/WebViewScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Map" component={MapScreen}  />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="WebView" component={WebViewScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

