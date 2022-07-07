import React from "react";

/**
 * PaymentAddRow is a table row with a button for adding new payments
 */
const PaymentAddRow = () => {

    // called when button is clicked
    const handle_click = () => {
        window.location.href = "/addpayments"; // change path
    }


    return (
        <tr>
            <td colSpan={4}></td>
            <th style={{border: "1px solid lightblue", paddingLeft: "8px", paddingRight: "8px"}}><p>Add new Payment</p></th>
            <th style={{cursor: "pointer"}} onClick={handle_click}><p>+</p></th>
        </tr>
    )
}


export default PaymentAddRow;