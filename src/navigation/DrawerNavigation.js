import React, { useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Importa o StackNavigator
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import TradesScreen from '../screens/TradesScreen';
import HistoricScreen from '../screens/HistoricScreen';
import OpenTradesScreen from '../screens/OpenTradesScreen';
import SettingsScreen from '../screens/SettingsScreen';

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
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="Trades"
        onPress={() => props.navigation.navigate('Trades')}
      />
      <DrawerItem
        label="Em Andamento"
        onPress={() => props.navigation.navigate('OpenTrades')}
      />
      <DrawerItem
        label="Histórico"
        onPress={() => props.navigation.navigate('Historic')}
      />
      <DrawerItem
        label="Perfil"
        onPress={() => props.navigation.navigate('Profile')}
      />
         <DrawerItem
        label="Configurações"
        onPress={() => props.navigation.navigate('Settings')}
      />     
      

      <DrawerItem
        label="Logout"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
