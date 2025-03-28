"use client"

import { clientFetcher } from "@/utilities/clientFetcher"
import { useRouter } from "next/navigation";
import { useState } from "react"

type Props = {
    id: number
}

export default function DeleteMaintenanceLog({ id }: Props){
    const router = useRouter();
    const [ showModal, setShowModal ] = useState(false)

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

    const handleSubmit = async () => {
        await clientFetcher({
            url: '/deletemaintenancelog',
            maintenance_id: id
        })

        router.refresh()
        handleCloseModal()
    }

    return (
        <>
            <button onClick={handleOpenModal} className="m-1 p-2 bg-secondary hover:bg-secondary text-textButton rounded-full">Delete</button>
            {showModal && 
                <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="fixed bg-secondaryContainer p-8 rounded-md shadow-md w-full max-w-md">
                        <p className="text-2xl mb-4 text-text">Delete Maintenance Log Entry</p>
                        <div className="flex justify-end">
                            <button onClick={handleCloseModal} className="px-4 py-2 rounded-md mr-2 bg-error hover:bg-errorContrast text-textButton">Close</button>
                            <button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-primary hover:bg-primaryContrast text-textButton">Delete Forever</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}