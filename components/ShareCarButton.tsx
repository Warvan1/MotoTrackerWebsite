"use client"

import { clientFetcher } from "@/utilities/clientFetcher";
import React, { useState } from "react";

type Props = {
    car_id: number
}

export default function ShareCarButton({ car_id }: Props){
    const [ showModal, setShowModal ] = useState(false)
    const [ formData, setFormData ] = useState({
        email: "",
        permissions: "View"
    })
    const [ resultMessage, setResultMessage ] = useState({
        success: false,
        message: ""
    })

    const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setResultMessage({
            success: false,
            message: ""
        })
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

        const success = await clientFetcher({
            url: '/sharecar',
            method: 'POST',
            car_id: car_id,
            body: formData
        })

        setResultMessage({
            success: success.success,
            message: `${success.success ? `Shared Car with ${formData.email}` : `Failed to share car with ${formData.email}`}`
        })
    }

    return (
        <>
            <button onClick={handleOpenModal} className="m-1 p-2 bg-primary hover:bg-primaryContrast text-textButton rounded-full">Share</button>
            {showModal && (
                <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="fixed bg-secondaryContainer p-8 rounded-md shadow-md w-full max-w-md">
                        <p className="text-2xl mb-4 text-text">Share Car</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    required={true}
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">Permissions</label>
                                <select 
                                    name="permissions"
                                    value={formData.permissions}
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    onChange={handleSelectChange}>
                                        <option value="View">View</option>
                                        <option value="Edit">Edit</option>
                                        <option value="Remove Access">Remove Access</option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-md mr-2 bg-error hover:bg-errorContrast text-textButton">Close</button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-primary hover:bg-primaryContrast text-textButton">Submit</button>
                            </div>
                        </form>
                        <div className={`${resultMessage.message.length !== 0 ? "my-2 px-4 py-2" : null} ${resultMessage.success ? "bg-primaryContainer" : "bg-errorContainer"} rounded-md text-text`}><p>{resultMessage.message}</p></div>
                    </div>
                </div>
            )}
        </>
    )
}