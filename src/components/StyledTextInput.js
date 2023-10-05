import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const StyledTextInput = props => {
  const {name} = useSelector(state => state.theme);

  const inlineStyles = {
    textInput: {
      backgroundColor: name === 'light' ? 'rgba(0,0,0,.25)' : '#1D192C',
      color: name === 'light' ? '#000' : '#fff',
    },
  };

  console.log(name);

  return (
    <TextInput
      style={[styles.textInput, inlineStyles.textInput]}
      placeholderTextColor={name === 'light' ? '#fff' : '#9C9EC1'}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#1D192C',
    color: 'white',
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default StyledTextInput;
