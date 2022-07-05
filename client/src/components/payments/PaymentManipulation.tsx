import React, { useEffect, useState } from "react";
import { PaymentInterface, PleaseCheckServer, PleaseLogin } from "../../helper_funcs/helper";
import SinglePayment from "./SinglePayment";
import "./PaymentManipulation.css";
import PaymentTableHeader from "./PaymentTableHeader";
import axios from "axios";


/**
 * get_payments fetches all payments of user from server
 * 
 * @param url 
 * @param token 
 * @returns Promise<payments> (json) or Promise<string> error message
 */
const get_payments = async (url: string, token: string): Promise<PaymentInterface[] | string>  => {
    const body = {token: token};
    const TIMEOUT_MS: number = 2000; 

    // fetch data from server
    try {
        const res = await axios.post(url, body,{
            timeout: TIMEOUT_MS
        });

        // token invalid -> auth failed
        if (res.status === 403) {
            return "Auth error, token seems to be invalid";
        }

        // ok -> return as json
        if (res.status === 200) {
            const json_data = res.data;

            let payments: PaymentInterface[] = [];
            for (let i = 0; i < json_data.length; i++) {
                const payment = json_data[i] as PaymentInterface;
                
                payments.push(payment);
            }

            return payments;
        }

    // exception
    } catch (error) {
        return "Network error, server not found";
    }
    
    // not ok
    return "Some error occurred, please try again later";
}


/**
 * PaymentManipulation allows operations on payments: get, delete (add might be added in future)
 */
const PaymentManipulation = () => {
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

    // run only once
    useEffect(()=>{

        // build url
        const url: string = `${PROTOCOL}://${server_ip}:${server_port}/${PATH}`;

        // on load: get payments of user
        get_payments(url, token as string)
        .then(val => {
            // some error, inform user
            if (typeof val === "string") {
                set_error_message(val);
                return;
            }

            set_payments(val as PaymentInterface[]); // update payments
        })

    }, [server_ip, server_port, token])

    // token does not exist
    if (token === null) {
        return <PleaseLogin/>
    }

    // something went wrong, display error message
    if(error_message.length > 0) {
        return (
            <div>
                <h3>{error_message}</h3>
                <PleaseCheckServer />
            </div>
        )
    }

    // called when payment is deleted by SinglePayment (user clicks)
    // re-render all payments
    const delete_hook = (payment_id: number) => {
        let payments_copy = [...payments];
        for (let i = 0; i < payments_copy.length; i++) {
            const element = payments_copy[i];
            
            // remove payment with id
            if (element.id === payment_id) {
                payments_copy.splice(i, 1);
            }
        }

        // update payments
        set_payments(payments_copy);
    }


    // no payments yet
    if (payments.length === 0) {
        return (
            <div>
                <table className="Payment-Man-Table">
                    <tbody>
                        {/* table header (column names) */}
                        <PaymentTableHeader />
                        
                        {/* inform user that there are no payments yet */}
                        <tr>
                            <th colSpan={5} style={{paddingLeft: "10px", paddingRight: "10px"}}>
                                <p>No payments yet. Go to <a href="/addpayments">Add Payments</a> to add some</p>
                            </th>
                        </tr>
                    </tbody>
                </table>
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
                        payments.map((val, idx) => <SinglePayment key={idx} payment={val} delete_hook={delete_hook}/>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PaymentManipulation;