import ColorType from './ColorType';
import FontSizeType from './FontSizeType';
import LineHeightSizeType from './LineHeightSizeType';
import 'styled-components';
import 'styled-components/native';

export type ThemeType = {
  colors: typeof ColorType;
  fonts: {
    size: typeof FontSizeType;
    lineHeight: typeof LineHeightSizeType;
  };
};

const theme: ThemeType = {
  colors: ColorType,
  fonts: {
    size: FontSizeType,
    lineHeight: LineHeightSizeType,
  },
};

export default theme;
