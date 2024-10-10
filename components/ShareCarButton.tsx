"use client"

import { clientFetcher } from "@/utilities/clientFetcher";
import React, { useState } from "react";

type Props = {
    car_id: number
}

export default function ShareCarButton({ car_id }: Props){
    const [ showModal, setShowModal ] = useState(false);
    const [ formData, setFormData ] = useState({
        email: "",
        permissions: "View"
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

        //TODO: API Call
        console.log(formData)
        const success = await clientFetcher("/api/sharecar", {
            method: 'POST',
            body: JSON.stringify({
                car_id: car_id,
                formData: formData
            })
        })

        console.log(success)

        handleCloseModal()
    }

    return (
        <>
            <button onClick={handleOpenModal} className="m-1 p-2 bg-green-600 hover:bg-green-900 rounded-full">Share</button>
            {showModal && (
                <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="fixed bg-white p-8 rounded-md shadow-md w-full max-w-md">
                        <p className="text-2xl mb-4">Add Car</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    required={true}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2">Permissions</label>
                                <select 
                                    name="permissions"
                                    value={formData.permissions}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                    onChange={handleSelectChange}>
                                        <option value="View">View</option>
                                        <option value="Edit">Edit</option>
                                        <option value="Remove Access">Remove Access</option>
                                </select>
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