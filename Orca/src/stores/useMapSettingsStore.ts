import {create} from 'zustand';

type MapSettingsStore = {
  minZoom: number;
  decreaseMinZoomLevel: () => void;
  increaseMinZoomLevel: () => void;
};

const useMapSettingsStore = create<MapSettingsStore>((set, get) => ({
  minZoom: 12,
  increaseMinZoomLevel: () => set(state => ({minZoom: state.minZoom + 1})),
  decreaseMinZoomLevel: () => set(state => ({minZoom: state.minZoom - 1})),
}));

export default useMapSettingsStore;
