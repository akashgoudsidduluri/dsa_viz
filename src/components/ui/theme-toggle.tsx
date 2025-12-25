import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type ThemeToggleProps = {
  /** 'global' toggles document root (default). 'element' toggles a specific element by id. */
  scope?: "global" | "element";
  /** When scope is 'element', the id of the element to toggle the 'dark' class on. */
  elementId?: string;
  /** Storage key to persist this toggle (defaults to 'theme' for global and 'visualizer_theme' for element). */
  storageKey?: string;
};

const ThemeToggle = ({ scope = "global", elementId, storageKey }: ThemeToggleProps) => {
  const key = storageKey || (scope === "global" ? "theme" : "visualizer_theme");

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const t = localStorage.getItem(key);
      return (t === "dark" || t === "light") ? (t as "dark" | "light") : "dark";
    } catch (e) {
      return "dark";
    }
  });

  useEffect(() => {
    let target: HTMLElement | null = null;
    if (scope === "global") target = document.documentElement;
    else if (elementId) target = document.getElementById(elementId);
    if (!target) target = document.documentElement;

    if (theme === "dark") target.classList.add("dark");
    else target.classList.remove("dark");

    try { localStorage.setItem(key, theme); } catch (e) {}
  }, [theme, scope, elementId, key]);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  );
};

export default ThemeToggle;
