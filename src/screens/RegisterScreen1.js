import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useRegisterStore } from '../stores/useRegisterStore';

export default function RegisterScreen1() {
  const navigation = useNavigation();
  const { setRegister } = useRegisterStore();

  // States from form
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [erros, setErros] = useState({});

  // Function to validate and register
  const handleNextSteap = () => {
    let errosTemp = {};

    // validate name or return error
    if (!name.trim()) {
      errosTemp.name = 'O nome é obrigatório.';
    } else if (name.length < 3) {
      errosTemp.name = 'O nome deve ter pelo menos 3 letras.';
    }

    // validate lastname or return error
    if (!lastname.trim()) {
      errosTemp.name = 'O sobrenome é obrigatório.';
    } else if (name.length < 3) {
      errosTemp.lastname = 'O sobrenome deve ter pelo menos 3 letras.';
    }

    // validate phone number or return error
    if (!phoneNumber.trim()) {
      errosTemp.phoneNumber = 'O telefone é obrigatório.';
    } else if (phoneNumber.length < 10) {
      errosTemp.phoneNumber = 'O telefone deve ter pelo menos 10 caracteres.';
    }

    // validate email or return error
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errosTemp.email = 'O e-mail é obrigatório.';
    } else if (!emailRegex.test(email)) {
      errosTemp.email = 'Insira um e-mail válido.';
    }

    // validate password or return error
    if (!password) {
      errosTemp.password = 'A senha é obrigatória.';
    } else if (password.length < 6) {
      errosTemp.password = 'A senha deve ter pelo menos 6 caracteres.';
    }

    // validate and confirm password or return error
    if (!confirmPassword) {
      errosTemp.confirmPassword = 'Confirme sua senha.';
    } else if (confirmPassword !== password) {
      errosTemp.confirmPassword = 'As senhas não coincidem.';
    }

    // verify error
    if (Object.keys(errosTemp).length > 0) {
      setErros(errosTemp);
    } else {
      setErros({});

      // if all ok, send form to next steap
           
      setRegister({ name, lastname, phoneNumber, email, password });
      navigation.navigate('RegisterTwo');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../Assets/img/launch_splash.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>



      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Cadastro:</Text>

        <Text style={styles.inputLabel}>Nome*</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={18} color="#777" style={styles.inputIcon} />
          <TextInput
            placeholder="Digite aqui..."
            placeholderTextColor="#b0b0b0"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
        {erros.name && <Text style={styles.errorText}>{erros.name}</Text>}

        <Text style={styles.inputLabel}>Último Nome*</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={18} color="#777" style={styles.inputIcon} />
          <TextInput
            placeholder="Digite aqui..."
            placeholderTextColor="#b0b0b0"
            style={styles.input}
            value={lastname}
            onChangeText={setLastname}
          />
        </View>
        {erros.lastname && <Text style={styles.errorText}>{erros.lastname}</Text>}

        <Text style={styles.inputLabel}>Telefone*</Text>
        <View style={styles.inputContainer}>
          <Icon name="user" size={18} color="#777" style={styles.inputIcon} />
          <TextInput
            placeholder="Digite aqui..."
            placeholderTextColor="#b0b0b0"
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        {erros.phoneNumber && <Text style={styles.errorText}>{erros.phoneNumber}</Text>}

        <Text style={styles.inputLabel}>E-mail*</Text>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={18} color="#777" style={styles.inputIcon} />
          <TextInput
            placeholder="Digite aqui..."
            placeholderTextColor="#b0b0b0"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {erros.email && <Text style={styles.errorText}>{erros.email}</Text>}

        <Text style={styles.inputLabel}>Senha*</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={18} color="#777" style={styles.inputIcon} />
          <TextInput
            placeholder="Digite aqui..."
            placeholderTextColor="#b0b0b0"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {erros.password && <Text style={styles.errorText}>{erros.password}</Text>}

        <Text style={styles.inputLabel}>Confirmar senha*</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={18} color="#777" style={styles.inputIcon} />
          <TextInput
            placeholder="Digite aqui..."
            placeholderTextColor="#b0b0b0"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        {erros.confirmPassword && <Text style={styles.errorText}>{erros.confirmPassword}</Text>}

        <Text style={styles.privacyText}>
          Nós nunca iremos compartilhar seus dados. Confira nossa
          <Text style={styles.privacyLink}> Política de privacidade</Text>.
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Já tenho uma conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNextSteap}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingBottom: 20, 
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
  inputLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  privacyText: {
    color: '#777',
    fontSize: 12,
    marginBottom: 15,
  },
  privacyLink: {
    color: '#4285F4',
    textDecorationLine: 'underline',
  },
  loginLink: {
    color: '#4285F4',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
