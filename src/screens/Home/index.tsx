import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { Feather } from '@expo/vector-icons';
import HourlyWeather from '../../components/HourlyWeather';
import { Fontisto } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherApi from '../../WeatherApi';
import { DAY_STRINGS, MONTH_STRINGS } from '../../constants';

const HomeScreen = () => {
  const [city, setCity] = useState('Miami');
  const [state, setstate] = useState('Florida');
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    const response = await WeatherApi.getWeather(city, state);
    setWeather(response.data);
    setLoading(false);
  };

  const renderDateText = () => {
    const today = new Date();
    const day = DAY_STRINGS[today.getDay()];
    const month = MONTH_STRINGS[today.getMonth()];
    const date = today.getDate();
    return (
      <Text
        style={{
          fontSize: 14,
          color: '#ffffff99',
          marginTop: 5,
          marginBottom: 30,
        }}
      >
        {day}, {month} {date}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Header city={city} />
      <View
        style={{
          height: '65%',
          width: '100%',
          shadowColor: 'rgb(8,63,143)',
          shadowOffset: { width: 0, height: 15 },
          shadowOpacity: 1,
          shadowRadius: 1,
        }}
      >
        <View style={styles.weatherDay}>
          <LinearGradient
            colors={['#24C0F6', '#1167F2']}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Image
              style={{ resizeMode: 'contain', height: 220 }}
              source={require('../../assets/imgs/weather.png')}
            />
            <Text style={{ fontSize: 120, color: 'white', marginLeft: 45 }}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                `${Math.round(weather.main.temp)}°`
              )}
            </Text>
            <Text style={{ fontSize: 20, color: 'white', marginLeft: 0 }}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                weather.weather[0].description.charAt(0).toUpperCase() +
                weather.weather[0].description.slice(1)
              )}
            </Text>
            {renderDateText()}
            <View
              style={{
                width: '80%',
                borderTopColor: '#ffffff30',
                borderTopWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <View style={{ padding: 25, alignItems: 'center', width: 150 }}>
                <Feather
                  name='wind'
                  size={24}
                  color='white'
                  style={{ paddingBottom: 5 }}
                />
                <Text style={{ color: 'white' }}>
                  {' '}
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    `${Math.round(weather.wind.speed)} mph`
                  )}
                </Text>
                <Text style={{ color: '#ffffff99', fontSize: 12 }}>Wind</Text>
              </View>
              <View style={{ padding: 25, alignItems: 'center', width: 150 }}>
                <Feather
                  name='droplet'
                  size={24}
                  color='white'
                  style={{ paddingBottom: 5 }}
                />
                <Text style={{ color: 'white' }}>
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    `${Math.round(weather.main.humidity)}%`
                  )}
                </Text>
                <Text style={{ color: '#ffffff99', fontSize: 12 }}>
                  Humidity
                </Text>
              </View>
              <View style={{ padding: 25, alignItems: 'center', width: 150 }}>
                <Fontisto
                  name='thermometer'
                  size={24}
                  color='white'
                  style={{ paddingBottom: 5 }}
                />
                <Text style={{ color: 'white' }}>
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    `${Math.round(weather.main.temp_max)}°/ ${Math.round(
                      weather.main.temp_min
                    )}°`
                  )}
                </Text>
                <Text style={{ color: '#ffffff99', fontSize: 12 }}>HI/LOW</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ color: 'white', padding: 30, fontSize: 16 }}>TODAY</Text>
        <TouchableOpacity>
          <Text style={{ color: '#ffffff99', padding: 30 }}>7 days {'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          directionalLockEnabled={true}
          contentContainerStyle={{
            flexDirection: 'row',
          }}
          // style={{ width: '80%' }}
        >
          {new Array(24).fill('').map((_, index) => {
            return <HourlyWeather key={String(index)} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000918',
  },
  weatherDay: {
    flex: 1,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    shadowColor: 'rgb(8,63,143)',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 1,
    shadowRadius: 1,
    overflow: 'hidden',
  },
});
