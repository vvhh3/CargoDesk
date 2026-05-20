
type RecentProps ={ 
    text: string
    time:string
    color: string
}

export default function RecentActivity({text,time,color} : RecentProps) {

    return (
        <div className="flex-col">
            <div className="w-ful flex gap-4 justify-start items-center">
                
                <div className={`w-3 h-3 bg-${color} rounded-full`}></div>
                <div className="flex flex-col">
                    <span className="text-white text-lg">{text}</span>
                    <span className="text-zinc-400 text-sm">{time}</span>
                </div>
            </div>
        </div>
    )
}
