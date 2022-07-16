import React, { useEffect } from "react";
import {
    Chart as ChartJS,
    registerables,
} from 'chart.js';
import "./PaymentTableHeader.css";


/**
 * PropsInterface defines fields for props
 */
interface PropsInterface {
    handle_click_amount: Function
    handle_click_date: Function
    handle_click_time: Function
    handle_click_category: Function
}


/**
 * PaymentTableHeader displays column names
 */
const PaymentTableHeader = (props: PropsInterface) => {

    // called once
    useEffect(()=> {
        // init plotting
        ChartJS.register(
            ...registerables
        );
    }, [])


    return (
        <tr className="PaymentTableHeader">
            <th className="PaymentTableHeader" onClick={e => props.handle_click_amount()} title="view stats">Amount</th>
            <th className="PaymentTableHeader" onClick={e => props.handle_click_date()} title="view stats">Date</th>
            <th className="PaymentTableHeader" onClick={e => props.handle_click_time()} title="view stats">Time</th>
            <th className="PaymentTableHeader" onClick={e => props.handle_click_category()} title="view stats">Category</th>
            <th className="PaymentTableHeader" style={{cursor: "default"}}>Text</th>
            <th className="PaymentTableHeader"></th>
        </tr>
    )
}

export default PaymentTableHeader;