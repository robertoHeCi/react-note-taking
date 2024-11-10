import { useState } from 'react';

const useTheme = () => {
  const DARK_CLASS = 'dark';
  const LIGHT_CLASS = 'light';

  const [theme, setTheme] = useState(DARK_CLASS);

  const toggleTheme = () => {
    document.documentElement.classList.toggle(DARK_CLASS);
    setTheme(theme === DARK_CLASS ? LIGHT_CLASS : DARK_CLASS);
  }

  return { toggleTheme, theme };
  
}

export default useTheme;