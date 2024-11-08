import React from 'react';
import { ProgressBarAndroid, View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => (
  <ProgressBarAndroid
    styleAttr="Horizontal"
    indeterminate={false}
    progress={progress}
    color="#4DFF88"
  />
);

export default ProgressBar;
