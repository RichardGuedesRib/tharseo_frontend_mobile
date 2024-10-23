import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ErrorFaceRecognition = ({ navigation }) => {
  const handleRetry = () => {
    navigation.navigate('FaceRecognition'); 
  };

  const handleLogin = () => {
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Não foi possível ver seu rosto.
      </Text>
      <View style={styles.imagesContainer}>
        <View style={styles.imageWrapper}>
          <Image 
            source={require('../Assets/img/error.png')} 
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.imageLabel}>Seu rosto</Text>
        </View>
        <View style={styles.imageWrapper}>
          <Image 
            source={require('../Assets/img/example.png')} 
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.imageLabel}>Exemplo</Text>
        </View>
      </View>
      <View style={styles.containerButtons}>
      <TouchableOpacity style={styles.button} onPress={handleRetry}>
        <Text style={styles.buttonText}>Tentar de novo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar com Credenciais</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    alignItems: 'center',
    justifyContent: 'space-around', 
    padding: 20,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  containerButtons: {
    width: '100%',
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', 
  },
  imageWrapper: {
    alignItems: 'center', 
    width: '45%', 
  },
  image: {
    width: '100%',
    height: 150, 
    borderRadius: 10, 
  },
  imageLabel: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: '100%', 
    marginVertical: 5, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ErrorFaceRecognition;
