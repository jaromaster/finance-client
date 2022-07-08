import React from "react";
import { format_date, PaymentInterface } from "../../helper_funcs/helper";
import PlotAmount from "./PlotAmount";


/**
 * PropsInterface defines fields of AnalyzeAmount props
 */
interface PropsInterface {
    payments: PaymentInterface[]
}


/**
 * AnalyzeAmount displays stats of amount (column of payment table)
 */
const AnalyzeAmount = (props: PropsInterface) => {
    const amounts: number[] = props.payments.map(p => p.payment_amount); // get array of amounts (by default sorted by date)
    const sorted_amounts: number[] = [...amounts].sort((a,b)=> a-b); // sorted by amount

    // get min
    const min: number = sorted_amounts[0];

    // get max
    const max: number = sorted_amounts[sorted_amounts.length-1];

    // get median
    const median: number = sorted_amounts[Math.floor(amounts.length / 2)];

    // get sum
    const sum: number = sorted_amounts.reduce((prev, cur) => prev + cur);

    // get mean
    const mean: number = sum / amounts.length;
    const mean_rounded: number = Math.round(mean * 100) / 100; // round 2 digits

    // get range
    const range: number = Math.abs(min - max);



    return (
        <div>
            <h3>Amount Stats</h3>
            {/* content div with 2 columns (table and chart) */}
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <table>
                    <tbody>
                        <tr>
                            <th>Sum:</th>
                            <td>{sum}</td>
                        </tr>
                        <tr>
                            <th>Min:</th>
                            <td>{min}</td>
                        </tr>
                        <tr>
                            <th>Max:</th>
                            <td>{max}</td>
                        </tr>
                        <tr>
                            <th>Median:</th>
                            <td>{median}</td>
                        </tr>
                        <tr>
                            <th>Mean:</th>
                            <td>{mean_rounded}</td>
                        </tr>
                        <tr>
                            <th>Range:</th>
                            <td>{range}</td>
                        </tr>
                    </tbody>
                </table>
                {/* plot amount */}
                <div style={{flexBasis: "800px"}}>
                    <PlotAmount amounts={amounts} dates={props.payments.map(p => format_date(p.payment_date))}/>
                </div>
            </div>
        </div>
    )
}

export default AnalyzeAmount;