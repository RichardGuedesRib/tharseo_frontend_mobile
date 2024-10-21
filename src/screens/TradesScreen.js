import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Switch, FlatList } from 'react-native';
import Header from '../components/Header';

export default function TradesScreen() {
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState({
    bitcoin: true,
    ethereum: false,
    cardano: true,
  });

  const data = [
    {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      marketValue: '$30,000',
      amountOwned: '0.5 BTC',
      performance: '+15%',
      profit: '$4,500',
      imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    },
    {
      id: '2',
      name: 'Ethereum',
      symbol: 'ETH',
      marketValue: '$2,000',
      amountOwned: '2.0 ETH',
      performance: '+10%',
      profit: '$400',
      imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    {
      id: '3',
      name: 'Cardano',
      symbol: 'ADA',
      marketValue: '$0.30',
      amountOwned: '1000 ADA',
      performance: '+5%',
      profit: '$50',
      imageUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    },
  ];

  const handleToggle = (cryptoId) => {
    setIsActive((prevState) => ({
      ...prevState,
      [cryptoId]: !prevState[cryptoId],
    }));
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cryptoInfo}>
          <Image source={{ uri: item.imageUrl }} style={styles.cryptoLogo} />
          <Text style={styles.cryptoName}>{item.name}</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Text style={styles.optionsButtonText}>•••</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardRow}>
          <Text style={styles.label}>Valor de mercado:</Text>
          <Text style={styles.value}>{item.marketValue}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.label}>Quantia comprada:</Text>
          <Text style={styles.value}>{item.amountOwned}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.label}>Desempenho:</Text>
          <Text style={[styles.value, { color: item.performance.includes('-') ? '#FF4D4D' : '#4DFF88' }]}>
            {item.performance}
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.label}>Lucro até agora:</Text>
          <Text style={styles.value}>{item.profit}</Text>
        </View>
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.tradeStatusText}>Trade ativo</Text>
        <Switch 
          value={isActive[item.symbol.toLowerCase()]} 
          onValueChange={() => handleToggle(item.symbol.toLowerCase())} 
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar por criptomoeda..."
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cryptoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  cryptoName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  optionsButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  cardBody: {
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
  },
  value: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tradeStatusText: {
    color: '#aaa',
  },
});

