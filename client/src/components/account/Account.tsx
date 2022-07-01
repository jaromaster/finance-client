import React from "react";
import Collapse from "./Collapse";
import Login from "./Login";
import ServerSettings from "./ServerSettings";
import Signup from "./Signup";


/**
 * Account is used for: sign up, login, deletion of user
 */
const Account = () => {
    // get username from sessionStorage
    const username_session_storage = sessionStorage.getItem("username");
    let username: string = "";
    if (username_session_storage !== null) {
        username = username_session_storage;
    }

    return (
        <div className="Account">
            <h1>Account</h1>
            {/* inform if logged in */}
            {username.length > 0 &&
                <h3>Logged in as {username}</h3>
            }
            

            {/* server settings */}
            <Collapse title="Server Settings">
                <ServerSettings />
            </Collapse>

            {/* handle sign up */}
            <Collapse title="Sign up"> 
                <Signup />
            </Collapse>

            {/* handle login */}
            <Collapse title="Login">
                <Login />
            </Collapse>

            {/* handle user deletion */}


        </div>
    )
}

export default Account;