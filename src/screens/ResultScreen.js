import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageZoom from 'react-native-image-pan-zoom';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const ResultScreen = props => {
  const {name, background} = useSelector(state => state.theme);

  const {image, kundenname, email} = props.route.params;
  const inlineStyles = {
    container: {backgroundColor: background},
  };
  const navigation = useNavigation();
  return (
    <View style={[styles.container, inlineStyles.container]}>
      <View
        style={{
          backgroundColor: '#2D2C3C',
          height: 50,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SecondScreen', {image, kundenname, email})
          }
          style={{
            marginRight: 20,
            backgroundColor: '#2D2C3C',
            flexDirection: 'row',
          }}>
          <Text style={{color: '#FB6580'}}>Mach weiter</Text>
          <MaterialIcons name="arrow-forward" size={25} color="#FB6580" />
        </TouchableOpacity>
      </View>
      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={Dimensions.get('window').width}
        imageHeight={Dimensions.get('window').height}>
        <Image
          source={{uri: image}}
          style={styles.image}
          resizeMode="contain"
        />
      </ImageZoom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2C3C',
  },
  image: {
    width: '100%',
    height: '80%',
    marginTop: 10,
  },
});

export default ResultScreen;
