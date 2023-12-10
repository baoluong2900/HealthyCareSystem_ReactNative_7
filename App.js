/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import MyTab from './src/components/MyTab';

export const UserContext = React.createContext();
const Stack = createStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Splash} options={{ headerShown: false}} />
      <Stack.Screen name="Login" component={Login}  options={{ headerShown: false}} />
      <Stack.Screen name="Signup" component={Signup}  options={{ headerShown: false}} /> 
      <Stack.Screen name="MyTab" component={MyTab}  options={{ headerShown: false}} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
