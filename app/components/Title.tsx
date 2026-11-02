type text = {
    subTitle:string;
    title:string;
}

export default function Title({subTitle, title}: text){

    return(
        <header>
            <div className="uppercase text-[0.75rem] lg:text-[0.8rem] font-medium tracking-widest text-(--cor-borda) mb-[10px]">
                {subTitle}
            </div>
            <h1 className="text-white font-bold  text-[1.13rem] lg:text-[1.5rem]  font-(family-name:--font-space-grotesk) mb-[25px]">
                {title}
            </h1>
        </header>
    )
}