import React from 'react';
import './Tabs.css';

/**
 * Tabs enables the user to switch between parts of the application, contains multiple Tablinks and one Account-Tablink
 */
const Tabs = () => {
    return (
        <div className="Tabs">
            <button className="Tablink" onClick={(event) => window.location.href = "/addpayments"}>Add Payments</button>
            <button className="Tablink" onClick={(event) => window.location.href = "/delpayments"}>Delete Payments</button>
            <button className="Tablink" onClick={(event) => window.location.href = "/payments"}>Payments</button>
            <button className="Account-Tablink" onClick={(event) => window.location.href = "/account"}>Account</button>
        </div>
    )
}

export default Tabs;