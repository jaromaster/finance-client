import React from "react";
import { create_count_map, format_date, PaymentInterface } from "../../helper_funcs/helper";
import PlotDate from "./PlotDate";


/**
 * PropsInterface defines props
 */
interface PropsInterface {
    payments: PaymentInterface[]
}


/**
 * remove_dup_dates removes duplicate dates from array
 * 
 * @param arr 
 * @returns array (unique elements)
 */
const remove_dup_dates = (arr: string[]): string[] => {
    var unique: string[] = [];
    arr.forEach(element => {
        if (!unique.includes(element)) {
            unique.push(element);
        }
    });
    return unique;
}


/**
 * AnalyzeDate displays date stats
 */
const AnalyzeDate = (props: PropsInterface) => {
    const dates_raw: string[] = props.payments.map(p => format_date(p.payment_date));
    const dates_unique: string[] = remove_dup_dates(dates_raw); // unique
    

    // get mode
    // count each date and store in map
    const count_map = create_count_map(dates_raw);
    const counts: number[] = dates_unique.map(date => count_map.get(date) as number) // get only counts


    // find max count in map -> mode
    // get most common date
    let mode: string = "";
    let n_mode: number = 0;
    count_map.forEach((val, key) => {
        if (val > n_mode) {
            mode = key;
            n_mode = val;
        }
    })

    // get first date (oldest)
    const first: string = dates_unique[0];

    // get last date (newest)
    const last: string = dates_unique[dates_unique.length - 1];

    return (
        <div>
            <h2>Date Stats</h2>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <table>
                    <tbody>
                        <tr>
                            <th>Mode:</th>
                            <td>{mode}</td>
                        </tr>
                        <tr>
                            <th>First:</th>
                            <td>{first}</td>
                        </tr>
                        <tr>
                            <th>Last:</th>
                            <td>{last}</td>
                        </tr>
                    </tbody>
                </table>
                <div style={{flexBasis: "800px"}}>
                    {/* plot */}
                    <PlotDate dates={dates_unique} counts={counts}/>
                </div>
            </div>
        </div>
    )
}

export default AnalyzeDate;