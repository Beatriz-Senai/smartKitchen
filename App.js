// App.js
// import 'react-native-gesture-handler'; // necessário pro React Navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';

// Importe suas telas (culinária, livros, séries, músicas)
import ReceitasScreen from './App_Openai';       // seu App.tsx original
import ViagensScreen from './App_Viagens';
import LivrosScreen from './App_Livros';
import CinemaScreen from './App_Cinema';

const Stack = createNativeStackNavigator();

// Tela de menu principal com botões para cada tela
function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Principal</Text>

      <View style={styles.buttonWrapper}>
        <Button
          title="Culinária"
          color='#bf103b'
          onPress={() => navigation.navigate('Receitas')}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Livros"
          color='#bf103b'
          onPress={() => navigation.navigate('Livros')}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Viagens"
          color='#bf103b'
          onPress={() => navigation.navigate('Viagens')}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Cinema"
          color='#bf103b'
          onPress={() => navigation.navigate('Cinema')}
        />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen 
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Receitas"
          component={ReceitasScreen}
          options={{ title: 'Culinária' }}
        />
        <Stack.Screen 
          name="Livros"
          component={LivrosScreen}
          options={{ title: 'Livros' }}
        />
        <Stack.Screen 
          name="Viagens"
          component={ViagensScreen}
          options={{ title: 'Viagens' }}
        />
        <Stack.Screen 
          name="Cinema"
          component={CinemaScreen}
          options={{ title: 'Cinema' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#eec9d2',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#bf103b'
  },
  buttonWrapper: {
    width: '40%',
    marginVertical: 8,
  }
});