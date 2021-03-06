export const SET_BACKGROUND = 'SET_BACKGROUND';
export const SET_FOREGROUND = 'SET_FOREGROUND';
export const SWAP_COLORS = 'SWAP_COLORS';
export const SET_COLOR_BLIND = 'SET_COLOR_BLIND';
export const SET_CONTROLS_SHOWN = 'SET_CONTROLS_SHOWN';

export function setForeground(color = '#000') {
  return {
    type: SET_FOREGROUND,
    color,
  };
}

export function setBackground(color = '#fff') {
  return {
    type: SET_BACKGROUND,
    color,
  };
}

export function swapColors() {
  return {
    type: SWAP_COLORS,
  };
}

export function setColorBlind(blindness = 'common', setting) {
  return {
    type: SET_COLOR_BLIND,
    blindness,
    setting,
  };
}

export function setControlsShown(shown = false) {
  return {
    type: SET_CONTROLS_SHOWN,
    shown,
  };
}