import axios, { AxiosResponse } from "axios";


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


/**
 * get_payments fetches all payments of user from server
 * 
 * @param url 
 * @param token 
 * @returns Promise<payments> (json) or Promise<string> error message
 */
export const get_payments = async (url: string, token: string): Promise<PaymentInterface[] | string>  => {
    const body = {token: token};
    const TIMEOUT_MS: number = 2000; 

    // fetch data from server
    try {
        const res = await axios.post(url, body,{
            timeout: TIMEOUT_MS
        });

        // ok
        const json_data = res.data;
        let payments: PaymentInterface[] = [];
        for (let i = 0; i < json_data.length; i++) {
            const payment = json_data[i] as PaymentInterface;
            
            payments.push(payment);
        }
        return payments;

    } catch (error: any) {
        const res = error.response as AxiosResponse;

        // token invalid -> auth failed
        if (res.status === 403) {
            return "Auth error, token seems to be invalid";
        }

        return "Network error, server not found";
    }
}