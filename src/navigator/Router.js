import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Component Global
import Login from '../components/Login';

// Customer Screen
import Dashboard from '../components/Dashboard';
import Chat from '../components/Chat';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Global Navigator */}
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />

        {/* Internal Navigator */}
        <Stack.Screen name="Dashboard" options={{ headerShown: false }} component={Dashboard} />
        <Stack.Screen name="Chat" options={{ headerShown: false }} component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}