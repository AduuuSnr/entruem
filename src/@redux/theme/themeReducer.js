import {lightTheme, darkTheme} from '../../themes';
import {CHANGE_THEME} from './themeTypes';

const intialState = lightTheme;

const themeReducer = (state = intialState, action) => {
  const type = action.type;
  if (type === CHANGE_THEME) {
    console.log("anan")
    if (action.payload.theme === 'light') return lightTheme;
    if (action.payload.theme === 'dark') return darkTheme;
  }

  return state;
};

export default themeReducer;
