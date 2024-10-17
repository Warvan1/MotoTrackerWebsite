"use client"

import { Car, MaintenanceList } from "@/utilities/types"
import MaintenanceLogCard from "./MaintenanceLogCard"
import AddMaintenanceLog from "./AddMaintenanceLog"

type Props = {
    maintenanceList: MaintenanceList,
    currentCar: Car
}

export default function MaintenanceLogList({ maintenanceList, currentCar }: Props){

    return (
        <>
            <div className="flex justify-center">
                <AddMaintenanceLog currentCar={currentCar}/>
            </div>
            <div className="flex justify-center">
                <div>
                    {maintenanceList.data.map((log, index: number) => (
                        <MaintenanceLogCard key={index} log={log}/>
                    ))}
                </div>
            </div>
        </>
    )
}