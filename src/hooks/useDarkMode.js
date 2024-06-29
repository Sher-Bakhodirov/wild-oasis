import { useContext } from "react";
import { ModeContext } from "../context/DarkModeContext";

export function useDarkMode() {
  const context = useContext(ModeContext);

  if (context === undefined) {
    throw new Error("Dark mode context used outside of the provider");
  }

  return context
}
