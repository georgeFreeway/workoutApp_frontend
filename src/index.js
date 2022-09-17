import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//contexts
import { DataContextWrapper } from './context/dataContext';
import { AuthContextWrapper } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextWrapper>
      <DataContextWrapper>
        <App />
      </DataContextWrapper>
    </AuthContextWrapper>
  </React.StrictMode>
);

