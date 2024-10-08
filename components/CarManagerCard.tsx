"use client"

import { clientFetcher } from "@/utilities/clientFetcher";
import { Car } from "@/utilities/types";
import { useContext, useEffect, useState } from "react";
import { CarManagerListContext } from "./CarManagerList";

type Props = {
    car: Car,
}

export default function CarManagerCard({ car }: Props){

    const { currentCar, setCurrentCar } = useContext(CarManagerListContext)
    const [ carHighlight, setCarHighlight ] = useState(false)

    useEffect(() => {
        if(currentCar === car.car_id){
            setCarHighlight(true)
        }
        else{
            setCarHighlight(false)
        }
    },[currentCar])

    async function handleSetCurrentCar(){

        await clientFetcher("/api/setcurrentcar", {
            method: 'POST',
            body: JSON.stringify({
                car_id: car.car_id
            })
        });

        if(setCurrentCar) setCurrentCar(car.car_id)
    }

    return (
        <button onClick={handleSetCurrentCar} className={`flex justify-center m-3 p-3 ${carHighlight ? "bg-blue-600 hover:bg-blue-900" : "bg-red-600 hover:bg-red-900"} rounded-full`}>{car.name}</button>
    )
}