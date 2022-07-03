import React, { useState } from "react";
import { fetch_timeout, PaymentInterface, PleaseCheckServer, PleaseLogin } from "../../helper_funcs/helper";
import SinglePayment from "./SinglePayment";
import "./PaymentManipulation.css";
import PaymentTableHeader from "./PaymentTableHeader";


/**
 * get_payments fetches all payments of user from server
 * 
 * @param url 
 * @param token 
 * @returns Promise<payments> (json)
 */
const get_payments = async (url: string, token: string): Promise<PaymentInterface[] | null>  => {
    const body = {token: token};
    const TIMEOUT_MS: number = 2000; 

    // fetch data from server
    try {
        const res = await fetch_timeout(url, {
            method: "POST",
            body: JSON.stringify(body),
        }, TIMEOUT_MS);


        // ok, return as json
        if (res.status === 200) {
            const json_data = await res.json();

            let payments: PaymentInterface[] = [];
            for (let i = 0; i < json_data.length; i++) {
                const payment = json_data[i] as PaymentInterface;
                
                payments.push(payment);
            }

            return payments;
        }

    // exception
    } catch (error) {
        return null;
    }
    
    // not ok
    return null;
}

/**
 * PaymentManipulation allows operations on payments: get, delete (add might be added in future)
 */
const PaymentManipulation = () => {
    const UNKNOWN_ERROR: string = "Some network error occurred"; // error message
    const UNSET_IP: string = ""; // used to check if ip was not set
    const UNSET_PORT: number = -1; // used to check if port was not set
    const PROTOCOL: string = "http";
    const PATH: string = "payments"


    // store payments as array 
    const [payments, set_payments] = useState(Array<PaymentInterface>);

    // stores error messages
    const [error_message, set_error_message] = useState("");

    // get token
    const token: string | null = sessionStorage.getItem("token");

    // token does not exist
    if (token === null) {
        return <PleaseLogin/>
    }

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

    // build url
    const url: string = `${PROTOCOL}://${server_ip}:${server_port}/${PATH}`;

    // on load: get payments of user
    get_payments(url, token as string)
    .then(val => {
        // some error, inform user
        if (val === null) {
            set_error_message(UNKNOWN_ERROR);
            return;
        }

        set_payments(val as PaymentInterface[]); // update payments
    })


    // something went wrong, display error message
    if(error_message.length > 0) {
        return (
            <div>
                <h3>{error_message}</h3>
                <PleaseCheckServer />
            </div>
        )
    }


    return (
        <div>
            <table className="Payment-Man-Table">
                <tbody>
                    {/* table header (column names) */}
                    <PaymentTableHeader />
                    
                    {/* display each payment as SinglePayment */}
                    {
                        payments.map((val, idx) => <SinglePayment key={idx} payment={val} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PaymentManipulation;