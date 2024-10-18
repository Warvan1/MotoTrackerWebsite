import MaintenanceLogHeader from "@/components/MaintenanceLogHeader"
import MaintenanceLogList from "@/components/MaintenanceLogList"
import NavBar from "@/components/NavBar"
import { addUser } from "@/utilities/addUser"
import { fetcher } from "@/utilities/fetcher"
import { Car, FetcherOptions, MaintenanceList } from "@/utilities/types"
import { getSession } from "@auth0/nextjs-auth0"
import { redirect } from "next/navigation"

type Props = {
    params: {
        details: string[]
    }
}

export default async function MaintenanceLogDetails({ params }: Props){
    const session = await getSession()
    if(!session) redirect("/api/auth/login")
    await addUser(session)
    
    const currentCar: Car | null = await fetcher("/getcurrentcar", { session: session })
    if(currentCar === null) redirect("/")

    const options: FetcherOptions = {
        session: session,
        page: parseInt(params.details[0])
    }
    if(options.page !== undefined && isNaN(options.page)) options.page = 1
    if(params.details.length >= 2) options.filter = params.details[1]

    const maintenanceList: MaintenanceList = await fetcher("/getmaintenancelog", options)

    return (
        <div>
            <NavBar sessionBool={true}/>
            <p className='flex justify-center p-2 top-0 w-screen text-white text-lg'>Maintenance Log - {currentCar.name}</p>
            <MaintenanceLogHeader currentCar={currentCar} details={params.details} pages={maintenanceList.totalPages}/>
            <MaintenanceLogList maintenanceList={maintenanceList}/>
        </div>
    )
}