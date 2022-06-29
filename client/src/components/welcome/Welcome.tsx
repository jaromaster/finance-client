import React from 'react';

/**
 * Welcome is the welcome page shown on startup
 */
const Welcome = () => {
    // get username of logged in / signed in user
    let username = sessionStorage.getItem("username");


    // user not signed in
    if (username === null) {
        return (
            <div className="Welcome">
                <h1>Welcome to Finance Manager!</h1>
                <h3>Please go to <a href="/account">Account</a> to sign up or log in!</h3>
            </div>
        )
    }

    // user signed in
    return (
        <div className="Welcome">
            <h1>{username}, welcome back to Finance Manager!</h1>
            <h3>Go to <a href="/help">Help</a> for more information about using this software</h3>
        </div>
    )
}

export default Welcome;