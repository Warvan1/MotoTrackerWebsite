"use client"

import { Maintenance } from "@/utilities/types"
import DeleteMaintenanceLog from "./DeleteMaintenanceLog"
import Card from "./Card"

type Props = {
    log: Maintenance
}

export default function MaintenanceLogCard({ log }: Props){
    const date = new Date(parseInt(log.timestamp))

    return(
        <>
            <Card>
                <div className="flex">
                    <p className="p-1 text-xl text-text">{log.service_type}</p>
                    <p className="py-1 pr-8 pl-1 text-sm text-text">{date.getMonth()}-{date.getDate()}-{date.getFullYear()} ({date.getHours()}:{date.getMinutes()}{date.getMinutes() == 0 ? "0": ""})</p>
                </div>
                <div className="flex">
                    <p className="py-1 pr-8 pl-1 text-sm text-text">Cost: {log.cost}</p>
                    <p className="py-1 pr-8 pl-1 text-sm text-text">Miles: {log.miles}</p>
                    <p className="py-1 pr-8 pl-1 text-sm text-text">Gallons: {log.gallons}</p>
                </div>
                <div className="flex">
                    <p className="py-1 pr-8 pl-1 text-sm text-text">{log.notes}</p>
                </div>
                <div className="flex">
                    <DeleteMaintenanceLog id={log.maintenance_id}/>
                </div>
            </Card>
        </>
    )
}