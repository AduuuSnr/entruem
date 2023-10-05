import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {changeTheme} from "../@redux/theme/themeActions";

const StyledCheck2 = props => {
  const {name} = useSelector(state => state.theme);
  const dispatch = useDispatch();

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
      backgroundColor: name === 'light' ? 'transparent' : 'transparent',
    },
    text: {
      color: name === 'light' ? '#fff' : '#9C9EC1',
    },
  };

  const val = name === "light" ? false : true;

  console.log(val);

  return (
    <View style={[styles.container, inlineStyles.container]}>
      <Text style={[styles.text, inlineStyles.text]}>{props.label}</Text>
      <Switch
        trackColor={trackColor}
        thumbColor={thumbColor}
        value={val}
        onValueChange={() => {
          console.log("soneeeeeeeer");
          const newTheme = name === "light" ? "dark" : "light";
          dispatch( changeTheme(newTheme) );
        }}
        ios_backgroundColor="#3e3e3e"
        //style={{flex: 1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 0,
  },
  text: {flex: 10},
});

export default StyledCheck2;
