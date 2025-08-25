import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function FacebookSVG(props: SvgProps) {
  return (
    <Svg width={26} height={25} viewBox='0 0 26 25' fill='none' {...props}>
      <Path
        d='M25.216 12.576C25.216 5.631 19.62 0 12.716 0 5.813 0 .216 5.63.216 12.576c0 6.278 4.571 11.48 10.547 12.424v-8.788H7.589v-3.636h3.174v-2.77c0-3.152 1.866-4.893 4.721-4.893 1.368 0 2.798.245 2.798.245v3.095h-1.576c-1.553 0-2.037.97-2.037 1.964v2.36h3.467l-.554 3.635h-2.913V25c5.976-.944 10.547-6.146 10.547-12.424z'
        fill='#1877F2'
      />
    </Svg>
  );
}

export default FacebookSVG;
