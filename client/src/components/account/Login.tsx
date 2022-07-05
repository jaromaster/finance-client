import axios, { AxiosResponse } from "axios";
import React, { MouseEvent, useState } from "react";
import "./Login.css";


/**
 * LoginRequestData sets the structure of login data 
 */
interface LoginRequestData {
    username: string
    password: string
}


/**
 * Login allows users to login using username and password
 */
const Login = () => {
    // constants
    const IP_PORT_NOT_SET_MSG: string = "No server IP and port set! Please go to 'Server Settings' to set them there!"; // error message
    const INVALID_LOGIN_MSG: string = "Username or password incorrect!" // error message
    const USERNAME_EMPTY_MSG: string = "Username must not be empty!"; // error message
    const PASSWD_EMPTY_MSG: string = "Password must not be empty!"; // error message
    const UNKNOWN_ERROR_MSG: string = "Some server-side error occurred, please try again!"; // error message
    const UNSET_IP: string = ""; // used to check if ip was not set
    const UNSET_PORT: number = -1; // used to check if port was not set
    const PATH: string = "login";
    const PROTOCOL: string = "http";
    const TIMEOUT_MS: number = 3000;

    // get username if user logged in to fill in form
    const session_storage_username: string | null  = sessionStorage.getItem("username");
    let username_logged_in: string = "";
    if (session_storage_username !== null) {
        username_logged_in = session_storage_username;
    }

    // error message displayed in text field
    const [error_message, set_error_message] = useState("");

    // username and password (user input)
    const [username, set_username] = useState(username_logged_in);
    const [password, set_password] = useState("");

    // server ip and port 
    let server_ip: string = UNSET_IP;
    let server_port: number = UNSET_PORT;

    // get server information (stored in localStorage), syntax: "IP:PORT"
    const server: string | null = localStorage.getItem("server");

    // check if server not null (in localStorage), then extract values from localStorage
    if (server !== null) {
        // set server ip and port
        server_ip = server.split(":")[0]; // first part
        server_port = parseInt(server.split(":")[1]); // second part
    }

    // submit action (submit button clicked)
    const handle_submit = async (e: MouseEvent) => {
        e.preventDefault();

        // invalid ip (was not set)
        if (server_ip === UNSET_IP || server_port === UNSET_PORT) {
            alert(IP_PORT_NOT_SET_MSG);
            return;
        }

        // check username empty
        if (username.length === 0) {
            set_error_message(USERNAME_EMPTY_MSG);
            return;
        }

        // check password empty
        if (password.length === 0) {
            set_error_message(PASSWD_EMPTY_MSG);
            return;
        }


        // compile data
        const data: LoginRequestData = {username: username, password: password};

        // build url
        const url: string = `${PROTOCOL}://${server_ip}:${server_port}/${PATH}`;

        try {
            // send username and password to server, get token in return
            const res: AxiosResponse<any, any> = await axios.post(url, data, {
                timeout: TIMEOUT_MS
            });

            const token = res.data; // get token 
            sessionStorage.setItem("token", token); // store jwt for auth
            sessionStorage.setItem("username", username); // store username

            // go to welcome page
            window.location.href = "/welcome";
        }
        catch (error: any) {
            const res = error.response as AxiosResponse; // get response

            // error 403 Forbidden
            if (res.status === 403) {
                set_error_message(INVALID_LOGIN_MSG);
            }
            // other error e.g. Internal Server Error
            else if (res.status !== 200) {
                set_error_message(UNKNOWN_ERROR_MSG);
            }
        }
    }


    return (
        <div className="Login">
            <form>
                <table className="Login-Form-Table">
                    <tbody>
                        <tr>
                            <th><label>Username</label></th>
                            <th><input type="text" onChange={e => set_username(e.target.value)} defaultValue={username_logged_in} required/></th>
                        </tr>
                        <tr>
                            <th><label>Password</label></th>
                            <th><input type="password" onChange={e => set_password(e.target.value)} required/></th>
                        </tr>
                        <tr>
                            <th></th>
                            <th><button type="submit" className="Login-Submit-Button" onClick={handle_submit}>Login</button></th>
                        </tr>
                        <tr>
                            <th colSpan={2} className="Login-Error-Text-Field">{error_message}</th>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Login;