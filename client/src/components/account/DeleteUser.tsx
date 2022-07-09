import axios, { AxiosResponse } from "axios";
import React, { MouseEvent, useState } from "react";


/**
 * DeleteUser deletes user from server using token
 */
const DeleteUser = () => {
    const TIMEOUT_MS: number = 3000; // wait for n millisecs
    const PROTOCOL: string = "http";
    const PATH: string = "deluser";

    // get username and server
    const username: string = sessionStorage.getItem("username") as string;
    const server: string = localStorage.getItem("server") as string;

    // displayed on error
    const [error_msg, set_error_msg] = useState("");



    // called when button is clicked
    const handle_delete = (e: MouseEvent) => {
        e.preventDefault(); // stop from reloading page

        // get token
        const token: string = sessionStorage.getItem("token") as string;


        // extract server_ip and server_port
        const server_ip: string = server.split(":")[0];
        const server_port: number = parseInt(server.split(":")[1]);

        // compile string
        const url: string = `${PROTOCOL}://${server_ip}:${server_port}/${PATH}`;

        // data
        const data = {token: token};


        // delete
        axios.delete(url, {
            data: JSON.stringify(data),
            timeout: TIMEOUT_MS
        })
        .then(res => {
            // delete data from storage
            sessionStorage.clear();
            localStorage.removeItem("currency"); // remove currency

            // go to welcome page
            window.location.href = "/welcome";
        })
        .catch(err => {
            const res = err.response as AxiosResponse; // get response

            // invalid token
            if (res.status === 403) {
                set_error_msg("Auth error, please log in again");
            }
            // internal server error
            else if (res.status === 500) {
                set_error_msg(res.data); // get error message from server
            }
        })
    }

    return (
        <div>
            <form>
                <h3>Do you really want to delete user {username}?</h3>
                <h3>All your payments will be lost...</h3>
                <button onClick={handle_delete}>Delete</button>
            </form>
            <h3>{error_msg}</h3>
        </div>
    )
}


export default DeleteUser;