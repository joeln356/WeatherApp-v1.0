    "use client"

    import{CloudSun, Search} from "./icones"
    import { useState, useRef, useEffect } from "react"


    export default function Header(){
        
        const [isCelcius, setCelcius] = useState(true)
        const [isSearchOpen, setIsSearchOpen] = useState(false);
            const [pageWidth, setPageWidth] = useState(0)
            const [isWidthMaior, setisWidthMaior] = useState(false)

            const searchRef = useRef<HTMLDivElement>(null)

            useEffect(()=>{
                setPageWidth(window.innerWidth)
                
                const handleResize = ()=>{
                    setPageWidth(window.innerWidth)
                }
                window.addEventListener('resize', handleResize)
                return () => {
                    window.removeEventListener("resize", handleResize)
                }
            }, [])

            function layoutWidth(){
                
                if(pageWidth <= 768){
                    return setIsSearchOpen(!isSearchOpen)
                }else{
                    return setisWidthMaior(!isWidthMaior)
                }
            }

        useEffect(()=>{
            function handleClickOutside(event : PointerEvent){
                if(
                    searchRef.current &&
                    !searchRef.current.contains(event.target as Node)
                ){
                    setIsSearchOpen(false)
                    setisWidthMaior(false)
                }
                
            }
            document.addEventListener("pointerdown", handleClickOutside)
            return ()=>{
                document.removeEventListener("pointerdown", handleClickOutside)
            }
        }, [])


        return(
            <header className="flex  justify-between items-center p-[20px] md:px-[40px] lg:px-[65px]">

                {/* logo (left-side) */}
                <a href="/" className={isSearchOpen? "opacity-0 invisible max-w-0": "overflow-hidden transition-all duration-600  flex justify-center items-center space-x-[5px]"} >
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
                <section className={isSearchOpen? "flex justify-center items-center gap-[10px] w-full overflow-hidden transition-all duration-600 ": "flex justify-center items-center gap-[10px]"}>

                    {/* °C & °F  */}
                    <div className={ isSearchOpen? "opacity-0 invisible max-w-0":"flex justify-center items-center border rounded-3xl border-(--cor-borda) p-[6px] overflow-hidden "}>
                        <button onClick={()=>setCelcius(true)} className={isCelcius ? "text-[11px] bg-white px-[10px] rounded-2xl cursor-pointer" : "text-[11px] px-[10px] rounded-2xl cursor-pointer text-(--cor-borda) hover:text-white"}>°C</button>

                        <button onClick={()=>setCelcius(false)} className={isCelcius ? "text-[11px] px-[10px] rounded-2xl cursor-pointer text-(--cor-borda) hover:text-white" : "text-[11px] bg-white px-[10px] rounded-2xl cursor-pointer" }>°F</button>
                    </div>

                    <div className={isWidthMaior? "border rounded-3xl flex items-center border-(--cor-borda) p-[10px] gap-[6px] w-full flex-1  md:w-[350px] duration-400": "border rounded-3xl flex items-center border-(--cor-borda) p-[10px] gap-[6px] w-full flex-1 md:w-[250px] duration-400 cursor-pointer"} ref={searchRef}>

                        <label htmlFor="Search" onClick={layoutWidth}  >
                            <Search size={15} className="text-white cursor-pointer"/>
                        </label>

                        <input
                         type="text"
                         id="Search" 
                         placeholder={isWidthMaior? "Search a city":""}
                         onClick={()=>setisWidthMaior(true)}
                        //  disabled={isWidthMaior? false : true}
                         className={isSearchOpen? "block w-full text-white outline-none h-[20px] text-sm cursor-pointer":"hidden md:block w-[200px] outline-none text-white h-[20px] text-sm cursor-pointer" } />
                        
                    </div>
                </section>
            </header>
        )
    }