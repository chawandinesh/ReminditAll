import React from 'react';
import AppRoutes from './src/routes/AppRoutes';
import {Context} from './src/context/context';

export default function App() {
  return (
    <Context>
      <AppRoutes />
    </Context>
  );
}
