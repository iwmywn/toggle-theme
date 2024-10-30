import React, { useState } from "react";
import "./ThemeToggle.css";

function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleDark = (event: React.MouseEvent<HTMLDivElement>) => {
    const isAppearanceTransition =
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isAppearanceTransition) {
      setIsDark(!isDark);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(async () => {
      setIsDark(!isDark);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 1800,
          easing: "ease-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <div
      style={{
        height: "100vh",
      }}
      className={`theme-container ${isDark ? "dark" : "light"}`}
      onDoubleClick={toggleDark}
    ></div>
  );
}

export default ThemeToggle;
