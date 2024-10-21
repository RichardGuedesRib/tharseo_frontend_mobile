import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ProgressBarAndroid } from 'react-native';
import Header from '../components/Header';

export default function OpenTradesScreen({ navigation }) {
  const [data] = useState([
    {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      openDate: '2024-10-15',
      buyPrice: '$28,000',
      targetPrice: '$35,000',
      expectedProfit: '$7,000',
      amount: '0.3 BTC',
      progress: 0.6,
      imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    },
    {
      id: '2',
      name: 'Ethereum',
      symbol: 'ETH',
      openDate: '2024-10-10',
      buyPrice: '$1,800',
      targetPrice: '$2,500',
      expectedProfit: '$700',
      amount: '1.5 ETH',
      progress: 0.45,
      imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    {
      id: '3',
      name: 'Cardano',
      symbol: 'ADA',
      openDate: '2024-10-12',
      buyPrice: '$0.25',
      targetPrice: '$0.40',
      expectedProfit: '$150',
      amount: '2000 ADA',
      progress: 0.3,
      imageUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    },
  ]);

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
          <Text style={styles.label}>Data de abertura:</Text>
          <Text style={styles.value}>{item.openDate}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.label}>Preço de compra:</Text>
          <Text style={styles.value}>{item.buyPrice}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.label}>Alvo:</Text>
          <Text style={styles.value}>{item.targetPrice}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.label}>Lucro esperado:</Text>
          <Text style={styles.value}>{item.expectedProfit}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.label}>Quantidade:</Text>
          <Text style={styles.value}>{item.amount}</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Andamento:</Text>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={item.progress}
            color="#4DFF88"
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>EM ANDAMENTO</Text>
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
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
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
  progressContainer: {
    marginTop: 10,
  },
  progressLabel: {
    color: '#aaa',
    marginBottom: 5,
  },
});
