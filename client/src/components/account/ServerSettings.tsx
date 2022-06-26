import React, { KeyboardEvent, MouseEvent } from "react";
import "./ServerSettings.css";


/**
 * ServerSettingsProps is used for typing in props
 */
interface ServerSettingsProps {
    handle_server_change: Function
    server_ip: string
    server_port: number
}


/**
 * ServerSettings is used to configure the server that provides the rest api
 */
const ServerSettings = ({ handle_server_change, server_ip, server_port }: ServerSettingsProps) => {
    // store hostname and port, changed by text input field (onChange)
    let ip: string = server_ip; // default "localhost"
    let port: number = server_port; // default 80

    // valid range of port
    const MAX_PORT: number = 65535;
    const MIN_PORT: number = 0;

    // regex for checking ip
    const IP_REGEX: string = "^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$";

    // handle submit
    const handle_submit = (e: MouseEvent, server_ip: string, server_port: number ) => {
        e.preventDefault();
        

        // check if ip valid (syntax)
        if(!new RegExp(IP_REGEX).test(server_ip) && server_ip !== "localhost") {
            alert("IP is invalid (syntax)");
            return;
            // TODO: error message + color input field
        }


        // check port valid (number, in range)
        if (server_port > MAX_PORT || server_port < MIN_PORT) {
            alert("Server Port needs to be between " + MAX_PORT + " and " + MIN_PORT + " (inc.)");
            return;

            // TODO: error message + color input field
        }



        const combined = server_ip + ":" + server_port; // e.g. 192.168.1.1:80
        handle_server_change(combined); // pass up to App to use globally
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
                        <th><input id="ip_input" type="text" onChange={(e) => ip = e.target.value} defaultValue={server_ip} required></input></th>
                    </tr>
                    <tr>
                        <th><label>Server Port</label></th>
                        <th><input type="number" min={MIN_PORT} max={MAX_PORT} 
                        onChange={(e) => port = parseInt(e.target.value)} 
                        onKeyPress={handle_port_input} 
                        defaultValue={server_port} 
                        onPaste={e=>e.preventDefault()}
                        required></input></th>
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