import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// components
import Tabs from './components/tabs/Tabs';

// App contains all components: signup/login/delete user, add payment, delete payment, get/filter payments
function App() {
  return (
    <div className="App">
      
      {/* Tabs */}
      <header className="App-header">
        <Tabs/>
      </header>
      
      {/* Main Components / Body */}
      {/* Routing */}
      <BrowserRouter>
        <Routes>
          {/* See:  https://www.w3schools.com/react/react_router.asp */}
          <Route path="/" /> {/* some welcome page*/}
          <Route path="/addpayments" /> {/* add new payments */}
          <Route path="/delpayments" /> {/* delete payments */}
          <Route path="/payments" /> {/* get and filter payments */}
          <Route path="/account" /> {/* signup, login, delete user (account settings) */}

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
