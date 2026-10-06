"use client"

import{CloudSun, Search} from "./icones"
import { useState } from "react"


export default function Header(){
    
    const [isCelcius, setCelcius] = useState(true)

    return(
        <header className="flex  justify-between items-center p-[20px] lg:pl-[55px] lg:pr-[55px] ">

            {/* logo (left-side) */}
            <a href="/" className="flex justify-center items-center space-x-[5px]" >
                <div className="rounded-full p-[8px] flex justify-center items-center bg-[var(--cor-amarelo-sol)]">
                    <CloudSun size={20} />
                </div>

                <div className="leading-none flex items-baseline gap-[2px] translate-y-[3px]">

                    <span className="text-white font-semibold leading-none">
                        WeatherApp
                    </span>
                    

                    <span className="rounded-full h-[4px] w-[4px] bg-[var(--cor-amarelo-sol)] block"></span>

                </div>
            </a>
            

            {/* right-side of header */}
            <section className="flex justify-cernter items-center gap-[10px]">
                <div className="flex justify-center items-center border rounded-3xl border-[var(--cor-borda)] p-[6px] ">

                    <button onClick={()=>setCelcius(true)} className={isCelcius ? "text-[10px] bg-white px-[10px] rounded-2xl cursor-pointer" : "text-[10px] px-[10px] rounded-2xl cursor-pointer text-(--cor-borda) hover:text-white"}>°C</button>

                    <button onClick={()=>setCelcius(false)} className={isCelcius ? "text-[10px] px-[10px] rounded-2xl cursor-pointer text-(--cor-borda) hover:text-white" : "text-[10px] bg-white px-[10px] rounded-2xl cursor-pointer" }>°F</button>
                </div>
                <div className="border rounded-3xl flex justify-center items-center border-[var(--cor-borda)] p-[10px] gap-[6px] ">
 
                    <Search size={15} className="text-white cursor-pointer"/>
                    <input type="text" className="hidden" />
                </div>
                <div></div>
            </section>
        </header>
    )
}