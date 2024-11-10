import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity, Alert,} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../stores/useAuthStore';
import serverConfig from '../services/ServerConfig';

export default function SettingsScreen() {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isPrivacyEnabled, setPrivacyEnabled] = useState(false);
  const [isSafePointsEnabled, setSafePointsEnabled] = useState(loginLocationSecurity);
  const {id, token, loginLocationSecurity, latitude, longitude} = useAuthStore();
  const navigation = useNavigation();


  const handleWifiSecure = () => {
    navigation.navigate('WifiSecure');
  };

  //Function to toggle secure point
  const toggleSecurePoint = async () => {
    const newSafePointState = !isSafePointsEnabled;
  
    if (newSafePointState === true && (!latitude || !longitude)) {
      Alert.alert('Erro', 'Defina uma localização para o ponto seguro em Adicionar!');
      return; 
    }
  
    setSafePointsEnabled(newSafePointState);

    const urlRequest = `${serverConfig.addressServerTharseo}/users/${id}`;
    const payload = {
      loginLocationSecurity: newSafePointState,
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
        setSafePointsEnabled(!newSafePointState);
      } else {
        Alert.alert(
          'Sucesso',
          newSafePointState ? 'Login por ponto seguro ativado!' : 'Login por ponto seguro desativado!'
        );
        useAuthStore.setState({ loginLocationSecurity: newSafePointState });
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar o ponto seguro.');
      setSafePointsEnabled(!newSafePointState);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONFIGURAÇÕES</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Preferências de notificação</Text>
        </View>
        <Text style={styles.cardText}>
          Configure para receber notificações relevantes na caixa de entrada do
          aplicativo e do site.
        </Text>
        <View style={styles.toggleContainer}>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>
      </View>

      {/* Card de Privacidade */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Privacidade</Text>
        </View>
        <Text style={styles.cardText}>
          O Tharseo pode compartilhar dados de uso com plataformas de análises
          de terceiros para aprimorar nossos produtos e marketing.
        </Text>
        <View style={styles.toggleContainer}>
          <Switch value={isPrivacyEnabled} onValueChange={setPrivacyEnabled} />
        </View>
      </View>

      {/* Card de Pontos Seguros */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Ponto seguro</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleWifiSecure}>
            <Text style={styles.addButtonText}>Adicionar +</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.cardText}>
          Com esta função ativa, você pode definir uma zona que considera segura
          para restringir o acesso ao Tharseo.
        </Text>
        <View style={styles.toggleContainer}>
          <Switch
            value={isSafePointsEnabled}
            onValueChange={toggleSecurePoint}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    padding: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#ccc',
    marginBottom: 15,
  },
  toggleContainer: {
    alignItems: 'flex-end',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
