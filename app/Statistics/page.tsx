import NavBar from "@/components/NavBar"
import StatisticsGraph from "@/components/StatisticsGraph"
import { addUser } from "@/utilities/addUser"
import { fetcher } from "@/utilities/fetcher"
import { Car, Maintenance, statsData } from "@/utilities/types"
import { getSession } from "@auth0/nextjs-auth0"
import { redirect } from "next/navigation"

export default async function Statistics(){
    const session = await getSession()
    if(!session) redirect("/api/auth/login")
    await addUser(session)
    
    const currentCar: Car | null = await fetcher("/getcurrentcar", { session: session })
    if(currentCar === null) redirect("/")

    const maintenanceList: { data: Maintenance[] } = await fetcher("/getmaintenancelog", {
        session: session,
        filter: "Fuel",
        statistics: 1
    })

    const graphData: statsData = {
        mpgData: [],
        dpgData: [],
        dpmData: [],
    }

    for(let i = 1; i < maintenanceList.data.length; i++){
        const element = maintenanceList.data[i]
        const miles = element.miles - maintenanceList.data[i-1].miles

        if(miles >= 0 && parseFloat(element.gallons) > 0){
            graphData.mpgData.push(miles / parseFloat(element.gallons))
        }
        else graphData.mpgData.push(0)

        if(parseFloat(element.cost) >= 0 && parseFloat(element.gallons) > 0){
            graphData.dpgData.push(parseFloat(element.cost) / parseFloat(element.gallons))
        }
        else graphData.dpgData.push(0)

        if(parseFloat(element.cost) >= 0 && miles > 0){
            graphData.dpmData.push(parseFloat(element.cost) / miles)
        }
        else graphData.dpmData.push(0)
    };

    return(
        <div>
            <NavBar sessionBool={true}/>
            <p className='flex justify-center p-2 top-0 w-screen text-white text-lg'>Statistics - {currentCar.name}</p>
            <StatisticsGraph graphData={graphData}/>
        </div>
    )
}