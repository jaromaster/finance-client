import React, { useEffect, useState } from "react";
import { get_payments, PaymentInterface, PleaseCheckServer, PleaseLogin } from "../../helper_funcs/helper";
import SinglePayment from "./SinglePayment";
import "./PaymentManipulation.css";
import PaymentTableHeader from "./PaymentTableHeader";
import PaymentAddRow from "./PaymentAddRow";
import AnalyzeAmount from "../payment_analysis/AnalyzeAmount";
import AnalyzeDate from "../payment_analysis/AnalyzeDate";
import AnalyzeTime from "../payment_analysis/AnalyzeTime";
import AnalyzeCategory from "../payment_analysis/AnalyzeCategory";


/**
 * StatsElements defines valid names for statistic elements (JSX)
 */
enum StatsElements {
    Amount,
    Date,
    Time,
    Category,
    Text,
    None
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


    // decide which stats element to display using state
    const [stats_element, set_stats_element] = useState(StatsElements.None);

    
    // build statistic elements (analysis)
    const amount_stats: JSX.Element = <AnalyzeAmount payments={payments} />;
    const date_stats: JSX.Element = <AnalyzeDate payments={payments} />;
    const time_stats: JSX.Element = <AnalyzeTime payments={payments} />;
    const category_stats: JSX.Element = <AnalyzeCategory payments={payments} />;


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
                <h3>No payments yet. Go to <a href="/addpayments">Add Payments</a> to add some</h3>
            </div>
        )
    }

    
    // called from PaymentTableHeader when amount is clicked
    const handle_click_amount = () => {
        if (stats_element === StatsElements.Amount){
            set_stats_element(StatsElements.None);
        }
        else{
            set_stats_element(StatsElements.Amount);
        }
    }

    // called from PaymentTableHeader when date is clicked
    const handle_click_date = () => {
        if (stats_element === StatsElements.Date){
            set_stats_element(StatsElements.None);
        }
        else{
            set_stats_element(StatsElements.Date);
        }
    }

    // called from PaymentTableHeader when time is clicked
    const handle_click_time = () => {
        if (stats_element === StatsElements.Time){
            set_stats_element(StatsElements.None);
        }
        else{
            set_stats_element(StatsElements.Time);
        }
    }

    // called from PaymentTableHeader when category is clicked
    const handle_click_category = () => {
        if (stats_element === StatsElements.Category){
            set_stats_element(StatsElements.None);
        }
        else{
            set_stats_element(StatsElements.Category);
        }
    }


    return (
        <div>
            <table className="Payment-Man-Table">
                <colgroup>
                    <col className="Payment-Man-Column"></col>
                    <col className="Payment-Man-Column"></col>
                    <col className="Payment-Man-Column"></col>
                    <col className="Payment-Man-Column"></col>
                    <col className="Payment-Man-Column"></col>
                </colgroup>
                <tbody>
                    {/* table header (column names) */}
                    <PaymentTableHeader 
                        handle_click_amount={handle_click_amount}
                        handle_click_date={handle_click_date}
                        handle_click_time={handle_click_time}
                        handle_click_category={handle_click_category}
                    />
                    
                    {/* display each payment as SinglePayment */}
                    {
                        payments.map((val, idx) => <SinglePayment key={idx} payment={val} delete_hook={delete_hook}/>)
                    }

                    {/* add payment */}
                    <PaymentAddRow />
                </tbody>
            </table>

            {/* show payment analytics */}
            {/* check if amount */}
            {stats_element === StatsElements.Amount ? amount_stats : null}
            {/* check if date */}
            {stats_element === StatsElements.Date ? date_stats : null}
            {/* check if time */}
            {stats_element === StatsElements.Time ? time_stats : null}
            {/* check if category */}
            {stats_element === StatsElements.Category ? category_stats : null}

            {/* TODO check other columns, then display stats */}
        </div>
    )
}

export default PaymentManipulation;