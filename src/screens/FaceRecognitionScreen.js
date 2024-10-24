import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, ToastAndroid} from 'react-native';

const FaceRecognitionScreen = ({navigation}) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleContinue = () => {
    // Oculta os botões e exibe o toast de sucesso
    setIsAuthenticating(true);
    ToastAndroid.show('Autenticação bem sucedida', ToastAndroid.SHORT);

    // Aguarda 3 segundos e redireciona para a tela de login
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {isAuthenticating
          ? 'Você será redirecionado ao app...'
          : 'Posicione seu rosto no círculo e clique em continuar'}
      </Text>
      <View style={styles.ellipse}>
        <Image
          source={require('../Assets/img/avatar.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {!isAuthenticating && (
        <>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ErrorFaceRecognition')}>
            <Text style={styles.buttonText}>Simular Erro</Text>
          </TouchableOpacity>
        </>
      )}
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
  ellipse: {
    width: '60%',
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FaceRecognitionScreen;

