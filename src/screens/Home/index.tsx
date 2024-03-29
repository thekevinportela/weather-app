import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Header";
import { Feather } from "@expo/vector-icons";
import HourlyWeather from "../../components/HourlyWeather";
import { Fontisto } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import WeatherApi from "../../WeatherApi";
import { DAY_STRINGS, MONTH_STRINGS } from "../../constants";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import moment from "moment";

export const useTiming = (
  state: boolean | number,
  config?: WithTimingConfig
) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === "boolean" ? (state ? 1 : 0) : state;
  }, [state, value]);
  const transition = useDerivedValue(() => {
    return withTiming(value.value, config);
  });
  return transition;
};

const HomeScreen = () => {
  // const [city, setCity] = useState('Miami');
  // const [state, setstate] = useState('Florida');
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({
    city: "Miami",
    state: "Florida",
  });
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    getWeather();
  }, [location]);

  const getWeather = async () => {
    const response = await WeatherApi.getWeather(location.city, location.state);
    const { lat, lon } = response.data.coord;
    const forecast = await WeatherApi.get3HourlyForecast(lat, lon);
    console.log("WEATHER DATA", response.data);
    console.log("FORCAST", forecast.data);
    setForecast(forecast.data);
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
          color: "#ffffff99",
          marginTop: 5,
          marginBottom: 30,
        }}
      >
        {day}, {month} {date}
      </Text>
    );
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };

  // const opacity = useSharedValue(0);
  const [isSearching, setIsSearching] = useState(false);

  const onSearch = (query) => {
    const [city, state] = query.split(",");

    setLocation({
      city,
      state,
    });
    setIsSearching(false);
  };

  return (
    <View style={styles.container}>
      <Header city={location.city} onSearchPress={toggleSearch} />

      <SearchComponent
        visible={isSearching}
        onDismiss={toggleSearch}
        onSearch={onSearch}
      />

      <View
        style={{
          height: "65%",
          width: "100%",
          shadowColor: "rgb(8,63,143)",
          shadowOffset: { width: 0, height: 15 },
          shadowOpacity: 1,
          shadowRadius: 1,
        }}
      >
        <View style={styles.weatherDay}>
          <LinearGradient
            colors={["#24C0F6", "#1167F2"]}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Image
              style={{ resizeMode: "contain", height: 220 }}
              source={require("../../assets/imgs/weather.png")}
            />
            <Text style={{ fontSize: 120, color: "white", marginLeft: 45 }}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                `${Math.round(weather.main.temp)}°`
              )}
            </Text>
            <Text style={{ fontSize: 20, color: "white", marginLeft: 0 }}>
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
                width: "80%",
                borderTopColor: "#ffffff30",
                borderTopWidth: 1,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View style={{ padding: 25, alignItems: "center", width: 150 }}>
                <Feather
                  name="wind"
                  size={24}
                  color="white"
                  style={{ paddingBottom: 5 }}
                />
                <Text style={{ color: "white" }}>
                  {" "}
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    `${Math.round(weather.wind.speed)} mph`
                  )}
                </Text>
                <Text style={{ color: "#ffffff99", fontSize: 12 }}>Wind</Text>
              </View>
              <View style={{ padding: 25, alignItems: "center", width: 150 }}>
                <Feather
                  name="droplet"
                  size={24}
                  color="white"
                  style={{ paddingBottom: 5 }}
                />
                <Text style={{ color: "white" }}>
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    `${Math.round(weather.main.humidity)}%`
                  )}
                </Text>
                <Text style={{ color: "#ffffff99", fontSize: 12 }}>
                  Humidity
                </Text>
              </View>
              <View style={{ padding: 25, alignItems: "center", width: 150 }}>
                <Fontisto
                  name="thermometer"
                  size={24}
                  color="white"
                  style={{ paddingBottom: 5 }}
                />
                <Text style={{ color: "white" }}>
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    `${Math.round(weather.main.temp_max)}°/ ${Math.round(
                      weather.main.temp_min
                    )}°`
                  )}
                </Text>
                <Text style={{ color: "#ffffff99", fontSize: 12 }}>HI/LOW</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ color: 'white', padding: 30, fontSize: 16 }}>5-DAY</Text>
        <TouchableOpacity>
          <Text style={{ color: '#ffffff99', padding: 30 }}>7 days {'>'}</Text>
        </TouchableOpacity>
      </View> */}
      {/* <Text
        style={{
          color: 'white',
          fontSize: 16,
          marginVertical: 20,
          marginLeft: 10,
        }}
      >
        5-DAY
      </Text> */}
      <View style={{ flex: 1, alignItems: "center", marginTop: 35 }}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          directionalLockEnabled={true}
          contentContainerStyle={{
            flexDirection: "row",
          }}
          // style={{ width: '80%' }}
        >
          {/* {new Array(24).fill('').map((_, index) => {
            return <HourlyWeather key={String(index)} />;
          })} */}

          {forecast &&
            forecast.list.map((_: any) => {
              const { main, dt_txt, weather, wind, clouds } = _;
              const time = moment(dt_txt).calendar();
              const temp = Math.round(main.temp);
              const iconId = weather[0].icon;
              return (
                // <View style={{ marginHorizontal: 10 }}>
                //   <Text style={{ color: 'white' }}>{time}</Text>
                // </View>
                <HourlyWeather time={time} temp={temp} iconId={iconId} />
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const SearchComponent = ({ visible, onDismiss, onSearch }) => {
  const safeInsets = useSafeAreaInsets();
  const transition = useTiming(visible, { duration: 250 });
  const [query, setQuery] = useState("");

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: transition.value,
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: transition.value,
    };
  });

  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: interpolate(transition.value, [0, 1], [400, 0]) },
      ],
    };
  });

  return (
    <Animated.View
      pointerEvents={visible ? "auto" : "none"}
      style={[
        {
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 1000,
        },
        containerStyle,
      ]}
    >
      <Animated.View
        style={[
          overlayStyle,
          {
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: -1,
          },
        ]}
      >
        <LinearGradient colors={["#24C0F6", "#1167F2"]} style={{ flex: 1 }} />
      </Animated.View>

      <View
        style={{
          position: "absolute",
          zIndex: 1,

          top: safeInsets.top + 10,
          width: "100%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={[
            {
              backgroundColor: "#F8F8F8",
              height: 45,
              width: "80%",
              borderRadius: 20,
              justifyContent: "center",
              // alignItems: 'center',
              padding: 10,
            },
            inputStyle,
          ]}
        >
          <TextInput
            placeholder="Search..."
            placeholderTextColor={"black"}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => onSearch(query)}
          />
        </Animated.View>

        <Pressable
          onPress={onDismiss}
          style={{
            marginLeft: 10,
          }}
        >
          <Feather name="x" size={32} color="#FFF" />
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000918",
  },
  weatherDay: {
    flex: 1,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    shadowColor: "rgb(8,63,143)",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 1,
    shadowRadius: 1,
    overflow: "hidden",
  },
});
