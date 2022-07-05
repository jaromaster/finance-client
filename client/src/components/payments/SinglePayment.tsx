import axios, { AxiosResponse } from "axios";
import React, { MouseEvent } from "react";
import { format_date, PaymentInterface, PleaseCheckServer } from "../../helper_funcs/helper";
import "./SinglePayment.css";

/**
 * SinglePaymentProps defines props for SinglePayment
 */
interface SinglePaymentProps {
    payment: PaymentInterface
    delete_hook: Function
}


/**
 * SinglePayment is used to display one payment passed as argument (row of a table)
 * 
 */
const SinglePayment = (props: SinglePaymentProps) => {
    // get payment from props
    const payment: PaymentInterface = props.payment;

    // TODO: set currency in Account->Currency, then store in localStorage
    const CURRENCY: string = "€";
    const UNSET_IP: string = ""; // used to check if ip was not set
    const UNSET_PORT: number = -1; // used to check if port was not set
    const PATH: string = "delpayments";
    const METHOD: string = "DELETE";
    const PROTOCOL: string = "http";
    const TIMEOUT_MS: number = 3000; // millisecs

    // server ip and port 
    let server_ip: string = UNSET_IP;
    let server_port: number = UNSET_PORT;

    // get server information (stored in localStorage), syntax: "IP:PORT"
    const server: string | null = localStorage.getItem("server");

    // get token from sessionStorage (jwt)
    const token: string | null = sessionStorage.getItem("token");


    // check if server not null (in localStorage), then extract values from localStorage
    if (server !== null) {
        // set server ip and port
        server_ip = server.split(":")[0]; // first part
        server_port = parseInt(server.split(":")[1]); // second part
    }

    // IP and PORT not set
    if (server_ip === UNSET_IP || server_port === UNSET_PORT) {
        return <PleaseCheckServer />  
    }


    // color amount based on value (pos, neg, 0)
    const amount: number = payment.payment_amount;
    let color: string = "";
    if (amount === 0) {
        color = "white";
    }
    else if (amount < 0) {
        color = "red";
    }
    else if (amount > 0) {
        color = "green";
    }

    // format date
    const date: string = format_date(payment.payment_date);

    // delete payment from payments
    const handle_delete = async (e: MouseEvent) => {
        console.log("deleting payment with id " + payment.id);

        // check token
        if (token === null) {
            alert("Please log in again")
            return;
        }

        // build url
        const url: string = `${PROTOCOL}://${server_ip}:${server_port}/${PATH}`;

        // create request body
        const body = {
            payment_ids: [payment.id],
            token: token
        }

        try {
            // send delete request
            const res: AxiosResponse<any, any> = await axios.delete(url, {
                data: JSON.stringify(body),
                timeout: TIMEOUT_MS
            });
            
            // token invalid (auth failed)
            if (res.status === 403) {
                alert(await res.data);
            }

            // server error
            else if (res.status === 500) {
                alert(await res.data);
            }

            // other error
            else if (res.status !== 200) {
                alert("Some other error.");
            }

            // call delete_hook from PaymentManipulation to inform about delete
            props.delete_hook(payment.id); // all SinglePayment components are re-rendered

        } catch (error) {
            alert(error);
        }
    }


    return (
        <tr className="SinglePayment">
            {/* <td><p>ID: {payment.id}</p></td> */}
            <td className="SinglePayment-Cell"><p style={{color: color}}>{amount} {CURRENCY}</p></td>
            <td className="SinglePayment-Cell"><p>{date}</p></td>
            <td className="SinglePayment-Cell"><p>{payment.payment_time}</p></td>
            <td className="SinglePayment-Cell"><p>{payment.payment_category}</p></td>
            <td className="SinglePayment-Cell">
                <p>{payment.payment_text !== null ? payment.payment_text : "-"}</p>
            </td>
            {/* field, when clicked: payment deleted */}
            <td className="SinglePayment-Cell" style={{cursor: "pointer"}} onClick={handle_delete}>
                <p style={{color: "red"}} title="Delete payment">X</p>
            </td>
        </tr>
    )
}

export default SinglePayment;