import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {VictoryCandlestick} from 'victory-native';
import {useAuthStore} from '../stores/useAuthStore';
import CardHeaderChart from './CardHeaderChart';
import Icon from 'react-native-vector-icons/FontAwesome';

const Chart = () => {
  const [chartInfo, setChartInfo] = useState([]);
  const {token} = useAuthStore();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(
          'https://api.binance.com/api/v3/klines?symbol=BNBUSDT&interval=5m',
        );

        if (!res.ok) {
          throw new Error('Erro ao buscar dados do gráfico');
        }

        const data = await res.json();

        const chartCandles = data.slice(-30).map(candle => ({
          x: new Date(parseInt(candle[0])),
          open: parseFloat(candle[1]),
          high: parseFloat(candle[2]),
          low: parseFloat(candle[3]),
          close: parseFloat(candle[4]),
        }));

        if (chartCandles.length > 0) {
          setChartInfo(chartCandles);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <View style={styles.container}>
      <View style={styles.containerCards}>
        <View style={styles.card}>
          <CardHeaderChart
            icon={'camera'}
            title="Valor Total"
            value="$ 3.743"
          />
        </View>
        <View style={styles.card}>
          <CardHeaderChart
            icon={'camera'}
            title="Total Depósito"
            value="$ 1.350"
          />
        </View>
        <View style={styles.card}>
          <CardHeaderChart icon={'camera'} title="Desempenho" value="+12.45%" />
        </View>
      </View>
      <Text style={styles.title}>Performance do Portfólio</Text>
      <View style={styles.containerButtons}>
        <View style={styles.containerButtonsLeft}>
          <View style={styles.containerSelectAsset}>
            <Image
              source={{
                uri: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
              }}
              style={styles.cryptoLogo}
            />
            <Text style={styles.titleBtnSelect}>ADAUSDT</Text>
            <Icon name="camera" size={10} color="#fff" style={styles.icon} />
          </View>
          <View>
            <Icon name="camera" size={10} color="#fff" style={styles.icon} />
          </View>
        </View>

        <View style={styles.containerButtonsRight}>
          <View style={styles.containerButton}>
            <Text style={styles.textButtonTimeChart}>1m</Text>
          </View>
          <View style={styles.containerButton}>
            <Text style={styles.textButtonTimeChart}>5m</Text>
          </View>
          <View style={styles.containerButton}>
            <Text style={styles.textButtonTimeChart}>15m</Text>
          </View>
          <View style={styles.containerButton}>
            <Text style={styles.textButtonTimeChart}>1H</Text>
          </View>
          <View style={styles.containerButton}>
            <Text style={styles.textButtonTimeChart}>4H</Text>
          </View>
          <View style={styles.containerButton}>
            <Text style={styles.textButtonTimeChart}>
              <Icon name="camera" size={10} color="#fff" style={styles.icon} />
            </Text>
          </View>
        </View>
      </View>

      {chartInfo.length > 0 ? (
        <VictoryCandlestick
          data={chartInfo}
          candleColors={{
            positive: '#68FFA3',
            negative: '#F00090',
          }}
          width={350}
          height={250}
          style={styles.containerChart}
        />
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#68FFA3" />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(45, 45, 52, 0.5)',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 25,
  },
  containerCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingTop: 10,
  },

  card: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#333',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 20,
    marginTop: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  cryptoLogo: {
    width: 10,
    height: 10,
    borderRadius: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  titleBtnSelect: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '400',
    letterSpacing: 1,
    marginRight: 5,
  },
  containerSelectAsset: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerButtonsLeft: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  containerButtonsRight: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  buttonTimeChart: {
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 5,
  },
  textButtonTimeChart: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '300',
    width: '100%',
    textAlign: 'center',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
    
  },
  containerButton : {
    backgroundColor: '#424242',
    width: 19,
    height: 19,
    marginLeft: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Chart;
