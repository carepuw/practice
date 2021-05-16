import React from 'react'
import { Switch, Route, useLocation } from "react-router-dom";

import Header from './components/header';
import Sidebar from './components/sidebar';

import Profile from './pages/profile';
import Friends from './pages/friends';
import Login from './pages/login';
import Users from './pages/users';
import Messages from './pages/messages';
import Dialog from './pages/dialog';

import { Container } from '@material-ui/core';

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    console.log('redirect to:', location.pathname);
  }, [location]);
  return location.pathname
}

const App: React.FC = () => {
  const location = usePageViews();

  return (
    <div className="app">
      <Container>
        <Header />
        <div className="flex flex-center">
          {Sidebar(location)}

          <Switch>
            <Route path="/login"><Login /></Route>
            <Route path="/users"><Users /></Route>
            <Route path="/messages"><Messages /></Route>
            <Route path="/dialog/id:dialogId"><Dialog /></Route>
            <Route path="/profile/id:profileId"><Profile /></Route>
            <Route path="/friends/id:profileId"><Friends /></Route>
          </Switch>
        </div>
        {/* {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />} */}
      </Container>
    </div>
  )
}

export default App
