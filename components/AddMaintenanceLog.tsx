"use client"

import { clientFetcher } from "@/utilities/clientFetcher";
import { Car } from "@/utilities/types";
import { useState } from "react";
import { useRouter } from 'next/navigation';

type Props = {
    currentCar: Car
}

export default function AddMaintenanceLog({ currentCar }: Props){
    const router = useRouter();
    const [ showModal, setShowModal ] = useState(false);
    const [ formData, setFormData ] = useState({
        type: "Fuel",
        cost: "0",
        gallons: "0",
        miles: currentCar.miles,
        notes: "",
    })

    const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        if(e.target instanceof HTMLElement && e.target.id === 'modal-overlay'){
            handleCloseModal()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        await clientFetcher({
            url: '/addmaintenance',
            method: 'POST',
            car_id: currentCar.car_id,
            body: formData
        })

        router.refresh()
        handleCloseModal()
    }

    return (
        <>
            <button onClick={handleOpenModal} className="flex p-2 bg-tertiary hover:bg-tertiaryContrast text-textButton rounded-full">Add Maintenance</button>
            {showModal && (
                <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="fixed bg-secondaryContainer p-8 rounded-md shadow-md w-full max-w-md">
                        <p className="text-2xl mb-4 text-text">Add Maintenance</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Type</label>
                                <select 
                                    name="type"
                                    value={formData.type}
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleSelectChange}>
                                        <option value="Fuel">Fuel</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Oil Change">Oil Change</option>
                                        <option value="Tire Rotation">Tire Rotation</option>
                                        <option value="Air Filter">Air Filter</option>
                                        <option value="Inspection">Inspection</option>
                                        <option value="Registration">Registration</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Cost</label>
                                <input
                                    name="cost"
                                    type="number"
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleChange}
                                />
                            </div>

                            {formData.type === "Fuel" && <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Gallons</label>
                                <input
                                    name="gallons"
                                    type="number"
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleChange}
                                />
                            </div>}

                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Odometer</label>
                                <input
                                    name="miles"
                                    type="number"
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleChange}
                                    value={formData.miles}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Notes</label>
                                <input
                                    name="notes"
                                    type="text"
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-md mr-2 bg-error hover:bg-errorContrast text-textButton">Close</button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-primary hover:bg-primaryContrast text-textButton">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}