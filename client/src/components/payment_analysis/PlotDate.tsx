import React from "react";
import { Chart } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ChartData
} from 'chart.js';


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

    console.log(dates)


    // plotting data (datasets for chart.js)
    const plotting_data: ChartData = {
        labels: dates,
        datasets: [
            {
                type: "line" as const,
                label: "Dates (line)",
                data: counts,
                borderColor: line_color,
                borderWidth: 3,
                tension: 0.2 // make line appear "round"
            },
            {
                type: "bar" as const,
                label: "Dates (bar)",
                data: counts,
                backgroundColor: bar_color,
            }
        ]
    }

    // init plotting
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    return (
        <div style={{marginLeft: "auto", marginRight: "auto"}}>
            {/* combined chart */}
            <Chart type="line" data={plotting_data}></Chart>
        </div>
    )
}

export default PlotDate;