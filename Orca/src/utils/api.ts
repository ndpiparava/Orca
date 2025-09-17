// apiConfig.ts
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {env} from './env';

// Replace with your LAN IP (check `ipconfig` / `ifconfig`)
const LOCAL_IP = '192.168.0.101';
const LOCAL_PORT = 3000;

const isIOS = Platform.OS === 'ios';

export const getApiBaseUrl = async () => {
  const isEmulator = await DeviceInfo.isEmulator();
  if (isIOS) {
    return env.ORCA_VESSEL_API_URL;
  }

  //Only for Android emulator to resolve localhost
  if (Platform.OS === 'android') {
    return isEmulator ? 'http://10.0.2.2:3000' : env.ORCA_VESSEL_API_URL;
  }

  // fallback
  return `http://${LOCAL_IP}:${LOCAL_PORT}`;
};
