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
    ChartData
} from 'chart.js';


/**
 * PropsInterface defines props
 */
interface PropsInterface {
    categories: string[]
    counts: number[]
}


/**
 * PlotCategory plots the category column
 * @param props
 */
const PlotCategory = (props: PropsInterface) => {
    const categories: string[] = props.categories; // get categories (unique) for labels
    const counts: number[] = props.counts; // get counts

    const bar_color: string = "blue";


    // plotting data (datasets for chart.js)
    const plotting_data: ChartData = {
        labels: categories,
        datasets: [
            {
                type: "bar" as const,
                label: "Category",
                data: counts,
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
                    text: "Category",
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
        Title,
        Tooltip,
        Legend
    );


    return (
        <div style={{marginLeft: "auto", marginRight: "auto"}}>
            {/* combined chart */}
            <Chart type="line" data={plotting_data} options={options} />
        </div>
    )
}

export default PlotCategory;