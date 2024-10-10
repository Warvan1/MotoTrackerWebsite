import { Session } from "@auth0/nextjs-auth0"

export type FetcherOptions = {
    method?: string,
    session: Session,
    car_id?: number,
    body?: object,
    cache?: RequestCache
}

export type Car = {
    car_id: number,
    user_id: string,
    name: string,
    year: number,
    make: string,
    model: string,
    miles: number,
    total_costs: string,
    total_gallons: string,
    total_fuel_costs: string,
    oil_change_time: string,
    oil_change_miles: number,
    tire_rotation_time: string,
    tire_rotation_miles: number,
    air_filter_time: string,
    air_filter_miles: number,
    inspection_time: string,
    registration_time: string,
    permissions: string
}

export type Cars = {
    cars: Car[]
    current_car: number
}