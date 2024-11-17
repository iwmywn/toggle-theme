import { Dispatch, SetStateAction } from "react";

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */

interface Props {
  event: MouseEvent;
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

export default function themeToggle({ event, isDark, setIsDark }: Props) {
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
        clipPath: isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 1000,
        easing: "ease-out",
        pseudoElement: isDark
          ? "::view-transition-new(root)"
          : "::view-transition-old(root)",
      }
    );
  });
}
