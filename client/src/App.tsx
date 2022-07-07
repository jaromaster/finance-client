import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// components
import Tabs from './components/tabs/Tabs';
import Welcome from './components/welcome/Welcome';
import Account from './components/account/Account';
import AddPayments from './components/addpayments/AddPayments';
import Payments from './components/payments/Payments';



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
          <Route path="/" element={<Welcome/>}/> {/* some welcome page */}
          <Route path="/welcome" element={<Welcome/>}/> {/* some welcome page */}
          <Route path="/help" /> {/* help page */}
          <Route path="/addpayments" element={<AddPayments />}/> {/* add new payments */}
          <Route path="/payments" element={<Payments />} /> {/* get and filter payments */}
          <Route path="/account" element={<Account />}/> {/* signup, login, delete user (account settings) */}

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
