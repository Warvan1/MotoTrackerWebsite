"use client"

import { clientFetcher } from "@/utilities/clientFetcher";
import { Car } from "@/utilities/types";
import React, { useState } from "react";

type Props = {
    user: string,
    car: Car,
    setDeleted: (deleted: boolean) => void | null,
}

export default function DeleteCarButton({ user, car, setDeleted}: Props){
    const [ showModal, setShowModal ] = useState(false)
    const [ formData, setFormData ] = useState({
        name: "",
    })

    const ownership = (user === car.user_id);

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
        setDeleted(true)
    }

    const handleRemoveAccessSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await clientFetcher({
            url: '/removemycaraccess',
            car_id: car.car_id
        })

        handleCloseModal()
        setDeleted(true)
    }

    return (
        <>
            <button onClick={handleOpenModal} className="m-1 p-2 bg-error hover:bg-errorContrast text-textButton rounded-full">{ownership ? "Delete" : "Remove Access"}</button>
            {showModal && ownership && (
                <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="fixed bg-secondaryContainer p-8 rounded-md shadow-md w-full max-w-md">
                        <p className="text-2xl mb-4 text-text">Delete Car</p>
                        <form onSubmit={handleDeleteSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    maxLength={15}
                                    required={true}
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleChange}
                                    placeholder="Type Name Of Car To Permanatly Delete"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-md mr-2 bg-error hover:bg-errorContrast text-textButton">Close</button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-primary hover:bg-primaryContrast text-textButton">Delete Forever</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showModal && !ownership && (
                <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="fixed bg-secondaryContainer p-8 rounded-md shadow-md w-full max-w-md">
                        <p className="text-2xl mb-4 text-text">Remove My Access</p>
                        <form onSubmit={handleRemoveAccessSubmit}>
                            <div className="flex justify-end">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-md mr-2 bg-error hover:bg-errorContrast text-textButton">Close</button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-primary hover:bg-primaryContrast text-textButton">Remove Access</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </>
    )
}