import { atom } from 'recoil';

export const backgroundColorState = atom({
  key: 'backgroundColorState',
  default: 'white',
});

export const textColorState = atom({
  key: 'textColorState',
  default: 'black',
})