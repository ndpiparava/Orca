jest.mock('@react-navigation/native', () => {
  const {useEffect} = require('react');
  const actualNav = jest.requireActual('@react-navigation/native');

  const navigate = jest.fn();
  const goBack = jest.fn();
  const dispatch = jest.fn();
  const getState = jest.fn();
  const useRoute = jest.fn();
  const setOptions = jest.fn();

  return {
    ...actualNav,
    useNavigation: () => ({
      navigate,
      dispatch,
      goBack,
      getState,
      setOptions,
    }),
    useIsFocused: () => true,
    useFocusEffect: useEffect,
    useRoute,
  };
});

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.InteractionManager = {
    runAfterInteractions: (f: () => void) => {
      f();
    },
  };

  return RN;
});

jest.mock('react-native-orientation-locker', () => ({
  useOrientationChange: jest.fn(),
  PORTRAIT: 'PORTRAIT',
  LANDSCAPE: 'LANDSCAPE',
}));
