import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import serverConfig from '../services/ServerConfig';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '994939095037-51i8qgua6rv3p3nn8biuoe8fe6rqdc4c.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  // const handleLogin = async () => {
  //   try {
  //     await auth().signInWithEmailAndPassword(email, password);
  //     navigation.replace('Home');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleLogin = async () => {

    const urlRequest = `http://10.0.2.2:8080/authenticate/checkpassword`;
    try {
      const request = await fetch(urlRequest, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: email,
          password: password,
        }),
      });
      if (!request.ok) {
        alert("Usuário ou Senha Inválidos");
      } else {
       console.log(request);
          navigation.replace('Home');
      }
    } catch (error) {
      console.error(error);
    }
  }
 

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);

      console.log('User Token:', userInfo.data.idToken);

      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.data.idToken,
      );
      // await auth().signInWithCredential(googleCredential);

      try {
        const response = await fetch(
          `http://10.0.2.2:8080/googleauth/auth2`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo.data.idToken),
          },
        );

        const data = await response.json();

        if (response.ok) {
          console.log('Login Successful:', data);

          setUser(data.data);
          navigate('/home');
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
