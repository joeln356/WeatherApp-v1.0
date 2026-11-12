export default function CardDays(){
    return(
        <section  className="border border-transparent border-b-(--cor-borda) pb-[5px]  mt-[5px] flex justify-between items-center">
            <div>
                <div className="text-white font-bold">Hoje</div>
                <div className="text-[0.75rem] lg:text-[0.8rem] tracking-widest text-(--cor-borda) mb-[10px] capitalize">Nov 11</div>
            </div>
            <div className="flex items-center gap-[10px]">
                <div className="text-[0.75rem] lg:text-[0.8rem] tracking-widest text-(--cor-borda) mb-[10px] capitalize">
                    ama
                </div>
                <div className="text-[0.75rem] lg:text-[0.8rem] tracking-widest text-(--cor-borda) mb-[10px] capitalize">12%</div>
            </div>
        </section>
    )
}