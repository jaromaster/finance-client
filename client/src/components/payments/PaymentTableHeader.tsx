import React from "react";
import "./PaymentTableHeader.css";


/**
 * PropsInterface defines fields for props
 */
interface PropsInterface {
    handle_click_amount: Function
}


/**
 * PaymentTableHeader displays column names
 */
const PaymentTableHeader = (props: PropsInterface) => {
    return (
        <tr className="PaymentTableHeader">
            <th className="PaymentTableHeader" onClick={e => props.handle_click_amount()}>Amount</th>
            <th className="PaymentTableHeader">Date</th>
            <th className="PaymentTableHeader">Time</th>
            <th className="PaymentTableHeader">Category</th>
            <th className="PaymentTableHeader">Text</th>
        </tr>
    )
}

export default PaymentTableHeader;