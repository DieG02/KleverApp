import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function AvatarSVG(props: SvgProps) {
  return (
    <Svg viewBox='0 0 48 48' {...props}>
      <Path
        d='M27.294 26.888c-.149-.049-1.091-.474-.502-2.264h-.009c1.536-1.581 2.709-4.126 2.709-6.631 0-3.852-2.561-5.872-5.538-5.872-2.98 0-5.527 2.019-5.527 5.872 0 2.515 1.167 5.07 2.712 6.648.602 1.58-.475 2.165-.7 2.247-2.099.679-7.808 4.063-7.718 8.99h22.558c.1-4.707-4.416-7.764-7.985-8.99zM46 24a22 22 0 01-22 22A22 22 0 012 24 22 22 0 0124 2a22 22 0 0122 22z'
        fill='#4d4d4d'
      />
    </Svg>
  );
}

export default AvatarSVG;
