import React from "react";
import Collapse from "./Collapse";
import DeleteUser from "./DeleteUser";
import Login from "./Login";
import Logout from "./Logout";
import ServerSettings from "./ServerSettings";
import Signup from "./Signup";


/**
 * Account is used for: sign up, login/logout, deletion of user (contains all important account settings + server settings)
 */
const Account = () => {
    // get username from sessionStorage
    const username_session_storage = sessionStorage.getItem("username");
    let username: string = "";
    if (username_session_storage !== null) {
        username = username_session_storage;
    }

    // if user logged in: "Switch Account", else "Login"
    const login_switch_acount: string =  username.length === 0 ? "Login" : "Switch Account";

    return (
        <div className="Account">
            <h1>Account</h1>

            {/* inform if logged in */}
            {username.length > 0 &&
                <h3>Logged in as {username}</h3>
            }

            {/* handle sign up, only shown when logged out */}
            {username.length === 0 &&
                <Collapse title="Sign up"> 
                    <Signup />
                </Collapse>
            }

            {/* handle login / switch account (only if logged in) */}
            <Collapse title={login_switch_acount}>
                <Login />
            </Collapse>

            {/* handle logout, only shown when logged in */}
            {username.length > 0 &&
                <Collapse title="Logout">
                    <Logout />
                </Collapse>
            }

            {/* server settings */}
            <Collapse title="Server Settings">
                <ServerSettings />
            </Collapse>

            {/* handle user deletion, only shown when logged in */}
            {username.length > 0 &&
                <Collapse title="Delete User">
                    <DeleteUser />
                </Collapse>
            }

        </div>
    )
}

export default Account;