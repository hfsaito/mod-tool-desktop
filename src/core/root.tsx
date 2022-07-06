import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from '@components';
import { HomePage, NotFoundPage } from '@pages';
import { gankListStore, StoreProvider } from '@stores';

export const Root: React.FC = () => (
  <StoreProvider stores={[gankListStore]}>
    <GlobalStyle />
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  </StoreProvider>
);
