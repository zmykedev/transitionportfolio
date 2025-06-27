import { atom } from 'jotai';

// Atom para controlar el estado del VS Code editor
export const vsCodeOpenAtom = atom<boolean>(false);

// Atom para controlar el tooltip del VS Code
export const tooltipEnabledAtom = atom<boolean>(false); 