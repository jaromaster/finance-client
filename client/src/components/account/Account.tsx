import React from "react";
import Collapse from "./Collapse";
import ServerSettings from "./ServerSettings";
import Signup from "./Signup";

/**
 * AccountProps is used for typing in props of Account
 */
interface AccountProps {
    handle_server_change: Function
    server_ip: string
    server_port: number
}


/**
 * Account is used for: sign up, login, deletion of user
 */
const Account = ({handle_server_change, server_ip, server_port}: AccountProps) => {

    return (
        <div className="Account">
            <h1>Account</h1>

            {/* server settings */}
            <Collapse title="Server Settings">
                <ServerSettings handle_server_change={handle_server_change} server_ip={server_ip} server_port={server_port}/>
            </Collapse>

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