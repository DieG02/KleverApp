export enum Colors {
  Primary = '#4378FE',
  Light = '#F1F8FF',

  Danger = '#F35F5F',
  Pastel = '#FFEBEB',

  Gold = '#FFAB49',
  Amber = '#FFEDDA',

  Forest = '#34C760',
  Tea = '#E3FFE1',

  Text = '#444444',
  Label = '#666666',
  Background = '#FAFAFA',
  Placeholder = '#858585',

  White = '#FFFFFF',
  Black = '#252525',
}

export enum Poppins {
  Regular = 'Poppins-Regular',
  Medium = 'Poppins-Medium',
  Semibold = 'Poppins-SemiBold',
  Bold = 'Poppins-Bold',
}

export type FontFamily = keyof typeof Poppins;
export type ColorPalette = keyof typeof Colors;
