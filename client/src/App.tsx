import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// components
import Tabs from './components/tabs/Tabs';
import Welcome from './components/welcome/Welcome';
import Account from './components/account/Account';



// App contains all components: signup/login/delete user, add payment, delete payment, get/filter payments
function App() {

  // state to store server ip or hostname of server
  const [server, set_server] = useState("localhost:80"); // server: e.g. "192.168.1.1:80"


  // handle changes to server ip (Account->ServerSettings.tsx)
  const handle_server_change = (server_str: string) => {
    set_server(server_str); // set

    alert("server has been set to: "+ server_str);
  }


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
          <Route path="/" element={<Welcome/>}/> {/* some welcome page*/}
          <Route path="/addpayments" /> {/* add new payments */}
          <Route path="/delpayments" /> {/* delete payments */}
          <Route path="/payments" /> {/* get and filter payments */}
          <Route path="/account" element={<Account handle_server_change={ handle_server_change } 
          server_ip={server.split(":")[0]} 
          server_port={parseInt(server.split(":")[1])} />}/> {/* signup, login, delete user (account settings) */}

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
