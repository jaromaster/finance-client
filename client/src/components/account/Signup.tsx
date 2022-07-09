import axios, { AxiosResponse } from "axios";
import React, { MouseEvent, useState } from "react";
import "./Signup.css";

/**
 * SignupRequestData defines keys the objects sent to server
 */
interface SignupRequestData {
    username: string,
    password: string
}


/**
 * Signup is used for signing in new users
 */
const Signup = () => {
    // constants
    const IP_PORT_NOT_SET_MSG: string = "No server IP and port set! Please go to 'Server Settings' to set them there!"; // error message
    const PASSWORDS_NOT_MATCH_MSG: string = "Passwords do not match!"; // error message
    const FIELD_EMPTY_MSG: string = "Username, Password, and repeated Password must not be empty!"; // error message
    const UNSET_IP: string = ""; // used to check if ip was not set
    const UNSET_PORT: number = -1; // used to check if port was not set
    const PATH: string = "signup"; // route used for rest api: e.g. 192.168.1.1:80/signup 
    const TIMEOUT_MS: number = 3000; // milliseconds


    // get server information (stored in localStorage)
    const server: string | null = localStorage.getItem("server");

    // get username if user logged in to fill in form
    const session_storage_username: string | null  = sessionStorage.getItem("username");
    let username_logged_in: string = "";
    if (session_storage_username !== null) {
        username_logged_in = session_storage_username;
    }

    // server ip and port 
    let server_ip: string = UNSET_IP;
    let server_port: number = UNSET_PORT;

    // user input
    const [username, set_username] = useState(username_logged_in);
    const [password, set_password] = useState("");
    const [password_check, set_password_check] = useState("");

    // error message is displayed on every error
    const [error_message, set_error_message] = useState("");

    // check if server not null (in localStorage), then extract values from localStorage
    if (server !== null) {
        // set server ip and port
        server_ip = server.split(":")[0]; // first part
        server_port = parseInt(server.split(":")[1]); // second part
    }

    // on submit
    const handle_submit = async (e: MouseEvent)=>{
        e.preventDefault();

        // invalid ip (was not set)
        if (server_ip === UNSET_IP || server_port === UNSET_PORT) {
            alert(IP_PORT_NOT_SET_MSG);
            return;
        }

        // field is empty
        if (username === "" || password === "" || password_check === "") {
            alert(FIELD_EMPTY_MSG);
            return;
        }

        // check if passwords are same
        if (password !== password_check) {
            alert(PASSWORDS_NOT_MATCH_MSG);
            return;
        }

        // compile to single object
        const data: SignupRequestData = {
            username: username,
            password: password
        }

        // compile url
        const url: string = `http://${server_ip}:${server_port}/${PATH}`; // server_ip:server_port/METHOD_PATH

        try{
            // send username and password to sign up, on success: get token for auth
            const res = await axios.post(url, data, {
                timeout: TIMEOUT_MS
            });

            // ok
            const token = res.data; // get token
            sessionStorage.setItem("token", token); // success, store jwt in sessionStorage
            sessionStorage.setItem("username", username); // store username to display later
            localStorage.setItem("currency", "$"); // set currency to dollar (default value)

            // go to welcome page
            window.location.href = "/welcome";
        }
        catch(error: any) {
            const res = error.response as AxiosResponse; // get response from error

            // Internal Server Error (e.g. user already exists)
            if (res.status === 500) {
                // get text of response (error message from server)
                set_error_message(res.data);
            }
            else {
                // handle other errors
                const error_msg: string = `Connection to server ${server_ip}:${server_port} was aborted. Please make sure that IP and port are correct`;
                set_error_message(error_msg);
            }
        }
    }


    return (
        <div className="Signup">
            <form>
                <table className="Signup-Form-Table">
                    <tr>
                        <th><label>Username</label></th>
                        <th><input type="text" onChange={e => set_username(e.target.value)} defaultValue={username_logged_in} required></input></th>
                    </tr>
                    <tr>
                        <th><label>Password</label></th>
                        <th><input type="password" onChange={e => set_password(e.target.value)} required></input></th>
                    </tr>
                    <tr>
                        <th><label>Repeat Password</label></th>
                        <th><input type="password" onChange={e => set_password_check(e.target.value)} required></input></th>
                    </tr>
                    <tr>
                        <th></th>
                        <th><button type="submit" className="Signup-Submit-Button" onClick={(e)=>handle_submit(e)}>Sign up</button></th>
                    </tr>
                    <tr>
                        <th colSpan={2} className="Signup-Error-Text-Field">{error_message}</th>
                    </tr>
                </table>
            </form>
        </div>
    )
}

export default Signup;