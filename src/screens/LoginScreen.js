import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  BackHandler 
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import serverConfig from '../services/ServerConfig';
import {useAuthStore} from '../stores/useAuthStore';
import {useStrategyGridStore} from '../stores/useStrategyGridStore';
import {useTransactionStore} from '../stores/useTransactionStore';
import {useUserWalletStore} from '../stores/useUserWalletStore';
import {useNavigation} from '@react-navigation/native';
import {getAllAssetsServer} from '../services/AssetsService';
import Geolocation from 'react-native-geolocation-service';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setAuth} = useAuthStore();
  const {setGrids} = useStrategyGridStore();
  const {setTransactions} = useTransactionStore();
  const {setAssets} = useUserWalletStore();
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '994939095037-51i8qgua6rv3p3nn8biuoe8fe6rqdc4c.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  //Function to check if distance between two points is less than a certain radius
  const checkLocationSecurity = async (latitude, longitude, radius) => {
    try {
      const currentLocation = await getCurrentLocation();
      const distance = calculateDistance(
        latitude,
        longitude,
        currentLocation.latitude,
        currentLocation.longitude,
      );

      if (distance > radius) {
        alert('Você está fora da área segura. Fechando o Tharseo');
        navigation.navigate('Login');
        setTimeout(() => {
          Alert.alert(
            'Aviso',
            'O aplicativo será fechado por motivos de segurança.',
            [{text: 'OK'}],
          );
          BackHandler.exitApp();
        }, 5000);

        return false;
      }

      alert('Você está na área segura! Bem vindo ao Tharseo!');
      return true;
    } catch (error) {
      console.error('Erro ao obter a localização:', error);
      alert('Não foi possível obter sua localização. Tentando novamente...');
      return checkLocationSecurity(latitude, longitude, radius);
    }
  };

  //Function to calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  //Function to get location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      requestLocationPermission().then(permissionGranted => {
        if (permissionGranted) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setLocation({latitude, longitude});
              resolve({latitude, longitude});
            },
            error => {
              console.log(error.code, error.message);
              setLocation(null);
              Alert.alert('Erro', 'Não foi possível obter a localização.');
              reject(error);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          reject(new Error('Permissão negada.'));
        }
      });
    });
  };

  //Function to get a permission to use location
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  //Function to make login with credencials
  const handleLogin = async () => {
    const urlRequest = `${serverConfig.addressServerTharseo}/authenticate/auth`;
    try {
      const response = await fetch(urlRequest, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({login: email, password: password}),
      });
      if (!response.ok) {
        alert('Usuário ou Senha Inválidos');
      } else {
       
        const data = await response.json();
       
        if (data.data.user.loginLocationSecurity === true) {
          const {latitude, longitude, radius} = data.data.user;
          const isInSecureArea = await checkLocationSecurity(latitude, longitude, radius);
          if (!isInSecureArea) {
            return; 
          }
        }
        setUser(data);

        //Loading data from server to populate stores
        await getAllAssetsServer();

        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Function to make login with google auth
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.data.idToken,
      );
      const response = await fetch(
        `${serverConfig.addressServerTharseo}/googleauth/auth2`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userInfo.data.idToken),
        },
      );
      const data = await response.json();
      if (response.ok) {

        if (data.data.user.loginLocationSecurity === true) {
          const {latitude, longitude, radius} = data.data.user;
          const isInSecureArea = await checkLocationSecurity(latitude, longitude, radius);
          if (!isInSecureArea) {
            return; 
          }
        }
        
        setUser(data);

        navigation.navigate('Home');
      } else {
        console.error('Login Failed:', data.message);
      }
    } catch (error) {
      if (
        error.code !== statusCodes.SIGN_IN_CANCELLED &&
        error.code !== statusCodes.IN_PROGRESS
      ) {
        console.error(error);
      }
    }
  };

  //Function to make login with face recognition
  const handleFaceRecognition = () => {
    navigation.navigate('FaceRecognition');
  };

  const handleLocation = () => {
    navigation.navigate('LocationAuth');
  };

  const setUser = data => {
    const {user, accessToken, expiresIn} = data.data;
    const {
      id,
      name,
      lastname,
      phoneNumber,
      email,
      avatar,
      wallet,
      grids,
      transactions,
      loginLocationSecurity,
      latitude,
      longitude,
      radius,
    } = user;
    setAuth({
      id,
      name,
      lastname,
      phoneNumber,
      email,
      avatar,
      loginLocationSecurity,
      latitude,
      longitude,
      radius,
      token: accessToken,
      expiration: new Date().getTime() + expiresIn * 1000,
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
        resizeMode="contain"
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

      <TouchableOpacity
        onPress={handleFaceRecognition}
        style={styles.facialButton}>
        <Icon name="camera" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.facialText}>Login com Reconhecimento Facial</Text>
      </TouchableOpacity>

      <Text style={styles.facialText} onPress={handleLocation}>
        Simular Ponto não seguro
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.createAccountText}>Criar Conta</Text>
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
  createAccountText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});
