import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AssetsList = () => {
  const assets = [
    { name: 'Bitcoin', value: '$23.3B', percentage: '71.68%', color: '#F7931A' },
    { name: 'Ethereum', value: '$23.3B', percentage: '71.68%', color: '#627EEA' },
    { name: 'Shiba', value: '$23.3B', percentage: '71.68%', color: '#EE4B2B' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ativos em Carteira</Text>
      {assets.map((asset, index) => (
        <View key={index} style={styles.assetContainer}>
          <Text style={[styles.assetName, { color: asset.color }]}>{asset.name}</Text>
          <Text style={styles.assetValue}>{asset.value}</Text>
          <Text style={styles.assetPercentage}>{asset.percentage}</Text>
        </View>
      ))}
      <Text style={styles.viewAll}>Ver todas</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D34',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  assetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  assetName: {
    fontSize: 16,
  },
  assetValue: {
    color: '#fff',
    fontSize: 16,
  },
  assetPercentage: {
    color: '#6F6F7B',
    fontSize: 16,
  },
  viewAll: {
    color: '#4F5FFF',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AssetsList;
