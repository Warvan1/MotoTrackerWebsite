"use client"

import { clientFetcher } from "@/utilities/clientFetcher";
import { Car } from "@/utilities/types";

type Props = {
    car: Car
}

export default function CarManagerCard({ car }: Props){

    async function setCurrentCar(){
        await clientFetcher("/api/setcurrentcar", {
            method: 'POST',
            body: JSON.stringify({
                car_id: car.car_id
            })
        });
    }

    return (
        <button onClick={setCurrentCar} className="flex justify-center m-3 p-3 bg-red-600 hover:bg-red-900 rounded-full">{car.name}</button>
    )
}