import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import auth from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}

function DrawerNavigation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}

export default DrawerNavigation;
