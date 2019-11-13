import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login/Login'
import * as serviceWorker from './serviceWorker';

import { firebaseApp } from './Firebase/firebase';

const renderLogin = () => {
  ReactDOM.render(<Login />, document.getElementById('root'));
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

firebaseApp
  .firestore()
  .enablePersistence({synchronizeTabs:true})
  .then(() => {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        renderApp()
      } else {
        renderLogin()
      }
  })
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
