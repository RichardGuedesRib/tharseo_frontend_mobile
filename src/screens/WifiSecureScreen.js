import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WifiSecureScreen = ({ navigation }) => {
  const handleBack = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Wi-Fis dos meus locais seguros</Text>

        <Text style={styles.description}>
          Ao se conectar com esses Wi-Fis, o modo seguro irá reconhecer que você está em um local seguro e suas proteções serão desativadas.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.subtitle}>Meus Wi-Fis Seguros</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="+ Adicionar Wi-fi seguro"
            placeholderTextColor="#A9A9A9"
          />
        </View>

        <View style={styles.wifiItem}>
          <Icon name="wifi" size={24} color="#fff" />
          <Text style={styles.wifiText}>fatec_piso</Text>
          <Icon name="trash" size={24} color="#fff" />
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
    height: '80%', // Aumenta a altura da div
    backgroundColor: 'rgba(59, 59, 59, 0.8)', // Grafite com transparência
    borderRadius: 10,
    padding: 20,
  },
  backText: {
    color: '#DCDCDC', // Cor branco gelo
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
    color: '#DCDCDC', // Cor branco gelo
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
  },
  divider: {
    height: 1,
    backgroundColor: '#DCDCDC', // Cor branco gelo
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DCDCDC', // Cor branco gelo
    borderRadius: 5,
    padding: 10,
    color: '#fff',
    fontSize: 16,
  },
  wifiItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  wifiText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WifiSecureScreen;
