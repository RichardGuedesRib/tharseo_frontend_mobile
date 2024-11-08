import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressBar from './ProgressBar';

const TradeCard = ({ trade }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.cryptoInfo}>
        <Image source={{ uri: trade.imageUrl }} style={styles.cryptoLogo} />
        <Text style={styles.cryptoName}>{trade.name}</Text>
      </View>
      <TouchableOpacity style={styles.optionsButton}>
        <Text style={styles.optionsButtonText}>•••</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.cardBody}>
      <CardRow label="Data de abertura:" value={trade.openDate} />
      <CardRow label="Preço de compra:" value={trade.buyPrice} />
      <CardRow label="Alvo:" value={trade.targetPrice} />
      <CardRow label="Lucro esperado:" value={trade.expectedProfit} />
      <CardRow label="Quantidade:" value={trade.amount} />

      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Andamento:</Text>
        <ProgressBar progress={trade.progress} />
      </View>
    </View>
  </View>
);

const CardRow = ({ label, value }) => (
  <View style={styles.cardRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
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
    width: 350
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

export default TradeCard;
