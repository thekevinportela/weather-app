import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const HourlyWeather = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', paddingBottom: 5, paddingLeft: 4 }}>
        81°
      </Text>
      <Feather
        name='sun'
        size={24}
        color='white'
        style={{ paddingBottom: 5 }}
      />
      <Text style={{ fontSize: 10, color: '#ffffff99' }}>10:00</Text>
    </View>
  );
};

export default HourlyWeather;

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: 70,
    borderColor: '#ffffff40',
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaaaaa10',
  },
});
