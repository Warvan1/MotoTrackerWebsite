"use client"

import { statsData, statsDataKey } from "@/utilities/types"
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from "react";
  
// Register the required chart components
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

type Props = {
    graphData: statsData
}

export default function StatisticsGraph({ graphData }: Props){
    const [ selectedDataSet, setSelectedDataset ] = useState<statsDataKey>('mpgData')
    const [ selectedLabel, setSelectedLabel ] = useState("Miles Per Gallon")

    const data = {
        labels: new Array(graphData.mpgData.length).fill(""),
        datasets: [
            {
                label: selectedLabel,
                data: graphData[selectedDataSet],
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 2,
            },
        ]
    }

    const options = {
        responsive: true,
        scales: {
            x: {
                display: false,
            },
            y: {
                beginAtZero: true,
            }
        }
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDataset(e.target.value as statsDataKey)
        if(e.target.value === "mpgData") setSelectedLabel("Miles Per Gallon")
        if(e.target.value === "dpgData") setSelectedLabel("Dollars Per Gallon")
        if(e.target.value === "dpmData") setSelectedLabel("Dollars Per Mile")
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="m-3 p-3 w-[24rem] bg-red-600 rounded-3xl">
                    <form>
                        <div className="m-1">
                            <label className="block text-sm mb-2">Graph Data</label>
                            <select 
                                name="type"
                                value={selectedDataSet}
                                className="border border-blue-300 bg-blue-600 p-2 rounded-md w-full"
                                onChange={handleSelectChange}>
                                    <option value="mpgData">Miles Per Gallon</option>
                                    <option value="dpgData">Dollars Per Gallon</option>
                                    <option value="dpmData">Dollars Per Mile</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="m-3 p-3 w-[48rem] h-[36rem]">
                    <Line data={data} options={options} />
                </div>
            </div>
        </>
    )
}