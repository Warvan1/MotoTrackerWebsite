"use client"

import { clientFetcher } from "@/utilities/clientFetcher";
import React, { useState } from "react"
import { Cars } from "@/utilities/types";

type Props = {
    carsList: Cars | null
    setCarsList: (currentCar: Cars) => void | null
}

export default function AddCarButton({ carsList, setCarsList }: Props){
    const [ showModal, setShowModal ] = useState(false);
    const [ formData, setFormData ] = useState({
        name: "",
        year: "",
        make: "",
        model: "",
        miles: "0"
    })

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
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

        const newCar = await clientFetcher("/api/addcar", {
            method: 'POST',
            body: JSON.stringify({formData: formData})
        })

        if(setCarsList && carsList) setCarsList({ cars: [...carsList.cars, newCar], current_car: newCar.car_id })
        handleCloseModal()
    }

    return (
        <>
            <div className="flex justify-center">
                <button onClick={handleOpenModal} className="flex p-3 bg-green-600 hover:bg-green-900 rounded-full">Add Car</button>
            </div>

            {showModal && (
                <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="fixed bg-white p-8 rounded-md shadow-md w-full max-w-md">
                        <p className="text-2xl mb-4">Add Car</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    maxLength={15}
                                    required={true}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2">Year</label>
                                <input
                                    name="year"
                                    type="number"
                                    step="1"
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                    required={true}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2">Make</label>
                                <input
                                    name="make"
                                    type="text"
                                    maxLength={10}
                                    required={true}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2">Model</label>
                                <input
                                    name="model"
                                    type="text"
                                    maxLength={10}
                                    required={true}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2">Miles</label>
                                <input
                                    name="miles"
                                    type="number"
                                    step="1"
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-md mr-2 bg-red-500 hover:bg-red-700 text-white">Close</button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-900 text-white">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}