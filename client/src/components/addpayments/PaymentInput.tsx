import React, { MouseEvent, useState } from "react";
import { fetch_timeout } from "../../helper_funcs/helper_funcs";
import "./PaymentInput.css";


/**
 * RequestBody contains all payments and the token
 */
interface RequestBody {
    payments: AddPaymentRequest[]
    token: string
}


/**
 * AddPaymentRequest contains necessary fields
 */
interface AddPaymentRequest {
    amount: number
    date: string
    time: string
    category: string
    text: string | null
}

/**
 * PaymentInput allows users to input data to add a new payment
 * 
 */
const PaymentInput = () => {
    // constants
    const MAX_CHARS_TEXT: number = 150;
    const DATE_NOT_SET_MSG: string = "Date must not be empty!"; // error message
    const TIME_NOT_SET_MSG: string = "Time must not be empty!"; // error message
    const INVALID_TOKEN_MSG: string = "Token for auth seems to be invalid. Please try to logout and login again!"; // error message
    const AUTH_FAILED_MSG: string = "Auth failed due to invalid token. Please login again"; // error message
    const UNKNOWN_ERROR_MSG: string = "Some server-side error occurred, please try again!"; // error message
    const TIMEOUT_MS: number = 3000; // wait for n milliseconds
    const UNSET_IP: string = ""; // used to check if ip was not set
    const UNSET_PORT: number = -1; // used to check if port was not set
    const PROTOCOL: string = "http";
    const METHOD: string = "POST";
    const PATH: string = "addpayments";

    // categories the user can select
    const categories: string[] = ["Business", "Personal"];

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

    // user input
    const [amount, set_amount] = useState(0);
    const [date, set_date] = useState("");
    const [category, set_category] = useState(categories[0]);
    const [time, set_time] = useState("");
    const [text, set_text] = useState("");
        
    // error message that is displayed in its own text field
    const [error_message, set_error_message] = useState("Some generic error message that is displayed on every error in this component");

    // handle submit
    const handle_submit = (e: MouseEvent) => {
        e.preventDefault();

        // check date
        if (date.length === 0) {
            set_error_message(DATE_NOT_SET_MSG);
            return;
        }

        // check time
        if (time.length === 0) {
            set_error_message(TIME_NOT_SET_MSG);
            return;
        }

        // check token
        if (token === null) {
            set_error_message(INVALID_TOKEN_MSG);
            return;
        }


        // if text is empty: null, else: text
        let insert_text: string | null = null;
        if (text.length > 0) {
            insert_text = text;
        }

        // collect user input in json
        const data: AddPaymentRequest = {
            amount: amount,
            date: date,
            time: time,
            category: category,
            text: insert_text
        }
        

        // build url
        const url: string = `${PROTOCOL}://${server_ip}:${server_port}/${PATH}`;


        // json body containing payments and jwt (token)
        const body: RequestBody = {
            payments: [data],
            token: token
        }

        // send data
        fetch_timeout(url, {
            method: METHOD,
            body: JSON.stringify(body)
        }, TIMEOUT_MS)
        .then(res => {

            // invalid token
            if (res.status === 403) {
                set_error_message(AUTH_FAILED_MSG);
                return "";
            }

            // server error
            if (res.status === 500) {
                // return res.text() to get error message
                return res.text();
            }

            // unknown error
            if (res.status !== 200) {
                // show some generic error message
                set_error_message(UNKNOWN_ERROR_MSG);
                return "";
            }


            // CAUTION: this case returns success-messages
            // ok
            return res.text(); 
        })
        .then(txt => {
            if (txt === "") return;
            set_error_message(txt);
        })
        .catch(err => alert(err));
    }

    return (
        <div>
            <form>
                <table className="Payment-Input-Table">
                    <tbody>
                        <tr>
                            <th><label>Amount</label></th>
                            <td><input type="number" className="Payment-Input-Field" onChange={e => set_amount(parseInt(e.target.value))} defaultValue={0}></input></td>
                        </tr>
                        <tr>
                            <th><label>Date</label></th>
                            <td><input type="date" className="Payment-Input-Field" onChange={e => set_date(e.target.value)}></input></td>
                        </tr>
                        <tr>
                            <th><label>Category</label></th>
                            <td>
                                <select className="Payment-Input-Field" onChange={e => set_category(e.target.value)}>
                                    {categories.map((val)=><option>{val}</option>)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th><label>Time</label></th>
                            <td><input type="time" className="Payment-Input-Field" onChange={e => set_time(e.target.value)}></input></td>
                        </tr>

                        <tr>
                            <th><label>Text</label></th>
                            <td><textarea className="Payment-Input-Field" maxLength={MAX_CHARS_TEXT} onChange={e => set_text(e.target.value)}></textarea></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button className="Payment-Input-Button" onClick={handle_submit}>Add</button></td>
                        </tr>
                        <tr>
                            <th colSpan={2} className="Payment-Input-Error-Text-Field">{error_message}</th>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default PaymentInput;