import React from "react";
import { PaymentInterface } from "../../helper_funcs/helper";
import "./SinglePayment.css";

/**
 * SinglePaymentProps defines props for SinglePayment
 */
interface SinglePaymentProps {
    payment: PaymentInterface
}


/**
 * SinglePayment is used to display one payment passed as argument (row of a table)
 * 
 */
const SinglePayment = (props: SinglePaymentProps) => {
    const payment: PaymentInterface = props.payment;


    // TODO: set currency in Account->Currency, then store in localStorage
    const CURRENCY: string = "€";
     

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


    return (
        <tr className="SinglePayment">
                {/* <td><p>ID: {payment.id}</p></td> */}
                <td className="SinglePayment-Cell"><p style={{color: color}}>{payment.payment_amount} {CURRENCY}</p></td>
                <td className="SinglePayment-Cell"><p>{payment.payment_date}</p></td>
                <td className="SinglePayment-Cell"><p>{payment.payment_time}</p></td>
                <td className="SinglePayment-Cell"><p>{payment.payment_category}</p></td>
                <td className="SinglePayment-Cell"><p>{payment.payment_text !== null ? payment.payment_text : "-"}</p></td>
        </tr>
    )
}

export default SinglePayment;