import {createStackNavigator} from '@react-navigation/stack';

import {AppStackParamList, Screens} from '@Orca/screens/screens';
import VesselScreen from '@Orca/screens/VesselScreen';

const NavigationStack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <NavigationStack.Navigator
      initialRouteName={Screens.VesselScreen}
      screenOptions={{headerShown: false}}
    >
      <NavigationStack.Screen
        name={Screens.VesselScreen}
        component={VesselScreen}
      />
    </NavigationStack.Navigator>
  );
};

export default AppStack;
