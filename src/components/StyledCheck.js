import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const StyledCheck = props => {
  const {name} = useSelector(state => state.theme);

  const trackColor =
    name === 'light'
      ? {false: '#f2f2f2', true: '#f2f2f2'}
      : {false: 'rgba(0,0,0,.5)', true: 'rgba(0,0,0,.25)'};

  const thumbColor =
    name === 'light'
      ? !props.value
        ? '#7A7A7A'
        : '#FB6580'
      : !props.value
      ? '#7A7A7A'
      : '#FB6580';

  const inlineStyles = {
    container: {
      backgroundColor: name === 'light' ? 'rgba(0,0,0,.25)' : '#1D192C',
    },
    text: {
      color: name === 'light' ? '#fff' : '#9C9EC1',
    },
  };

  return (
    <View style={[styles.container, inlineStyles.container]}>
      <Text style={[styles.text, inlineStyles.text]}>{props.label}</Text>
      <Switch
        trackColor={trackColor}
        thumbColor={thumbColor}
        value={props.value}
        onValueChange={props.onValueChange}
        ios_backgroundColor="#3e3e3e"
        style={{flex: 1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D192C',
    flexDirection: 'row',
    borderRadius: 10,
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  text: {flex: 10},
});

export default StyledCheck;
