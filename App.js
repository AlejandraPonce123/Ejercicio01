import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator'; // Importamos el DrawerNavigator
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />  {/* Cargamos el menú Drawer */}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

