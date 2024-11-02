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
            {!deleted && <div onClick={handleSetCurrentCar} className={`m-3 p-3 w-[24rem] ${currentCar === car.car_id ? "bg-tertiaryContainer" : "bg-primaryContainer"} rounded-3xl`}>
                <div className="flex">
                    <p className="p-1 text-xl text-text">{car.name}</p>
                    {currentCar === car.car_id && <p className="p-1 text-sm text-text">(selected)</p>}
                </div>
                <div className="flex">
                    <p className="py-1 pr-8 pl-1 text-sm text-text">{car.year}</p>
                    <p className="py-1 pr-8 pl-1 text-sm text-text">{car.make}</p>
                    <p className="py-1 pr-8 pl-1 text-sm text-text">{car.model}</p>
                </div>
                <div className="flex">
                    <p className="py-1 pr-8 pl-1 text-sm text-text">Miles: {car.miles}</p>
                </div>
                {user === car.user_id && <ShareCarButton car_id={car.car_id}/>}
                {car.permissions === "Edit" && <EditCarButton car={car} setCar={setCar}/>}
                {car.permissions === "Edit" && <UploadImage car={car} setCar={setCar}/>}
                <DeleteCarButton user={user} car={car} setDeleted={setDeleted}/>
                {car.imageSrc && car.imageSrc !== "" && <DisplayImage imageSrc={car.imageSrc} />}
            </div>}
        </>
    )
}