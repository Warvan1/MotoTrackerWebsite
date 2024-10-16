"use client"

import { Maintenance } from "@/utilities/types"

type Props = {
    log: Maintenance
}

export default function MaintenanceLogCard({ log }: Props){
    const date = new Date(parseInt(log.timestamp))

    return(
        <>
            <div className="m-3 p-3 w-[24rem] bg-red-600 rounded-3xl">
                <div className="flex">
                    <p className="p-1 text-xl">{log.service_type}</p>
                    <p className="py-1 pr-8 pl-1 text-sm">{date.getMonth()}-{date.getDate()}-{date.getFullYear()} ({date.getHours()}:{date.getMinutes()}{date.getMinutes() == 0 ? "0": ""})</p>
                </div>
                <div className="flex">
                    <p className="py-1 pr-8 pl-1 text-sm">Cost: {log.cost}</p>
                    <p className="py-1 pr-8 pl-1 text-sm">Miles: {log.miles}</p>
                    <p className="py-1 pr-8 pl-1 text-sm">Gallons: {log.gallons}</p>
                </div>
                <div className="flex">
                    <p className="py-1 pr-8 pl-1 text-sm">{log.notes}</p>
                </div>
            </div>
        </>
    )
}