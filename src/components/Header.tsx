import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Header = ({ city }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name='ios-menu-outline' size={30} color='white' />
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row' }}>
        <Ionicons
          name='location-sharp'
          size={20}
          color='white'
          style={{ paddingTop: 3 }}
        />
        <Text style={{ fontSize: 24, color: 'white' }}>{city}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name='search-outline' size={30} color='white' />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight / 8,
    backgroundColor: '#24C0F6',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
});
