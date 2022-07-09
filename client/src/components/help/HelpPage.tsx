import React from "react";
import "./HelpPage.css";


/**
 * HelpPage provides users with solutions / answers for common problems / questions
 */
const HelpPage = () => {
    return (
        <div className="Help">
            <h1>Help</h1>

            <h3>Logging in / Signing up</h3>
            <p className="Help-Text">
                To sign up, go to <a href="/account">Account</a> to view the settings.
                From there, go to "Login" or "Sign up" and enter your credentials.
                Make sure to use a secure password!
            </p>

            <h3>Server Settings</h3>
            <p className="Help-Text">
                To configure which server to connect to, go to <a href="/account">Account</a>.
                Go to "Server Settings" and set the IP and the port of your Finance Management server.
                Ask your server admin for more information.
            </p>

            <h3>Currency Settings</h3>
            <p className="Help-Text">
                You can find the currency settings under <a href="/account">Account</a>.
                Changing the currency only changes the way payments are displayed, not the underlying behaviour.
            </p>

            <h3>How to view payments</h3>
            <p className="Help-Text">
                Just go to <a href="/payments">My Payments</a>.
                Note: login or sign up to view your payments.
            </p>

            <h3>How to add new payments</h3>
            <p className="Help-Text">
                Go to <a href="/payments">My Payments</a>, 
                then click the + next to "Add new Payment".
                Note: login or sign up to add new payments.
            </p>

            <h3>View payment analytics</h3>
            <p className="Help-Text">
                To view payment statistics, go to <a href="/payments">My Payments</a>, 
                then click at the column names of the payment table.
                E.g. clicking "Amount" will show you analytics of payment amounts. 
                Make sure you add payments first as statistics will not be available otherwise.
            </p>

            <h3>Delete payments</h3>
            <p className="Help-Text">
                Just go to <a href="/payments">My Payments</a> to view your payments.
                Delete them by clicking the "X" symbol next to the payment you want to delete.
            </p>
        </div>
    )
}

export default HelpPage;