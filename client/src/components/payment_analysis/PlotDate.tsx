import React from "react";
import { Chart } from "react-chartjs-2";
import { ChartData } from 'chart.js';


/**
 * PropsInterface defines props
 */
interface PropsInterface {
    dates: string[]
    counts: number[]
}


/**
 * PlotDate plots date column as histogram
 */
const PlotDate = (props: PropsInterface) => {
    const dates: string[] = props.dates; // get dates from props
    const counts: number[] = props.counts; // get counts

    const bar_color: string = "blue";
    const line_color: string = "red";


    // plotting data (datasets for chart.js)
    const plotting_data: ChartData = {
        labels: dates,
        datasets: [
            {
                type: "line" as const,
                label: "Payments per Day (line)",
                data: counts,
                borderColor: line_color,
                borderWidth: 3,
                tension: 0.2 // make line appear "round"
            },
            {
                type: "bar" as const,
                label: "Payments per Day (bar)",
                data: counts,
                backgroundColor: bar_color,
            }
        ]
    }

    // options 
    const options = {
        scales: {
            x: {
                ticks: {
                    stepSize: 1
                },
                title: {
                    display: true,
                    text: "Date",
                    font: {
                        size: 14
                    }
                }
            },
            y: {
                ticks: {
                    stepSize: 1
                },
                title: {
                    display: true,
                    text: "Payments",
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

export default PlotDate;