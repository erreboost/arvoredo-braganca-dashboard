import { useContext } from "react";
import { HiSun, HiMoon } from "react-icons/hi";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="p-2 ">
      {theme === "dark" ? (
        <div
          className="flex items-center cursor-pointer drop-shadow-[0_0_8px_#fcfcfc47]"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <HiSun className="text-primary text-2xl mr-2" />
        </div>
      ) : (
        <div
          className="flex items-center cursor-pointer drop-shadow-[0_0_8px_#131313a2]"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <HiMoon className="text-primary text-2xl mr-2" />
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
