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
        <div style={{marginLeft: "auto", marginRight: "auto", width: "40%"}}>
            {/* combined chart */}
            <Chart type="line" data={plotting_data}></Chart>
        </div>
    )
}

export default PlotAmount;