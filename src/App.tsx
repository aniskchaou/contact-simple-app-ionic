import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import React, { useEffect, useState } from 'react';
import Register from './pages/Register';
import { getCurrentUser } from './firebaseConfig';
import Dashboard from './pages/Dashboard';
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/actions';
import UpdateProfile from './pages/UpdateProfile';

const App: React.FC = () => {

  const [busy, setBusy] = useState(true)
  const dispatch = useDispatch()

  //routes
  const RoutingSystem: React.FC = () => {
    return (
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/update">
            <UpdateProfile />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    );
  }

  //launch the application
  useEffect(() => {

    getCurrentUser().then((user: any) => {
      if (user) {
        dispatch(setUserState(user.email))
        window.history.replaceState({}, '', '/dashboard')
      } else {
        window.history.replaceState({}, '', '/')
      }
      setBusy(false)
    })
  })
  return (<IonApp>
    {busy ? <IonSpinner /> : <RoutingSystem />}
  </IonApp>);
}



export default App;
