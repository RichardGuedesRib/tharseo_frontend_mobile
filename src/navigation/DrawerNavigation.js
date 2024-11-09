import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReactNativeBiometrics from 'react-native-biometrics';
import BootSplash from 'react-native-bootsplash';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import TradesScreen from '../screens/TradesScreen';
import HistoricScreen from '../screens/HistoricScreen';
import OpenTradesScreen from '../screens/OpenTradesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FaceRecognitionScreen from '../screens/FaceRecognitionScreen';
import ErrorFaceRecognition from '../screens/ErrorFaceRecognition';
import LocationAuthScreen from '../screens/LocationAuthScreen';
import WifiSecureScreen from '../screens/WifiSecureScreen';
import RegisterScreen1 from '../screens/RegisterScreen1';
import RegisterScreen2 from '../screens/RegisterScreen2';
import RegisterScreen3 from '../screens/RegisterScreen3';

import { useAuthStore } from '../stores/useAuthStore';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const rnBiometrics = new ReactNativeBiometrics();
const clearAuth = useAuthStore((state) => state.clearAuth);

const handleLogout = async () => {
  try {
    clearAuth();
  } catch (error) {
    console.error('Erro ao deslogar: ', error);
  }
}

function DrawerNavigation() {

 ;

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000', 
        },
        headerStyle: {
          backgroundColor: '#000', 
        },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Trades" component={TradesScreen} />
      <Drawer.Screen name="Historic" component={HistoricScreen} />
      <Drawer.Screen name="OpenTrades" component={OpenTradesScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#000' }}>
       <DrawerItem
        label={() => <Text style={{ color: '#fff' }}>Dashboard</Text>} 
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label={() => <Text style={{ color: '#fff' }}>Trades</Text>} 
        onPress={() => props.navigation.navigate('Trades')}
      />
      <DrawerItem
        label={() => <Text style={{ color: '#fff' }}>Em Andamento</Text>} 
        onPress={() => props.navigation.navigate('OpenTrades')}
      />
      <DrawerItem
        label={() => <Text style={{ color: '#fff' }}>Histórico</Text>} 
        onPress={() => props.navigation.navigate('Historic')}
      />
      <DrawerItem
        label={() => <Text style={{ color: '#fff' }}>Perfil</Text>} 
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label={() => <Text style={{ color: '#fff' }}>Configurações</Text>}
        onPress={() => props.navigation.navigate('Settings')}
      />
      <DrawerItem
        label={() => <Text style={{ color: '#fff' }}>Logout</Text>} 
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}

function AppNavigator() {
  const { token } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateUser = async () => {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (!available) {
        Alert.alert('Erro', 'Biometria não disponível ou não configurada.');
        return false;
      }

      const promptMessage = biometryType === 'FaceID' ? 'Use o Face ID' : 'Use sua impressão digital';
      const { success } = await rnBiometrics.simplePrompt({ promptMessage });

      if (success) {
        console.log('Autenticação biométrica bem-sucedida');
        return true;
      } else {
        Alert.alert('Autenticação falhou', 'Fechando o aplicativo.');
        BackHandler.exitApp();
        return false;
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar autenticar. Fechando o aplicativo.');
      BackHandler.exitApp();
      return false;
    }
  };

  useEffect(() => {
    const init = async () => {
      const authenticated = await authenticateUser();

      if (authenticated) {
        setIsAuthenticated(true);
      }

      BootSplash.hide({ duration: 500 });
    };

    init();
  }, []);

  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Main" component={DrawerNavigation} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
        <Stack.Screen name="FaceRecognition" component={FaceRecognitionScreen} />
        <Stack.Screen name="ErrorFaceRecognition" component={ErrorFaceRecognition} />
        <Stack.Screen name="LocationAuth" component={LocationAuthScreen} />
        <Stack.Screen name="WifiSecure" component={WifiSecureScreen} />
        <Stack.Screen name="Register" component={RegisterScreen1} />
        <Stack.Screen name="RegisterTwo" component={RegisterScreen2} />
        <Stack.Screen name="RegisterThree" component={RegisterScreen3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
