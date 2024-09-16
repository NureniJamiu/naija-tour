// app/providers.js
"use client";

import { PreferencesProvider } from '@/context/preferencesContext';
import store from '@/redux/store';
import { Provider as ReduxProvider } from 'react-redux';

export function Providers({ children }) {
  return (
    <ReduxProvider store={store}>
      <PreferencesProvider>
        {children}
      </PreferencesProvider>
    </ReduxProvider>
  );
}
