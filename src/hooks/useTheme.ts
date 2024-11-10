import darkIcon from '@/assets/icons/dark.svg';
import lightIcon from '@/assets/icons/light.svg';
import { useState } from 'react';

const useTheme = () => {
  const DARK_CLASS = 'dark';
  const LIGHT_CLASS = 'light';

  const [theme, setTheme] = useState(DARK_CLASS);

  const toggleTheme = () => {
    document.documentElement.classList.toggle(DARK_CLASS);
    setTheme(theme === DARK_CLASS ? LIGHT_CLASS : DARK_CLASS);
  }

  const themeIcon = theme === DARK_CLASS ? lightIcon : darkIcon;
  

  return { toggleTheme, themeIcon };
  
}

export default useTheme;