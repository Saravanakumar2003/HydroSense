import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserRoute from './components/UserRoute';
import VerifyEmail from './pages/VerifyEmail';
import ForgetPassword from './pages/ForgetPassword';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage'; // Import the new HomePage component
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './firebase';
import { setUser } from './redux/actions';
import FullPageChart from './pages/FullPageChart';
import { SensorDataProvider } from './components/SensorDataContext';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <SensorDataProvider>
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/chart" component={FullPageChart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/verify-email" component={VerifyEmail} />
          <Route path="/forget-password" component={ForgetPassword} />
        </Switch>
      </div>
    </BrowserRouter>
  </SensorDataProvider>
  );
};

export default App;