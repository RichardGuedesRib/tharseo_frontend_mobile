import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const CardHeaderChart = ({icon, title, value}) => {
  return (
    <View style={styles.containerCard}>
      <View style={styles.containerIcon}>
      <Icon name={icon} size={15} color="#fff" style={styles.icon} />
      </View>
      <View style={styles.containerTexts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    
  },
  containerIcon : {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: "#FFFFFF",
    textAlign: 'right',
    fontSize: 10,
    fontWeight: '400',

  },
  content: {
    color: "#FFFFFF",
    textAlign: 'right',
    fontSize: 15,
    fontWeight: '400',
  },
  containerTexts : {
    flexDirection: "column",
    alignItems: "flex-end",
    marginLeft: 5,
  },
});

export default CardHeaderChart;
