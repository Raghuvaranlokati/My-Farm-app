import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/LandManagement/MapScreen";
import LanguageScreen from "./components/LanguageScreen"
import WebViewScreen from './components/WebViewScreen';
import SelectionScreenEn from './components/Selectionlag/SelectionScreenEn';
import SelectionScreenTel from './components/Selectionlag/SelectionScreenTel';
import WeatherScreen from './components/weather/WeatherScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Map" component={MapScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="WebView" component={WebViewScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="SelectionScreenTel" component={SelectionScreenTel}  options={{ headerShown: false }} />
        <Stack.Screen name="SelectionScreenEn" component={SelectionScreenEn}  options={{ headerShown: false }}/>
        <Stack.Screen name="Weather" component={WeatherScreen}  options={{ headerShown: false }}/>



      </Stack.Navigator>
    </NavigationContainer>
  );
}

