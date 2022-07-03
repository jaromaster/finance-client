import React from "react";
import "./PaymentTableHeader.css";


/**
 * PaymentTableHeader displays column names
 */
const PaymentTableHeader = () => {
    return (
        <tr className="PaymentTableHeader">
            <th className="PaymentTableHeader">Amount</th>
            <th className="PaymentTableHeader">Date</th>
            <th className="PaymentTableHeader">Time</th>
            <th className="PaymentTableHeader">Category</th>
            <th className="PaymentTableHeader">Text</th>
        </tr>
    )
}

export default PaymentTableHeader;