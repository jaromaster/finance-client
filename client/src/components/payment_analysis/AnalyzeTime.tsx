import React from "react";
import { create_count_map, PaymentInterface } from "../../helper_funcs/helper";
import PlotTime from "./PlotTime";


/**
 * PropsInterface defines props
 */
interface PropsInterface {
    payments: PaymentInterface[]
}


/**
 * remove_dup_times removes duplicate times from array
 * 
 * @param arr 
 * @returns array (unique elements)
 */
const remove_dup_times = (arr: string[]): string[] => {
    var unique: string[] = [];
    arr.forEach(element => {
        if (!unique.includes(element)) {
            unique.push(element);
        }
    });
    return unique;
}


/**
 * AnalyzeTime displays time stats
 */
const AnalyzeTime = (props: PropsInterface) => {
    const times: string[] = props.payments.map(p => p.payment_time); // get times
    const times_unique: string[] = remove_dup_times(times); // remove duplicates
    const sorted_times: string[] = [...times_unique].sort((a, b) => a.localeCompare(b)); // sort by time

    // get mode
    // count each time and store in map
    const count_map = create_count_map(times);


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


    // get first time (oldest)
    const first: string = sorted_times[0];

    // get last date (newest)
    const last: string = sorted_times[sorted_times.length - 1];


    return (
        <div>
            <h2>Time Stats</h2>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <table>
                    <tbody>
                        <tr>
                            <th>Mode:</th>
                            <th>{mode}</th>
                        </tr>
                        <tr>
                            <th>First:</th>
                            <th>{first}</th>
                        </tr>
                        <tr>
                            <th>Last:</th>
                            <th>{last}</th>
                        </tr>
                    </tbody>
                </table>
                <div style={{flexBasis: "800px"}}>
                    {/* plot */}
                    <PlotTime times={times}/>
                </div>
            </div>
        </div>
    )
}

export default AnalyzeTime;