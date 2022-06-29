import React, { KeyboardEvent, MouseEvent } from "react";
import "./ServerSettings.css";


/**
 * ServerSettings is used to configure the server that provides the rest api
 */
const ServerSettings = () => {
    // default values (user input)
    const DEFAULT_IP: string = "127.0.0.1";
    const DEFAULT_PORT: number = 80;

    // valid range of port
    const MAX_PORT: number = 65535;
    const MIN_PORT: number = 0;

    // regex for checking ip
    const IP_REGEX: string = "^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]).){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$";
    

    // HANDLE TARGET SERVER IP AND PORT
    // get server ip and port from localStorage
    const localStorage_server = localStorage.getItem("server");

    // store ip and port, changed by text input field (onChange)
    let ip: string = DEFAULT_IP; 
    let port: number = DEFAULT_PORT;

    // check if server already in local storage, then overwrite
    if (localStorage_server !== null && localStorage_server?.split(":").length === 2) {
        ip = localStorage_server.split(":")[0]; // first part 
        port = parseInt(localStorage_server.split(":")[1]); // second part
    }

    
    // handle submit
    const handle_submit = (e: MouseEvent, server_ip: string, server_port: number ) => {
        e.preventDefault();

        // check if ip valid (syntax) + allow "localhost"
        if(!new RegExp(IP_REGEX).test(server_ip) && server_ip !== "localhost") {
            alert("IP is invalid (syntax)");
            return;
        }


        // check port valid (number, in range)
        if (server_port > MAX_PORT || server_port < MIN_PORT) {
            alert("Server Port needs to be between " + MAX_PORT + " and " + MIN_PORT + " (inc.)");
            return;
        }


        const combined = server_ip + ":" + server_port; // e.g. 192.168.1.1:80
        localStorage.setItem("server", combined); // store in browser storage
    }

    // only allow numeric input for port
    const handle_port_input = (e: KeyboardEvent) => {
        // valid characters
        const valid = new Set<string>(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

        if (!valid.has(e.key)){
            e.preventDefault(); // key gets dropped if not valid
        }
    }


    return (
        <div className="ServerSettings">
            <form>
                <table className="ServerSettings-Table">
                    <tr>
                        <th><label>Server IP</label></th>
                        <th><input id="ip_input" type="text" onChange={(e) => ip = e.target.value} defaultValue={ip} required></input></th>
                    </tr>
                    <tr>
                        <th><label>Server Port</label></th>
                        <th>
                            <input type="number" id="ip_input" min={MIN_PORT} max={MAX_PORT} 
                            onChange={(e) => port = parseInt(e.target.value)} 
                            onKeyPress={handle_port_input} 
                            defaultValue={port} 
                            onPaste={e=>e.preventDefault()}
                            required></input>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th><button type="submit" className="ServerSettings-Submit-Button" onClick={(e)=> handle_submit(e, ip, port)}>Save</button></th>
                    </tr>
                </table>
            </form>
        </div>
    )
}

export default ServerSettings;