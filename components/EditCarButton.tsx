"use client"

import { clientFetcher } from "@/utilities/clientFetcher";
import { Car } from "@/utilities/types";
import { useState } from "react";

type Props = {
    car: Car,
    setCar: (car: Car) => void | null,
}

export default function EditCarButton({ car, setCar }: Props){
    const [ showModal, setShowModal ] = useState(false);
    const [ formData, setFormData ] = useState({
        name: car.name,
        year: car.year,
        make: car.make,
        model: car.model,
        miles: car.miles
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        //check to make sure that formData is different than the recieved car
        if(!(car.name !== formData.name || car.year !== formData.year || car.make !== formData.make || car.model !== formData.model || car.miles !== formData.miles)){
            return
        }

        const editedCar: Car = await clientFetcher({
            url: '/editcar',
            method: 'POST',
            car_id: car.car_id,
            body: formData
        });

        handleCloseModal()
        editedCar.permissions = "Edit"
        editedCar.imageSrc = car.imageSrc
        setCar(editedCar)
    }

    return (
        <>
            <button onClick={handleOpenModal} className="m-1 p-2 bg-secondary hover:bg-secondaryContrast text-textButton rounded-full">Edit</button>
            {showModal && (
                <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="fixed bg-secondaryContainer p-8 rounded-md shadow-md w-full max-w-md">
                        <p className="text-2xl mb-4 text-text">Edit Car</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    maxLength={15}
                                    required={true}
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleChange}
                                    value={formData.name}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Year</label>
                                <input
                                    name="year"
                                    type="number"
                                    step="1"
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                    required={true}
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleChange}
                                    value={formData.year}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Make</label>
                                <input
                                    name="make"
                                    type="text"
                                    maxLength={10}
                                    required={true}
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleChange}
                                    value={formData.make}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Model</label>
                                <input
                                    name="model"
                                    type="text"
                                    maxLength={10}
                                    required={true}
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleChange}
                                    value={formData.model}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Miles</label>
                                <input
                                    name="miles"
                                    type="number"
                                    step="1"
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleChange}
                                    value={formData.miles}
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