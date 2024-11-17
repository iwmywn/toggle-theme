import { useEffect, useState } from "react";
import themeToggle from "./components/themeToggle";

function App() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);

    const handleClick = (event: MouseEvent) => {
      themeToggle({ event, isDark, setIsDark });
    };

    document.body.addEventListener("dblclick", handleClick);
    return () => document.body.removeEventListener("dblclick", handleClick);
  }, [isDark]);

  return null;
}

export default App;
