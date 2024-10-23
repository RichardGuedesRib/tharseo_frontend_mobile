import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import serverConfig from '../services/ServerConfig';
import { useAuthStore } from '../stores/useAuthStore';
import { useStrategyGridStore } from '../stores/useStrategyGridStore';
import { useTransactionStore } from '../stores/useTransactionStore';
import { useUserWalletStore } from '../stores/useUserWalletStore';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuthStore();
  const { setGrids } = useStrategyGridStore();
  const { setTransactions } = useTransactionStore();
  const { setAssets } = useUserWalletStore();
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '994939095037-51i8qgua6rv3p3nn8biuoe8fe6rqdc4c.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const handleLogin = async () => {
    const urlRequest = `${serverConfig.addressServerTharseo}/authenticate/auth`;
    try {
      const response = await fetch(urlRequest, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: email, password: password }),
      });
      if (!response.ok) {
        alert("Usuário ou Senha Inválidos");
      } else {
        const data = await response.json();
        setUser(data);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data.idToken);
      const response = await fetch(`${serverConfig.addressServerTharseo}/googleauth/auth2`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo.data.idToken),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        navigation.navigate('Home');
      } else {
        console.error('Login Failed:', data.message);
      }
    } catch (error) {
      if (error.code !== statusCodes.SIGN_IN_CANCELLED && error.code !== statusCodes.IN_PROGRESS) {
        console.error(error);
      }
    }
  };

  const setUser = (data) => {
    const { user, accessToken, expiresIn } = data.data;
    const { id, name, lastname, wallet, grids, transactions } = user;
    setAuth({
      id, name, lastname, token: accessToken, expiration: new Date().getTime() + expiresIn * 1000,
    });
    setGrids(grids);
    setTransactions(transactions);
    setAssets(wallet);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../Assets/img/launch_splash.png')}
        style={styles.logo}
        resizeMode="contain" // Para ajustar o redimensionamento da imagem
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#b0b0b0"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#b0b0b0"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoogleLogin} style={styles.googleButton}>
        <Icon name="google" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.googleButtonText}>Login com Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.facialButton}>
        <Icon name="camera" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.facialText}>Login com Reconhecimento Facial</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '70%', 
    height: 150,
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  googleButton: {
    flexDirection: 'row', 
    width: '80%',
    height: 50,
    backgroundColor: '#4285F4',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  facialButton: {
    position: 'absolute', 
    bottom: 40,
    width: '80%',
    height: 50,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', 
  },
  facialText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10, 
  },
  icon: {
    marginRight: 10, 
  },
});
