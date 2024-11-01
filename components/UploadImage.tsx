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
            const formData = new FormData()
            formData.append("image", selectedFile)

            const res = await fetch(`/api/uploadImage?car_id=${car_id}`, {
                method: "POST",
                body: formData
            })
            if (res.ok) {
                setStatus("Image uploaded successfully.")
            } else {
                setStatus("An error occured while uploading.")
            }

        } catch {
            setStatus("An error occured while uploading.")
        }
    }

    return (
        <>
            <button onClick={handleOpenModal} className="m-1 p-2 bg-tertiary hover:bg-tertiaryContrast rounded-full">Upload Image</button>
            {showModal && (
                <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="fixed bg-secondaryContainer p-8 rounded-md shadow-md w-full max-w-md">
                        <p className="text-2xl mb-4 text-text">Upload Image</p>
                        <form onSubmit={handleUpload}>
                            <div className="mb-4">
                                <label className="block text-sm mb-2 text-text">{status}</label>
                                <input
                                    type="file"
                                    className="border bg-secondaryContainer border-text text-text p-2 rounded-md w-full"
                                    accept="image/jpeg"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-md mr-2 bg-error hover:bg-errorContrast text-textButton">Close</button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-primary hover:bg-primaryContrast text-textButton">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}