"use client"

import { clientFetcher } from "@/utilities/clientFetcher";
import { Car } from "@/utilities/types";
import React, { useState } from "react";

type Props = {
    ownership: boolean,
    car: Car
}

export default function DeleteCarButton({ ownership, car }: Props){
    const [ showModal, setShowModal ] = useState(false)
    const [ formData, setFormData ] = useState({
        name: "",
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

    const handleDeleteSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(car.name !== formData.name) handleCloseModal()

        await clientFetcher({
            url: '/deletecar',
            car_id: car.car_id
        })

        handleCloseModal()
        //TODO: delete the card from the sceen
    }

    const handleRemoveAccessSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await clientFetcher({
            url: '/removemycaraccess',
            car_id: car.car_id
        })

        handleCloseModal()
        //TODO: delete the card from the sceen
    }

    return (
        <>
            <button onClick={handleOpenModal} className="m-1 p-2 bg-yellow-600 hover:bg-yellow-900 rounded-full">{ownership ? "Delete" : "Remove Access"}</button>
            {showModal && ownership && (
                <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="fixed bg-white p-8 rounded-md shadow-md w-full max-w-md">
                        <p className="text-2xl mb-4">Delete Car</p>
                        <form onSubmit={handleDeleteSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    maxLength={15}
                                    required={true}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                    onChange={handleChange}
                                    placeholder="Type Name Of Car To Permanatly Delete"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-md mr-2 bg-red-500 hover:bg-red-700 text-white">Close</button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-900 text-white">Delete Forever</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showModal && !ownership && (
                <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="fixed bg-white p-8 rounded-md shadow-md w-full max-w-md">
                        <p className="text-2xl mb-4">Remove My Access</p>
                        <form onSubmit={handleRemoveAccessSubmit}>
                            <div className="flex justify-end">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-md mr-2 bg-red-500 hover:bg-red-700 text-white">Close</button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-900 text-white">Remove Access</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </>
    )
}