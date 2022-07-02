import React from "react";
import "./AddPayments.css";
import PaymentInput from "./PaymentInput";

/**
 * AddPayments (Tab) allows logged in users to add new payments using PaymentInput component
 * 
 */
const AddPayments = () => {
    // check if logged in
    let username: string = "";
    if (sessionStorage.getItem("username") !== null) {
        username = sessionStorage.getItem("username") as string;
    }


    // not logged in
    if (username.length === 0) {
        return (
            <div>
                <h3>Please go to <a href="/account">Account</a> to log in</h3>
            </div>
        )
    }


    return (
        <div className="AddPayments">
            <h1>Add Payments</h1>
            <PaymentInput />
        </div>
    )
}

export default AddPayments;