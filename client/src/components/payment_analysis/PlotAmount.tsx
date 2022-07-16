import React from "react";
import { Chart } from "react-chartjs-2";
import { ChartData } from 'chart.js';


/**
 * PropsInterface defines props
 */
interface PropsInterface {
    amounts: number[]
    dates: string[]
}


/**
 * PlotAmounts displays the amounts of each payment in plots
 * @param props 
 */
const PlotAmount = (props: PropsInterface) => {
    const amounts = props.amounts; // get amounts
    const dates = props.dates; // get dates to use as labels
    const bar_color: string = "blue";
    const line_color: string = "red";


    // plotting data (datasets for chart.js)
    const plotting_data: ChartData = {
        labels: dates,
        datasets: [
            {
                type: "line" as const,
                label: "Amounts (line)",
                data: amounts,
                borderColor: line_color,
                borderWidth: 3,
                tension: 0.2 // make line appear "round"
            },
            {
                type: "bar" as const,
                label: "Amounts (bar)",
                data: amounts,
                backgroundColor: bar_color,
            }
        ]
    }


    // options 
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                    font: {
                        size: 14
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Amount",
                    font: {
                        size: 14
                    }
                }
            }
        }
    }
    
    
    return (
        <div style={{marginLeft: "auto", marginRight: "auto"}}>
            {/* combined chart */}
            <Chart type="line" data={plotting_data} options={options}></Chart>
        </div>
    )
}

export default PlotAmount;