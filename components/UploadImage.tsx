"use client"

import { useState } from "react"

type Props = {
    car_id: number
}

export default function UploadImage({ car_id }: Props) {
    const [ showModal, setShowModal ] = useState(false)
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null)
    const [ status, setStatus ] = useState("")

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null) setSelectedFile(e.target.files[0])
    }

    const handleUpload = async () => {
        if(!selectedFile){
            setStatus("Select a file.")
            return
        }
        setStatus("uploading...")

        try {
            const arrayBuffer = await selectedFile.arrayBuffer();

            const res = await fetch(`/api/uploadImage?car_id=${car_id}`, {
                method: "POST",
                headers: {
                    "content-Type": selectedFile.type
                },
                body: arrayBuffer
            })

            if (res.ok) {
                setStatus("Image uploaded successfully.")
            } else {
                setStatus("An error occured while uploading.")
            }
        } catch (error) {
            console.error("Error uploading image: ", error)
            setStatus("An error occured while uploading.")
        }
    }

    return (
        <>
                <button onClick={handleOpenModal} className="m-1 p-2 bg-sky-600 hover:bg-sky-900 rounded-full">Upload Image</button>

            {showModal && (
                <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="fixed bg-white p-8 rounded-md shadow-md w-full max-w-md">
                        <p className="text-2xl mb-4">Add Car</p>
                        <form onSubmit={handleUpload}>
                            <div className="mb-4">
                                <label className="block text-sm mb-2">{status}</label>
                                <input
                                    type="file"
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                    accept="image/jpeg"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-md mr-2 bg-red-500 hover:bg-red-700 text-white">Close</button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-900 text-white">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}