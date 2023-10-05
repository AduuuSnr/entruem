import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StyledCheck2 from '../components/StyledCheck2';
import {Icon} from 'react-native-elements';


const HomePage = ({navigation}) => {
  const {background} = useSelector(state => state.theme);

  const inlineStyles = {
    container: {backgroundColor: background},
  };

  return (
    <View style={[styles.container, inlineStyles.container]}>
      <TouchableOpacity onPress={() => navigation.navigate('FormScreen')}>
        <Image source={require('../img/VertragLogo.png')} />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="wb-sunny" size={35} color="#FB6580" />
                <StyledCheck2 />
                <Icon 
                  name='moon-o'
                  type='font-awesome'
                  color='#FB6580'
                  size= {35}
                />
              </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2C3C',
  },
});

export default HomePage;
