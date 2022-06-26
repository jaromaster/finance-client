import React from "react";
import Collapse from "./Collapse";
import Signup from "./Signup";


/**
 * Account is used for: sign up, login, deletion of user
 */
const Account = () => {
    return (
        <div className="Account">
            <h1>Account</h1>

            {/* handle sign up */}
            <Collapse title="Sign up"> 
                <Signup />
            </Collapse>


            {/* handle login */}
            {/* handle user deletion */}


        </div>
    )
}

export default Account;