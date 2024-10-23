"use client"

import { MaintenanceList } from "@/utilities/types"
import MaintenanceLogCard from "./MaintenanceLogCard"

type Props = {
    maintenanceList: MaintenanceList,
}

export default function MaintenanceLogList({ maintenanceList }: Props){

    return (
        <>
                <div>
                    {maintenanceList.data.map((log, index: number) => (
                        <MaintenanceLogCard key={index} log={log}/>
                    ))}
                </div>
        </>
    )
}