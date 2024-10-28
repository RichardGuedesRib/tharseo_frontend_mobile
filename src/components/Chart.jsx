import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  VictoryCandlestick,
} from 'victory-native';



const Chart = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfico de Candlestick</Text>
      <VictoryCandlestick

  data={[
    {x: 1, open: 5, close: 10, high: 15, low: 0},
    {x: 2, open: 10, close: 15, high: 20, low: 5},
    {x: 3, open: 15, close: 20, high: 22, low: 10},
    {x: 4, open: 20, close: 10, high: 25, low: 7},
    {x: 5, open: 10, close: 8, high: 15, low: 5}
  ]}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Chart;
