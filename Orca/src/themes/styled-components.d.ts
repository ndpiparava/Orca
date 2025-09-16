import 'styled-components/native';
import {ThemeType} from './theme.ts';

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}
