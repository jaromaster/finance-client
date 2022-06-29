import React, { MouseEvent } from "react";
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
    const FIELD_EMPTY: string = "Username, Password, and repeated Password must not be empty!"; // error message
    const UNSET_IP: string = ""; // used to check if ip was not set
    const UNSET_PORT: number = -1; // used to check if port was not set
    const METHOD: string = "POST"; // used method
    const METHOD_PATH: string = "/signup"; // route used for rest api: e.g. 192.168.1.1:80/signup 


    // get server information (stored in localStorage)
    const server: string | null = localStorage.getItem("server");

    // server ip and port 
    let server_ip: string = UNSET_IP;
    let server_port: number = UNSET_PORT;

    // user input
    let username: string = "";
    let password: string = "";
    let password_check: string = "";


    // check if server not null (in localStorage), then extract values from localStorage
    if (server !== null) {
        // set server ip and port
        server_ip = server.split(":")[0]; // first part
        server_port = parseInt(server.split(":")[1]); // second part
    }

    // on submit
    const handle_submit = (e: MouseEvent)=>{
        e.preventDefault();

        // invalid ip (was not set)
        if (server_ip === UNSET_IP || server_port === UNSET_PORT) {
            alert(IP_PORT_NOT_SET_MSG);
            return;
        }

        // field is empty
        if (username === "" || password === "" || password_check === "") {
            alert(FIELD_EMPTY);
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
        const url: string = `http://${server_ip}:${server_port}${METHOD_PATH}`; // server_ip:server_port/METHOD_PATH

        // send data to server
        fetch(url, {
            method: METHOD,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            // Internal Server Error (e.g. user already exists)
            if (res.status === 500) {
                // get text of response
                res.text().then((txt) => {
                    alert("Error when signing up: " + txt); // handle error messages
                })
                return "";
            }

            // ok
            return res.text();
        })
        .then(data => {
            if (data === "" ) return; // error, already handled above
            localStorage.setItem("token", data); // success, store jwt in localStorage

            // TODO: show user that sign up was successful
            localStorage.setItem("username", username); // store username to display later

            // go to welcome page
            window.location.href = "/welcome";

        })
        .catch(err => alert("Error: " + err));
    }


    return (
        <div className="Signup">
            <form>
                <table className="Signup-Form-Table">
                    <tr>
                        <th><label>Username</label></th>
                        <th><input type="text" onChange={e => username = e.target.value} required></input></th>
                    </tr>
                    <tr>
                        <th><label>Password</label></th>
                        <th><input type="password" onChange={e => password = e.target.value} required></input></th>
                    </tr>
                    <tr>
                        <th><label>Repeat Password</label></th>
                        <th><input type="password" onChange={e => password_check = e.target.value} required></input></th>
                    </tr>
                    <tr>
                        <th></th>
                        <th><button type="submit" className="Signup-Submit-Button" onClick={(e)=>handle_submit(e)}>Sign up</button></th>
                    </tr>
                </table>
            </form>
        </div>
    )
}

export default Signup;