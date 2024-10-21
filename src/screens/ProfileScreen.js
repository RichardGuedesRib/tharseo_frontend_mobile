import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/100' }} 
          style={styles.avatar}
        />
        <Text style={styles.username}>Nome do Usuário</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>John</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Sobrenome:</Text>
          <Text style={styles.value}>Doe</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.button} 
            // onPress={() => navigation.navigate('ChangePasswordScreen')}
          >
            <Text style={styles.buttonText}>Alterar Senha</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            // onPress={() => navigation.navigate('ChangeAvatarScreen')}
          >
            <Text style={styles.buttonText}>Alterar Avatar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.verificationCard}>
        <Text style={styles.verificationTitle}>Obtenha sua identidade verificada para comprar e fazer trades no Tharseo</Text>
        <Text style={styles.verificationText}>Verificado</Text>
        <Text style={styles.verificationText}>Limite fiduciário de 10k USD mensal</Text>
        <Text style={styles.verificationText}>Obrigatório:</Text>
        <Text style={styles.verificationText}>- Informações Pessoais</Text>
        <Text style={styles.verificationText}>- Reconhecimento facial</Text>
        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Habilitar Verificação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    paddingHorizontal: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
  },
  value: {
    color: '#ccc',
  },
  buttonsContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
  },
  verificationCard: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
  },
  verificationTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  verificationText: {
    color: '#ccc',
    marginBottom: 5,
  },
  verifyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

