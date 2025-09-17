
import { create } from 'zustand';

type Toast = { id: number; message: string };

type ToastState = {
  queue: Toast[];
  visible: Toast | null;
  showToast: (message: string) => void;
  popToast: () => void;
};

const TOAST_DISPLAY_TIME = 3000; 
export const useToastStore = create<ToastState>((set, get) => ({
  queue: [],
  visible: null,

  showToast: (message) => {
    const newToast = { id: Date.now(), message };
    const { visible } = get();
    // For now keep only one toast visible at a time 
    set((state) => ({ queue: [newToast] }));
    if (!visible) {
      get().popToast();
    }
  },

  popToast: () => {
    const { queue } = get();
    if (queue.length === 0) {
      set({ visible: null });
      return;
    }

    const [next, ...rest] = queue;
    set({ visible: next, queue: rest });

    setTimeout(() => {
      set({ visible: null });
      get().popToast();
    }, TOAST_DISPLAY_TIME);
  },
}));
