import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Dashboard from './pages/Dashboard';
import ExpenseTracker from './pages/ExpenseTracker';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import PrivateRoute from './components/PrivateRoute';
import AuthListener from './components/AuthListener';
import './styles.css'
function App() {

  return (
    <Provider store={store}>
        <AuthListener />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/tracker" element={
            <PrivateRoute>
              <>
                <LogoutButton />
                <ExpenseTracker />
              </>
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
