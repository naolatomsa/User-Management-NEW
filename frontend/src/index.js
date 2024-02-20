import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyComponent from './TokenRefresher';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App/>
      <MyComponent />
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();
