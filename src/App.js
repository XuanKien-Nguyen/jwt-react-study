import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import AuthService  from './services/auth.service';

import EventBus from "./common/EventBus";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
  }, []);

  return (
    <div>
      <h1>ABC</h1>
    </div>
  );
}

export default App;
