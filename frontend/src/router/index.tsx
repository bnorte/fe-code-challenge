import { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Loading from '@/components/Loading';
import ProfileView from '@/components/ProfileView';
import SymbolsView from '@/components/SymbolsView';
import StatementsView from '@/components/StatementsView';

const Router = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<Loading />}>
            <SymbolsView />
          </Suspense>
        }
      />
      <Route
        index
        path="profile"
        element={
          <Suspense fallback={<Loading />}>
            <ProfileView />
          </Suspense>
        }
      />
      <Route
        index
        path="statements"
        element={
          <Suspense fallback={<Loading />}>
            <StatementsView />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
