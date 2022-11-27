import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import IsHomeContextProvider from './contexts/IsHomeContext';
import ArticlesContextProvider from './contexts/ArticlesContext';
import PopupContextProvider from './contexts/PopupsContext';
import AuthContextProvider from './contexts/AuthContext';
import UserContextProvider from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <PopupContextProvider>
          <AuthContextProvider>
            <IsHomeContextProvider>
              <ArticlesContextProvider>
                <App />
              </ArticlesContextProvider>
            </IsHomeContextProvider>
          </AuthContextProvider>
        </PopupContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
