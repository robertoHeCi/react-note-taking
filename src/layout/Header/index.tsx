import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  return (
    <nav className="w-full bg-white dark:bg-gray-800 p-4 drop-shadow-md">
      <div className="flex flex-wrap items-center justify-between mx-auto p-2">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="images/logo.webp" className="h-6 drop-shadow" alt="Surfe Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Surfe</span>
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Header;