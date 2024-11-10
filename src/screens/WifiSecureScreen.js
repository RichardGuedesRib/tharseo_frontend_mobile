import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  PermissionsAndroid,
  Image
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useAuthStore} from '../stores/useAuthStore';
import serverConfig from '../services/ServerConfig';

const WifiSecureScreen = ({navigation}) => {
  const {id, token} = useAuthStore();
  const [radius, setRadius] = useState('50'); 
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Function to get actual location
  const getCurrentLocation = async () => {
    const result = requestLocationPermission();

    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setLocation({latitude, longitude});            
          },
          error => {
            console.log(error.code, error.message);
            setLocation(null);
            Alert.alert('Erro', 'Não foi possível obter a localização.');
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  // Function to register a secure point in backend
  const handleRegisterSecurePoint = async () => {
   
    getCurrentLocation();

    if (!location) {
      Alert.alert(
        'Erro',
        'Não foi possível obter a localização. Tente Novamente!',
      );
      return;
    }

    const urlRequest = `${serverConfig.addressServerTharseo}/users/${id}`;
    const payload = {
      latitude: location.latitude,
      longitude: location.longitude,
      radius: radius,
      loginLocationSecurity : true
    };
    
    try {
      const response = await fetch(urlRequest, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        Alert.alert('Erro', 'Erro ao registrar ponto seguro!');
      } else {
        Alert.alert('Sucesso', 'Ponto seguro registrado com sucesso!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar o ponto seguro.');
    }
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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Cadastro de Zona Segura</Text>

        <Text style={styles.description}>
          Ao cadastrar uma zona segura, você pode proteger o acesso ao
          aplicativo apenas em um ponto onde se sinta seguro.
        </Text>

        <View style={styles.divider} />

        <View style={styles.inputContainer}>

        <View style={styles.imageContainer}>
            <Image
              source={require('../Assets/img/precise_map.png')} 
              style={styles.image}
              resizeMode="cover"
            />
          </View>


          <Text style={styles.subtitle}>Definir Raio (em metros)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 50"
            placeholderTextColor="#DCDCDC"
            keyboardType="numeric"
            value={radius}
            onChangeText={text => setRadius(text)}
          />
         
          <Text> Latitude: {latitude ? latitude : 'N/A'} </Text>
          <Text> Longitude: {longitude ? longitude : 'N/A'} </Text>
          <Text>
            {' '}
            Location:{' '}
            {location && (
              <Text>
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </Text>
            )}
          </Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleRegisterSecurePoint}>
            <Text style={styles.addButtonText}>Registrar Zona Segura</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    height: '80%',
    backgroundColor: 'rgba(59, 59, 59, 0.8)',
    borderRadius: 10,
    padding: 20,
  },
  backText: {
    color: '#DCDCDC',
    fontSize: 16,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#DCDCDC',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
  },
  divider: {
    height: 1,
    backgroundColor: '#DCDCDC',
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    padding: 10,
    color: '#fff',
    fontSize: 16,
    width: '80%',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
});

export default WifiSecureScreen;
