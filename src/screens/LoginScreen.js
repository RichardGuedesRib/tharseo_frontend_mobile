import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import serverConfig from '../services/ServerConfig';
import { useAuthStore } from '../stores/useAuthStore';
import { useStrategyGridStore } from '../stores/useStrategyGridStore';
import { useTransactionStore } from '../stores/useTransactionStore';
import { useUserWalletStore } from '../stores/useUserWalletStore';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth, id, name, lastname, token, expiration } = useAuthStore();
  const { setGrids, grids } = useStrategyGridStore();
  const { setTransactions, transactions } = useTransactionStore();
  const { setAssets, assets } = useUserWalletStore();
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '994939095037-51i8qgua6rv3p3nn8biuoe8fe6rqdc4c.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  //Function to feat the login with user and password
  const handleLogin = async () => {

    const urlRequest = `${serverConfig.addressServerTharseo}/authenticate/auth`;
    try {
      const response = await fetch(urlRequest, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: email,
          password: password,
        }),
      });

      if (!response.ok) {
        alert("Usuário ou Senha Inválidos");
      } else {
        const data = await response.json();
        setUser(data);
        navigation.navigate('Home');
      };
    
    } catch (error) {
      console.error(error);
    }
  }
 
  //Functio to feat the login with google auth
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);

      console.log('User Token:', userInfo.data.idToken);

      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.data.idToken,
      );

      try {
        const response = await fetch(
          `${serverConfig.addressServerTharseo}/googleauth/auth2`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo.data.idToken),
          },
        );

        const data = await response.json();
        console.log("RETURNDATA", data);

        if (response.ok) {
          console.log('Login Successful:', data);

          setUser(data);
          navigation.navigate('Home');
        } else {
          const errorData = await response.json();
          console.error('Login Failed:', errorData.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }

      // navigation.replace('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Operation (e.g. sign in) is in progress already');
      } else {
        console.error(error);
      }
    }
  };

  //Function to get data from server and set store on zustand
  const setUser = (data) => {
    
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

  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          width: '80%',
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          width: '80%',
        }}
      />
      <Button title="Login with Email" onPress={handleLogin} />

      <TouchableOpacity onPress={handleGoogleLogin} style={{marginTop: 20}}>
        <Text style={{color: 'blue'}}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
