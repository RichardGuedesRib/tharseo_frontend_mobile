import React, { useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native'; 
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import TradesScreen from '../screens/TradesScreen';
import HistoricScreen from '../screens/HistoricScreen';
import OpenTradesScreen from '../screens/OpenTradesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FaceRecognitionScreen from '../screens/FaceRecognitionScreen';
import ErrorFaceRecognition from '../screens/ErrorFaceRecognition';

import { useAuthStore } from '../stores/useAuthStore';
import BootSplash from 'react-native-bootsplash';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContent(props) {
  const { clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      clearAuth();
    } catch (error) {
      console.error('Erro ao deslogar: ', error);
    }
  };

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

function DrawerNavigation() {
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
      <Drawer.Screen name="Trades" component={TradesScreen} />
      <Drawer.Screen name="OpenTrades" component={OpenTradesScreen} />
      <Drawer.Screen name="Historic" component={HistoricScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

function AppNavigator() {
  const { token } = useAuthStore();

  useEffect(() => {
    BootSplash.hide({ duration: 500 }); 
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <Stack.Screen name="Main" component={DrawerNavigation} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
        <Stack.Screen name="FaceRecognition" component={FaceRecognitionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ErrorFaceRecognition" component={ErrorFaceRecognition} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
