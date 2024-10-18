"use client"

import { Car } from "@/utilities/types"
import { useRouter } from "next/navigation"
import AddMaintenanceLog from "./AddMaintenanceLog"

type Props = {
    currentCar: Car,
    details: string[],
    pages: number
}

export default function MaintenanceLogHeader({ currentCar, details, pages }: Props){
    const router = useRouter()
    let filter = "All"
    if(details.length >= 1) filter = details[1]

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value === "All") router.push(`/MaintenanceLog/${details[0]}`)
        else router.push(`/MaintenanceLog/${details[0]}/${e.target.value}`)
    }

    const handlePrevButton = () => {
        if(details.length < 2) router.push(`/MaintenanceLog/${parseInt(details[0]) - 1}`)
        else router.push(`/MaintenanceLog/${parseInt(details[0]) - 1}/${details[1]}`)
    }

    const handleNextButton = () => {
        if(details.length < 2) router.push(`/MaintenanceLog/${parseInt(details[0]) + 1}`)
        else router.push(`/MaintenanceLog/${parseInt(details[0]) + 1}/${details[1]}`)
    }

    return (
        <div className="flex justify-center">
            <div className="m-3 p-3 w-[24rem] bg-red-600 rounded-3xl">
                <form>
                    <div className="m-1">
                        <label className="block text-sm mb-2">Type</label>
                        <select 
                            name="type"
                            value={filter}
                            className="border border-blue-300 bg-blue-600 p-2 rounded-md w-full"
                            onChange={handleSelectChange}>
                                <option value="All">All</option>
                                <option value="Fuel">Fuel</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Oil Change">Oil Change</option>
                                <option value="Tire Rotation">Tire Rotation</option>
                                <option value="Air Filter">Air Filter</option>
                                <option value="Inspection">Inspection</option>
                                <option value="Registration">Registration</option>
                        </select>
                    </div>
                </form>
                <div className="flex justify-center">
                    {details[0] !== "1" && <button onClick={handlePrevButton} className="m-1 p-2 bg-purple-600 hover:bg-purple-900 rounded-full">Previous 20</button>}
                    {parseInt(details[0]) < pages && <button onClick={handleNextButton} className="m-1 p-2 bg-purple-600 hover:bg-purple-900 rounded-full">Next 20</button>}
                </div>
                {currentCar.permissions === "Edit" && <div className="flex justify-center">
                    <AddMaintenanceLog currentCar={currentCar}/>
                </div>}
            </div>
        </div>
    )
}