import React, { MouseEvent, useState } from "react";


/**
 * CurrencySettings allows user to set preferred currency
 */
const CurrencySettings = () => {
    const options: string[] = ["Euro (€)", "Dollar ($)", "Yen (¥)", "Pound (£)"]; // possible currencies

    // convert currency name to symbol
    const curr_symbol_map = new Map<string, string>();
    curr_symbol_map.set("Euro (€)", "€");
    curr_symbol_map.set("Dollar ($)", "$");
    curr_symbol_map.set("Yen (¥)", "¥");
    curr_symbol_map.set("Pound (£)", "£");


    // currency select by user
    const [currency, set_currency] = useState(curr_symbol_map.get(options[0]) as string);


    // check if currency already set
    const localStorage_currency = localStorage.getItem("currency");
    console.log(localStorage_currency)
    let default_currency = "";
    if (localStorage_currency !== null) {
        default_currency = localStorage_currency;
    }


    // when submit button is clicked
    const handle_submit = (e: MouseEvent) => {
        e.preventDefault(); // no reloading page
        localStorage.setItem("currency", currency); // store in localStorage
    }

    return (
        <div style={{margin: "10px"}}>
            <form>
                <table style={{marginRight: "auto", marginLeft: "auto"}}>
                    <tbody>
                        <tr>
                            <th>
                                <label>Currency:</label>
                            </th>
                            <td>
                                <select onChange={e => set_currency(curr_symbol_map.get(e.target.value) as string)}>
                                    {options.map(o => {
                                        // check if includes set currency
                                        if (o.includes(default_currency) && default_currency !== ""){
                                            return <option selected>{o}</option>
                                        }

                                        return <option>{o}</option>
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button type="submit" style={{float: "right"}} onClick={handle_submit}>Save</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default CurrencySettings;