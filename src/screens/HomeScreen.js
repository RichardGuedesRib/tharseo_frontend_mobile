import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList , Image } from 'react-native';
import Header from '../components/Header';
import { useAuthStore } from '../stores/useAuthStore';
import { useAssetStore } from '../stores/useAssetStore';
import { getAllAssetsServer } from '../services/AssetsService';
import Chart from '../components/Chart';
import AssetsList from '../components/AssetsList';
import TradeCard from '../components/TradeCard';


export default function HomeScreen({ navigation }) {
  
  const { id, name, lastname, phoneNumber, email, token, expiration } = useAuthStore();
  const assets = useAssetStore((state) => state.assets);
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

  useEffect(() => {
    console.log("Auth State:");
    console.log("ID:", id);
    console.log("Name:", name);
    console.log("Lastname:", lastname);
    console.log("PhoneNumber:", phoneNumber);
    console.log("Email:", email);
    console.log("Token:", token);
    console.log("Expiration:", expiration);

    getAllAssetsServer();

  }, [id, name, lastname, phoneNumber, email, token, expiration]);

  useEffect(() => {
    // console.log('Lista de assets:', assets);
  }, [assets]); 


  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Bem vindo, {name}</Text>
    
      <View style={styles.content}>
      <Chart />
      <FlatList
        data={data}
        renderItem={({ item }) => <TradeCard trade={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,  
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, 
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  cardList: {
    paddingBottom: 20,
    flex: 1,
  },
});
