"use client"

import { Cars } from "@/utilities/types"
import CarManagerCard from "./CarManagerCard";
import { useState } from "react";
import AddCarButton from "./AddCarButton";

type Props = {
    cars: Cars,
    user: string
}

export default function CarManagerList({ cars, user }: Props){

    const [ carsList, setCarsList ] = useState(cars)
    const [ currentCar, setCurrentCar ] = useState(cars.current_car)

    return (
        <>
            <AddCarButton carsList={carsList} setCarsList={setCarsList} setCurrentCar={setCurrentCar}/>
            <div className="flex justify-center">
                <div>
                    {carsList.cars.map((car, index: number) => (
                        <CarManagerCard key={index} user={user} car={car} currentCar={currentCar} setCurrentCar={setCurrentCar}/>
                    ))}
                </div>
            </div>
        </>
    );
}