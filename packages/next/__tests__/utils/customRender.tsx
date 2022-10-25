import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { PreloadedState } from '@reduxjs/toolkit';
import { AppStore, RootState, setupStore } from '@ct-ordo-realitas/app/redux/reducers';
import BattlefieldProvider from '../../contexts/battlefield';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export default function customRender(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<Record<string, unknown>>): JSX.Element {
    return (
      <BattlefieldProvider>
        <Provider store={store}>{children}</Provider>
      </BattlefieldProvider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
