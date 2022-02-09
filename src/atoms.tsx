import { atom } from "recoil";

export const toggleTheme = atom<boolean>({
  key: "toggleTheme",
  default: true,
});
