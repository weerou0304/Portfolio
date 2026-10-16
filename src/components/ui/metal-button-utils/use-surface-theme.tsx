"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export type SurfaceTheme = "auto" | "dark" | "light";

export function useSurfaceTheme(theme: SurfaceTheme) {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (theme === "auto") {
      setCurrentTheme(resolvedTheme === "dark" ? "dark" : "light");
    } else {
      setCurrentTheme(theme);
    }
  }, [theme, resolvedTheme]);

  return currentTheme;
}
