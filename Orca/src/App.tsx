import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {IntlProvider} from 'react-intl';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components/native';
import Mapbox from '@rnmapbox/maps';
import {LogBox} from 'react-native';

import AppStack from './appstack';
import {useLocaleStore} from './stores/useLocaleStore';
import theme from './themes/theme';
import {translations} from './translations';
import {env, isDevEnv, isIntEnv, isProdEnv} from './utils/env';

const queryClient = new QueryClient();
void Mapbox.setAccessToken(env.ORCA_MAPBOX_ACCESS_TOKEN);

/* custom log callback - it is required to avoid error popup on map. Currently, no other solution than this... */
Mapbox.Logger.setLogCallback(_event => {
  /*
     1. if return true, then the error will not be thrown
     2. we are returning isProdEnv/isIntEnv , since we want to stop the logger in prod environment, which will not throw the error to user
     */
  return isProdEnv || isIntEnv || isDevEnv;
});
/*
Prod environment:
Stops the shared instance logger such that the error (from Mapbox-Map) is not thrown

Dev environment | staging environment:
Logs the error (from Mapbox-Map) to the console if needed
*/
if (isProdEnv || isIntEnv || isDevEnv) {
  Mapbox.Logger.sharedInstance().stop();
}

LogBox.ignoreAllLogs(true);

function App(): React.JSX.Element {
  const language = useLocaleStore(state => state.language);
  return (
    <SafeAreaProvider>
      <IntlProvider messages={translations[language]} locale={language}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={{...theme}}>
            <StatusBar />
            <NavigationContainer>
              <AppStack />
            </NavigationContainer>
          </ThemeProvider>
        </QueryClientProvider>
      </IntlProvider>
    </SafeAreaProvider>
  );
}

export default App;
