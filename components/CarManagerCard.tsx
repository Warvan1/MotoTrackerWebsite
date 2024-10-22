"use client"

import { clientFetcher } from "@/utilities/clientFetcher";
import { Car } from "@/utilities/types";
import ShareCarButton from "./ShareCarButton";
import DeleteCarButton from "./DeleteCarButton";
import EditCarButton from "./EditCarButton";
import { useState } from "react";
import DisplayImage from "./DisplayImage";
import UploadImage from "./UploadImage";

type Props = {
    carProp: Car,
    user: string,
    currentCar: number | null,
    setCurrentCar: (currentCar: number) => void | null,
}

export default function CarManagerCard({ carProp, user, currentCar, setCurrentCar }: Props){
    const [ deleted, setDeleted ] = useState(false)
    const [ car, setCar] = useState(carProp)

    const handleSetCurrentCar = async () => {
        if(currentCar === car.car_id) return

        await clientFetcher({
            url: '/setcurrentcar',
            car_id: car.car_id
        })

        if(setCurrentCar) setCurrentCar(car.car_id)
    }

    return (
        <>
            {!deleted && <div onClick={handleSetCurrentCar} className={`m-3 p-3 w-[24rem] ${currentCar === car.car_id ? "bg-blue-600 hover:bg-blue-900" : "bg-red-600 hover:bg-red-900"} rounded-3xl`}>
                <div className="flex">
                    <p className="p-1 text-xl">{car.name}</p>
                    {currentCar === car.car_id && <p className="p-1 text-sm">(selected)</p>}
                </div>
                <div className="flex">
                    <p className="py-1 pr-8 pl-1 text-sm">{car.year}</p>
                    <p className="py-1 pr-8 pl-1 text-sm">{car.make}</p>
                    <p className="py-1 pr-8 pl-1 text-sm">{car.model}</p>
                </div>
                <div className="flex">
                    <p className="py-1 pr-8 pl-1 text-sm">Miles: {car.miles}</p>
                </div>
                {user === car.user_id && <ShareCarButton car_id={car.car_id}/>}
                {car.permissions === "Edit" && <EditCarButton car={car} setCar={setCar}/>}
                {car.permissions === "Edit" && <UploadImage car_id={car.car_id}/>}
                <DeleteCarButton user={user} car={car} setDeleted={setDeleted}/>
                {car.imageSrc && car.imageSrc !== "" && <DisplayImage imageSrc={car.imageSrc} />}
            </div>}
        </>
    )
}