import React from 'react';
import {IntlProvider} from 'react-intl';
import {ThemeProvider} from 'styled-components/native';

import theme from '@Orca/themes/theme';

import {translations} from '../../translations';
type PropsType = {
  children?: React.ReactNode;
};

const MockAppContainer = ({children}: PropsType) => {
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider messages={translations.en} locale={'en'}>
        {children}
      </IntlProvider>
    </ThemeProvider>
  );
};

export default MockAppContainer;
