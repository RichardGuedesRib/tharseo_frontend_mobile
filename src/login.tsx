import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { useAuthStore } from '../src/Stores/useAuthStore';
import { useStrategyGridStore } from '../src/Stores/useStrategyGridStore';
import { useTransactionStore } from '../src/Stores/useTransactionStore';
import { useUserWalletStore } from '../src/Stores/useUserWalletStore';
import serverConfig from '../src/Services/ServerConfig'; 


export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { setAuth, id, name, lastname, token, expiration } = useAuthStore();
  const { setGrids, grids } = useStrategyGridStore();
  const { setTransactions, transactions } = useTransactionStore();
  const { setAssets, assets } = useUserWalletStore();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '911731612364-mfapbrcn43tmc7m7bd1ak37f7ht0j48e.apps.googleusercontent.com', 
      offlineAccess: true,
    });
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${serverConfig.addressServerTharseo}/authenticate/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login falhou');
      }

      const data = await response.json();
      const { user, accessToken, expiresIn } = data.data;
      const { id, name, lastname, wallet, grids, transactions } = user;

      console.log("data", data);
      
      setAuth({
        id,
        name,
        lastname,
        token: accessToken,
        expiration: new Date().getTime() + expiresIn * 1000, 
      });

      setGrids(grids);
      setTransactions(transactions);
      setAssets(wallet);

      setErrorMessage('LOGIN EFETUADO COM SUCESSO!');

      console.log('User ID:', id);
      console.log('Name:', name);
      console.log('Last Name:', lastname);
      console.log('Token:', token);
      console.log('Token Expiration:', new Date(expiration || 0));

      console.log('Grids:', grids);

      console.log('Transactions:', transactions);

      console.log('User Wallet:', assets);




    } catch (error) {
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
      console.error(error);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info", userInfo);
      const token = userInfo.idToken;

      // Enviar o token para o seu backend
      const response = await fetch(`${serverConfig.addressServerTharseo}/googleauth/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login Successful:", data);
      } else {
        const errorData = await response.json();
        console.error("Login Failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


  return (
    <View style={styles.container}>
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={login}
        onChangeText={setLogin}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title="Fazer login" onPress={handleLogin} />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* {user ? <Text>Token: {token}</Text> : null} */}

      
    <View>
      <Button title="Login with Google" onPress={onGoogleButtonPress} />
      {userInfo && <Text>Welcome {userInfo.user.name}</Text>}
    </View>


    </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    width: '100%',
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
});
