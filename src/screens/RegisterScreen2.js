import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import serverConfig from '../services/ServerConfig';
import {useRegisterStore} from '../stores/useRegisterStore';

export default function RegisterScreen2() {
  const navigation = useNavigation();
  const {name, lastname, phoneNumber, password, email} = useRegisterStore();

  const handleRegister = async () => {
    try {
      const response = await fetch(
        `${serverConfig.addressServerTharseo}/users/register`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: name,
            lastname: lastname,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
          }),
        },
      );

      if (response.ok) {
        navigation.navigate('RegisterThree');
      }
    } catch (error) {
      alert('Erro ao criar conta: ' + error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../Assets/img/launch_splash.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <Icon name="check-circle" size={24} color="#007bff" />
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>Informações pessoais</Text>
            <Text style={styles.stepSubtitle}>Crie seu acesso</Text>
          </View>
        </View>
        <View style={styles.step}>
          <Icon name="check-circle" size={24} color="#007bff" />
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>Sobre a sua conta</Text>
            <Text style={styles.stepSubtitle}>Informações sobre a conta</Text>
          </View>
        </View>
        <View style={styles.step}>
          <Icon name="check-circle" size={24} color="#777" />
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>Revisão e confirmação</Text>
            <Text style={styles.stepSubtitle}>Revise suas informações</Text>
          </View>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Verificação</Text>
        <Text style={styles.verificationText}>
          Por favor, verifique o código de verificação de 6 dígitos enviado para
          o canal selecionado.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite aqui..."
            placeholderTextColor="#b0b0b0"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.resendLink}>Não recebi o código</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sendButton} onPress={handleRegister}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: '70%',
    height: 150,
  },

  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepsContainer: {
    marginBottom: 30,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepTextContainer: {
    marginLeft: 10,
  },
  stepTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepSubtitle: {
    color: '#777',
    fontSize: 14,
  },
  formContainer: {
    marginTop: 20,
  },
  formLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  verificationText: {
    color: '#777',
    fontSize: 14,
    marginBottom: 15,
  },
  inputContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
    marginBottom: 15,
  },
  input: {
    color: '#fff',
  },
  resendLink: {
    color: '#4285F4',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
