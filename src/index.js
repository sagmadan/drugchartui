import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { MedicinesContextProvider } from './context/MedicineContext'
import { SchedulesContextProvider } from './context/ScheduleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MedicinesContextProvider>
        <SchedulesContextProvider>
          <App />
        </SchedulesContextProvider>
      </MedicinesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
