import React, { MouseEvent } from "react";


/**
 * Logout allows logged in users to log out by deleting all their session data
 * 
 */
const Logout = () => {
    // get name of logged in user
    let username: string = "";
    if (sessionStorage.getItem("username") !== null) {
        username = sessionStorage.getItem("username") as string;
    }

    // handle click on logout button
    const handle_logout = (e: MouseEvent) => {
        sessionStorage.clear(); // delete jwt and username from session storage

        window.location.reload(); // reload page
    }


    return (
        <div className="Logout">
            <h3>You are logged in as {username}. Do you want to log out?</h3>
            <button onClick={handle_logout}>Logout</button>
        </div>
    )
}

export default Logout;