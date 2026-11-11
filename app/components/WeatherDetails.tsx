import type { LucideIcon } from "lucide-react";

type Props = {
    descricao: string;
    name: string
    icone: LucideIcon
    state: string
}


export default function WeatherDetails( {descricao, name, state, icone: Icone}:Props){
    return(

        <main className='border border-transparent border-b-(--cor-borda) pb-[20px]  mt-[20px] flex justify-between items-center'>
            <div className="flex items-center gap-[15px]">
                <div className="text-(--cor-amarelo-sol)">
                    <Icone size={17}/>
                </div>
                <div>
                    <p className="text-[0.75rem] lg:text-[0.8rem] tracking-widest text-(--cor-borda) mb-[10px] capitalize">{name}</p>
                    <p className="text-white font-bold">{state}</p>
                    
                </div>
            </div>
            <div className="text-[0.75rem] lg:text-[0.8rem] tracking-widest text-(--cor-borda) mb-[10px] capitalize">
                {descricao}
            </div>
        </main>
    )
}