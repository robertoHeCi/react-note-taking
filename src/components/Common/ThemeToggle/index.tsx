import useTheme from "@/hooks/useTheme";
import { DarkIcon } from "../Common/Icons";
import { LightIcon } from "../Common/Icons";


const ThemeToggle = () => {
  const { toggleTheme, theme } = useTheme();
  
  return (
    <div className="flex justify-end">
      <button className="btn p-2 rounded-full dark:hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:ease-in duration-300" onClick={toggleTheme}>
        {theme === 'light' ? <DarkIcon  /> : <LightIcon />}
      </button>
    </div>
  )
}

export default ThemeToggle;