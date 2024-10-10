"use client"

import { Cars } from "@/utilities/types"
import CarManagerCard from "./CarManagerCard";
import { useEffect, useState } from "react";
import AddCarButton from "./AddCarButton";

type Props = {
    cars: Cars,
    user: string
}

export default function CarManagerList({ cars, user }: Props){

    const [ carsList, setCarsList ] = useState(cars)
    const [ currentCar, setCurrentCar ] = useState(cars.current_car)

    useEffect(() => {
        if(!carsList) return
        if(carsList.current_car !== currentCar) setCurrentCar(carsList.current_car)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carsList])

    return (
        <>
            <AddCarButton carsList={carsList} setCarsList={setCarsList}/>
            <div className="flex justify-center">
                <div>
                    {carsList.cars.map((car, index: number) => (
                        <CarManagerCard key={index} car={car} currentCar={currentCar} setCurrentCar={setCurrentCar} user={user}/>
                    ))}
                </div>
            </div>
        </>
    );
}