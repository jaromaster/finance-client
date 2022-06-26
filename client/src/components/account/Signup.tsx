import React, { MouseEvent } from "react";
import "./Signup.css";

/**
 * Signup is used for signing in new users
 */
const Signup = () => {
    // server (ip, method, fetch)

    // on submit
    const handle_submit = (e: MouseEvent)=>{
        e.preventDefault();
        
        // get data of input fields
        // check if passwords are same
        // send to server
        // handle error (e.g. user exists)
    }


    return (
        <div className="Signup">
            <form>
                <table className="Signup-Form-Table">
                    <tr>
                        <th><label>Username</label></th>
                        <th><input type="text"></input></th>
                    </tr>
                    <tr>
                        <th><label>Password</label></th>
                        <th><input type="password"></input></th>
                    </tr>
                    <tr>
                        <th><label>Repeat Password</label></th>
                        <th><input type="text"></input></th>
                    </tr>
                    <tr>
                        <th></th>
                        <th><button type="submit" className="Signup-Submit-Button" onClick={(e)=>handle_submit(e)}>Sign up</button></th>
                    </tr>
                </table>

            </form>
        </div>
    )
}

export default Signup;