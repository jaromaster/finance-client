import React from "react";
import { PleaseLogin } from "../../helper_funcs/helper";
import PaymentManipulation from "./PaymentManipulation";


/**
 * Payments component allows users to view and delete payments (future: maybe add payments)
 */
const Payments = () => {
    // constants

    // check if user logged in
    let username: string = "";
    let username_session_storage: string | null = sessionStorage.getItem("username");
    if (username_session_storage !== null) {
        username = username_session_storage;
    }


    // not logged in
    if (username.length === 0) {
        return <PleaseLogin />
    }

    return (
        <div className="Payments">
            <h1>My Payments</h1>
            <PaymentManipulation />
        </div>
    )
}

export default Payments;