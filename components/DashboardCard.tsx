import Card from "./Card"

type Props = {
    title: string,
    timestamp: number,
    milesDifference: number | null
}

export default function DashboardCard({ title, timestamp, milesDifference }: Props){

    function formatTimeInterval(startTimestamp: number){
        const startTime = new Date(startTimestamp)
        const endTime = new Date()
        
        let years = endTime.getFullYear() - startTime.getFullYear()
        let months = endTime.getMonth() - startTime.getMonth()
        let days = endTime.getDate() - startTime.getDate()

        if(days < 0){
            days += new Date(endTime.getFullYear(), endTime.getMonth(), 0).getDate()
            months--
        }
        if(months < 0){
            months += 12
            years--
        }

        if(years === 0 && months === 0) return `${days} days`
        else if(years === 0) return `${months} months, ${days} days`
        return `${days} days, ${months} months, ${years} years`
    }
    
    return (
        <>
            {timestamp > 0 && <Card>
                <div className="flex">
                    <p className="p-1 text-xl text-text">{title}</p>
                </div>
                {timestamp && <div className="flex">
                    <p className="py-1 pr-8 pl-1 text-sm text-text">Time Since: {formatTimeInterval(timestamp)}</p>
                </div>}
                {milesDifference && <div className="flex">
                    <p className="py-1 pr-8 pl-1 text-sm text-text">Miles Since: {milesDifference}</p>
                </div>}
            </Card>}
        </>
    )
}
