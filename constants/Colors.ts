/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#4a5089";
const tintColorDark = "#ced2fb";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    card: "#f2f2f7",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    border: "#d1d1d6",
    primary: "#007aff", // Azul estilo iOS
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    card: "#2c2c2e",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    border: "#3a3a3c",
    primary: "#0a84ff", // Azul mais vívido para dark
  },
};
