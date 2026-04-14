"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full"></div>;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-foreground/10 transition-colors border border-transparent hover:border-black/10 dark:hover:border-foreground/10"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 hidden dark:block text-foreground/70 hover:text-foreground transition-colors" />
      <Moon className="h-5 w-5 block dark:hidden text-black/70 hover:text-black transition-colors" />
    </button>
  );
}
