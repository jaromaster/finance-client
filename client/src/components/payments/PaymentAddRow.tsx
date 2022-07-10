import React from "react";
import "./PaymentAddRow.css";

/**
 * PaymentAddRow is a table row with a button for adding new payments
 */
const PaymentAddRow = () => {

    // called when button is clicked
    const handle_click = () => {
        window.location.href = "/addpayments"; // change path
    }


    return (
        <tr >
            <td colSpan={4} className="PaymentAddRows"></td>
            <th className="PaymentAddRows"><p>Add new Payment</p></th>
            <th className="PaymentAddRows" style={{cursor: "pointer"}} onClick={handle_click}><p>+</p></th>
        </tr>
    )
}


export default PaymentAddRow;