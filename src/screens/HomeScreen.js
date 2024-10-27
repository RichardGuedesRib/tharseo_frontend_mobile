import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useAuthStore } from '../stores/useAuthStore';

export default function HomeScreen({ navigation }) {
  
  const { id, name, lastname, phoneNumber, email, token, expiration } = useAuthStore();

  useEffect(() => {
    console.log("Auth State:");
    console.log("ID:", id);
    console.log("Name:", name);
    console.log("Lastname:", lastname);
    console.log("PhoneNumber:", phoneNumber);
    console.log("Email:", email);
    console.log("Token:", token);
    console.log("Expiration:", expiration);
  }, [id, name, lastname, phoneNumber, email, token, expiration]);


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
