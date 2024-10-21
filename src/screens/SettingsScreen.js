import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  // Estado para controlar os toggles
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isPrivacyEnabled, setPrivacyEnabled] = useState(false);
  const [isSafePointsEnabled, setSafePointsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONFIGURAÇÕES</Text>
      
      {/* Card de Preferências de Notificação */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Preferências de notificação</Text>
        </View>
        <Text style={styles.cardText}>
          Configure para receber notificações relevantes na caixa de entrada do aplicativo e do site.
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
          O Tharseo pode compartilhar dados de uso com plataformas de análises de terceiros para aprimorar nossos produtos e marketing.
        </Text>
        <View style={styles.toggleContainer}>
          <Switch 
            value={isPrivacyEnabled} 
            onValueChange={setPrivacyEnabled} 
          />
        </View>
      </View>

      {/* Card de Pontos Seguros */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Pontos seguros</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Adicionar +</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.cardText}>
          Com esta função ativa, você pode definir até 5 redes que considera seguras e detectamos como seguro as transações feitas nesse id.
        </Text>
        <View style={styles.toggleContainer}>
          <Switch 
            value={isSafePointsEnabled} 
            onValueChange={setSafePointsEnabled} 
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

