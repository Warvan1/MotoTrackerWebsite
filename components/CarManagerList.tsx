"use client"

import { Car } from "@/utilities/types"
import CarManagerCard from "./CarManagerCard";
import { createContext, useState } from "react";

type Props = {
    cars: {
        cars: Car[]
        current_car: number
    }
}

type UserContextType = {
    currentCar: number | null,
    setCurrentCar: ((currentCar: number) => void) | null
}

export const CarManagerListContext = createContext<UserContextType>({currentCar: null, setCurrentCar: null})

export default function CarManagerList({ cars }: Props){

    const [currentCar, setCurrentCar] = useState(cars.current_car)

    return (
        <div className="flex justify-center">
            <div>
                <CarManagerListContext.Provider value = {{currentCar, setCurrentCar}}>
                    {cars.cars.map((car, index: number) => (
                        <CarManagerCard key={index} car={car}/>
                    ))}
                </CarManagerListContext.Provider>
            </div>
        </div>
    );
}