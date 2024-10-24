import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LocationAuthScreen = ({isVisible, navigation}) => {
  const handleFaceAuth = () => {
    
    navigation.navigate('FaceRecognition');
  };

  const handleCredentialsAuth = () => {
    navigation.navigate('Login');
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Image
              source={require('../Assets/img/location.png')} 
              style={styles.icon}
              resizeMode="cover"
            />

          <Text style={styles.warningText}>
            Identificamos que você não está em um dos Pontos Seguros
          </Text>
          <Text style={styles.securityText}>
            Por motivos de segurança, precisamos que autentique sua identidade.
          </Text>

          <View style={styles.imageContainer}>
            <Image
              source={require('../Assets/img/precise_map.png')} 
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleFaceAuth}>
            <Text style={styles.buttonTextPrimary}>Acessar com autenticação facial</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={handleCredentialsAuth}>
            <Text style={styles.buttonTextSecondary}>Acessar com credenciais</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#3B3B3B', 
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  warningText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  securityText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#fff',
    overflow: 'hidden',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonPrimary: {
    backgroundColor: '#007BFF', 
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonTextPrimary: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: '#E0E0E0', 
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocationAuthScreen;
