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
 * bins_times create bins with counts from times array
 * @param times
 * @return array with counts 
 */
const bins_times = (times: string[], bins: number): number[] => {
    let counts: number[] = new Array(bins);
    counts.fill(0);

    // divide in bins
    times.forEach((time) => {
        const hour = parseInt(time.split(":")[0]); // get hour of time

        for (let i = 0; i < bins + 1; i++) {
            // check if hour is i
            if (hour === i) {
                counts[i] += 1;
                break;
            }
        }
    })

    return counts;
}

/**
 * PropsInterface defines props
 */
interface PropsInterface {
    times: string[]
}


/**
 * PlotTime plots time column as histogram
 */
const PlotTime = (props: PropsInterface) => {
    const times: string[] = props.times; // get dates from props

    const bar_color: string = "blue";
    const line_color: string = "red";
    const BINS: number = 24;

    // divide into bins
    const bins_counts = bins_times(times, BINS);

    // labels for bins
    const labels: string[] = [];
    for (let i = 0; i < BINS; i++) {
        labels.push(`${i}:00-${i+1}:00 (ex.)`);
    }

    // plotting data (datasets for chart.js)
    const plotting_data: ChartData = {
        labels: labels,
        datasets: [
            {
                type: "line" as const,
                label: "Payments per Hour (line)",
                data: bins_counts,
                borderColor: line_color,
                borderWidth: 3,
                tension: 0.2 // make line appear "round"
            },
            {
                type: "bar" as const,
                label: "Payments per Hour (bar)",
                data: bins_counts,
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
                    text: "Time",
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
            <Chart type="line" data={plotting_data} options={options}></Chart>
        </div>
    )
}

export default PlotTime;