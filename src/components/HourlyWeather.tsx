import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const HourlyWeather = ({ time, temp, iconId }) => {
  const getFontColor = () => {
    // if (temp > 70) {
    //   return 'orange';
    // }

    // if (temp > 90) {
    //   return 'red';
    // }

    // if (temp < 60) {
    //   return 'blue';
    // }

    return 'white';
  };

  const url = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  console.log('rendering ', url);
  return (
    <View style={styles.container}>
      <Text style={{ color: getFontColor(), paddingBottom: 5, paddingLeft: 4 }}>
        {temp}°
      </Text>
      {/* <Feather
        name='sun'
        size={24}
        color='white'
        style={{ paddingBottom: 5 }}
      /> */}
      <Image source={{ uri: url }} style={{ height: 24, width: 24 }} />
      <Text style={{ fontSize: 14, color: '#ffffff99', textAlign: 'center' }}>
        {time}
      </Text>
    </View>
  );
};

export default HourlyWeather;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 120,
    borderColor: '#ffffff40',
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaaaaa10',
    paddingHorizontal: 10,
  },
});
