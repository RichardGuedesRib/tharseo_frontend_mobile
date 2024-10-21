import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { useAuthStore } from '../stores/useAuthStore';

const Header = () => {
  const {name, lastname} = useAuthStore();
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../Assets/img/launch_splash.png')}
        style={styles.logo}
      />

      <TouchableOpacity style={styles.notificationButton}>
      <Image
        source={require('../Assets/icons/notifications.png')}
        style={styles.icon}
      />
      </TouchableOpacity>

      <Text style={styles.name}>{name}</Text>
      <Image
        source={require('../Assets/img/perfil.jpg')}
        style={styles.avatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  notificationButton: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
    color: '#fff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name : {
    color: '#fff',
  },
});

export default Header;
