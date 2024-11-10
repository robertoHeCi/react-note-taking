import useTheme from "@/hooks/useTheme";


const ThemeToggle = () => {
  const { toggleTheme, themeIcon } = useTheme();
  
  return (
    <div className="flex justify-end">
      <button className="btn w-10 h-10" onClick={toggleTheme}>
        <img className="w-full h-full" src={themeIcon} alt="theme" />
      </button>
    </div>
  )
}

export default ThemeToggle;