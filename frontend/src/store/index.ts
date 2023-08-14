import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import game from './game';
import { RootState } from '../types';

export const store = configureStore<RootState>({
  reducer: {
    game,
  },
});

setupListeners(store.dispatch);