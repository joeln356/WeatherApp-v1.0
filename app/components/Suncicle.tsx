import Title from './Title';
import {useState, useEffect} from 'react';
import {Sunrise, Sun } from 'lucide-react';
type coordenadas = {
    latitude:number;
    longitude:number;
    hora: Date
}

export default function Suncicle({latitude, longitude, hora}: coordenadas){

    const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset`

    const[sunRise, setSunRise]= useState<string | null>(null)
    const[sunSet, setSunSet]= useState<string | null>(null)

    useEffect(()=>{
        fetch(endpoint)
        .then(response => response.json())
        .then( data=>{
            
            setSunRise(data.daily.sunrise[0].split('T')[1])
            setSunSet(data.daily.sunset[0].split('T')[1])
        })
    }, [endpoint])

    function formatHour(time: string){
        const [hours, minutes] = time.split(":").map(Number)
        return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours >= 12 ? "PM":"AM"}`;
    }

    function sunPosition(){
               
        let sunRiseTime = sunRise?.split(":")
        let sunSetTime = sunSet?.split(":")

        let currentHour = hora.getHours()
        let currentMinutes = hora.getMinutes()
        let sunRiseHour = 0
        let sunRiseMinutes = 0
        let sunSetHour = 0
        let sunSetMinutes = 0

        if(sunRiseTime){
            sunRiseHour = Number(sunRiseTime[0])
            sunRiseMinutes = Number(sunRiseTime[1])
        }

        if(sunSetTime){
            sunSetHour = Number(sunSetTime[0])
            sunSetMinutes = Number(sunSetTime[1])
        }

        let currentTimeInMinutes = (currentHour * 60) + currentMinutes
        let sunRiseInMinutes = (sunRiseHour * 60) + sunRiseMinutes
        let sunSetinMinutes = (sunSetHour * 60) + sunSetMinutes

        let position = ((currentTimeInMinutes - sunRiseInMinutes) / (sunSetinMinutes - sunRiseInMinutes))*100
        
        return position
    }

    let position = sunPosition()
    const x = position / 100;
    const y = Math.sqrt(1 - (x * 2 - 1) ** 2);

    return(
        <main className="border rounded-3xl p-[25px] ">
            <Title subTitle='Daylight' title='Sun cycle' icone={Sunrise}/>
            <main className="flex justify-between items-center ">
                <div className='flex flex-col'>
                    <span className='text-[0.75rem] lg:text-[0.8rem] tracking-widest text-(--cor-borda) mb-[10px]'>Sunrise</span>
                    <span className='text-white font-bold'>{sunRise !== null && <p>{formatHour(sunRise)}</p>}</span>
                </div>
                <div className=' relative h-28  w-[45%] md:w-[60%] overflow-hidden'>

                    <div className="absolute left-[0%] right-[0%] top-[2rem] h-36 rounded-[50%] border-t-2  border-(--cor-amarelo-sol)"/>
                    
                    <Sun className="absolute   text-(--cor-amarelo-sol)"
                        // style={{left:`${position}%`}}
                        style={{offsetPath: "path('M 0 100 Q 150 0 300 100')",
                                offsetDistance: `40%`,}}
                        size={30}
                    />
                </div>
                <div className='text-right'>
                    <span className='text-[0.75rem] lg:text-[0.8rem] tracking-widest text-(--cor-borda) mb-[10px]'>Sunset</span>
                    <span className='text-white font-bold'>{sunSet !== null && <p>{formatHour(sunSet)}</p>}</span>
                </div>
            </main>
        </main>
    )
}