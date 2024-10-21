import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text>Home Screen</Text>
        <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,  
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, 
  },
});
