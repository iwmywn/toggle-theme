import { useEffect, useState } from "react";
import themeToggle from "./theme/themeToggle";

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

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <p className="select-none">hello</p>
      </div>
    </>
  );
}

export default App;
