/**
 * PleaseLogin contains a link to /account and asks user to login
 */
export const PleaseLogin = () => {
    return (
        <div>
            <h3>Please go to <a href="/account">Account</a> to log in</h3>
        </div>
    )
}


/**
 * PleaseCheckServer contains a link to /account and asks user to check server ip and port
 */
 export const PleaseCheckServer = () => {
    return (
        <div>
            <h3>Please go to <a href="/account">Account</a> to check your server settings</h3>
        </div>
    )
}


/**
 * PaymentInterface defines fields of a payment
 */
export interface PaymentInterface {
    id: number
    user_id: number
    payment_amount: number
    payment_category: "business"
    payment_date: string
    payment_time: string
    payment_text: string
}


/**
 * format_date takes a date and formats it
 * 
 * @param date 
 * @returns formatted date
 */
export const format_date = (date: string): string => {
    let new_date: string = "";
    new_date = date.split("T")[0]; // remove last part

    return new_date;
}