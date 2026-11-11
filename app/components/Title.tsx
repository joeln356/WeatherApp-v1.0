import type { LucideIcon } from "lucide-react";

type Props = {
    subTitle:string;
    title:string;
    icone: LucideIcon
}

export default function Title({subTitle, title, icone: Icone  }: Props){
    
    return(
        <header className="flex items-center justify-between mb-[20]">
            <div className="space-y-[10px]">
                <div className="uppercase text-[0.75rem] lg:text-[0.8rem] font-medium tracking-widest text-(--cor-borda)">
                    {subTitle}
                </div>
                <h1 className="text-white font-bold  text-[1.13rem] lg:text-[1.5rem]  font-(family-name:--font-space-grotesk) ">
                    {title}
                </h1>
            </div>
            <div className="text-(--cor-amarelo-sol)">
                <Icone size={23}/>
            </div>
        </header>
    )
}