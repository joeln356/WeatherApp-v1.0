"use client"

import {useState, useEffect} from 'react';

import Header from "./components/Header";
import Suncicle from "./components/Suncicle";
import Title from "./components/Title";
import CardDays from './components/CardDays';
import WeatherDetails from './components/WeatherDetails';

import{Navigation,
      Sun,
      CloudSun,
      CloudMoon,
      Moon,
      Cloud,
      Cloudy,
      CloudRainWind,
      CloudLightning,
      CloudSunRain, 
      CloudMoonRain,
      Snowflake,
      Wind,
      Compass,
      Clock,
      Sunrise,
      Droplets,
      Eye,
      Gauge,
      Thermometer
    } from "./components/Icones"

export default function Home() {

  const weathericones = {
    '01d': Sun,
    '01n': Moon,

    '02d': CloudSun,
    '02n': CloudMoon,

    '03d': CloudSun,
    '03n': CloudMoon,

    '04d': Cloudy,
    '04n': Cloudy,

    '09d': CloudRainWind,
    '09n': CloudRainWind,

    '10d': CloudSunRain,
    '10n': CloudMoonRain,
    
    '11d': CloudLightning,
    '11n': CloudLightning,

    '13d': Snowflake,
    '13n': Snowflake,
  }
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const agora = new Date();

  const todayIndex = agora.getDay();

  const days = Array.from({ length: 5 }, (_, index) => {
    return week[(todayIndex + 1 + index) % 7];
  });
  const [city, setCity] = useState('None')
  const [country, setCountry] = useState('None')
  const [lat, setLat] = useState(-23.5505)
  const [lon, setLon] = useState(-46.6333)
  const [iconCode, setIconCode] = useState('01d')
  const [temp, setTemp] = useState(0)
  const [maxTemp, setMaxTemp] = useState(0)
  const [minTemp, setMinTemp] = useState(0)
  const [feelsLike, setFeelsLike] = useState(0)
  const [desc, setDesc] = useState('None')
  const [WS, setWS] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [uv, setUV] = useState<number>(0)
  const [visibility, setVisibility] = useState<number>(0)
  const [dew, setDew] = useState<number>(0)
  const [locationLoaded, setLocationLoaded] = useState(false);

  let WeatherIcon = iconCode in weathericones ? weathericones[iconCode as keyof typeof weathericones] : Cloud

  useEffect(()=>{
    fetch('https://free.freeipapi.com/api/v1/json')
    .then( responnse => responnse.json())
    .then( data => {

      setLon(data.longitude)
      setLat(data.latitude)
      setCity(data.regionName)
      setCountry(data.countryName)
      
      setLocationLoaded(true);
    })
  },[])

  const currentWeatherEndpoint : string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=acd126cb1b8c63520fa45c6f0f32164a`

  useEffect(()=>{
    if (!locationLoaded) return;

    fetch(currentWeatherEndpoint)
    .then( response => response.json())
    .then( data => {
    
    console.log(data)
    setMaxTemp(Math.round(data.main.temp_max))
    setMinTemp(Math.round(data.main.temp_min))
    setFeelsLike(Math.round(data.main.feels_like))
    setIconCode(data.weather[0].icon)
    setDesc(data.weather[0].description)
    setTemp(data.main.temp)
    setWS(data.wind.speed)
    setHumidity(data.main.humidity)
    setVisibility(data.visibility)
    })
    
  }, [currentWeatherEndpoint, locationLoaded])

  useEffect(()=>{
    if (!locationLoaded) return;
    fetch(`https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lon}`)
    .then(response => response.json())
    .then(data =>{
      setUV(data.now.uvi)
    })
  })
  function getUVLevel(uv:number) : string{
    if(uv < 3) return "Low"
    if(uv < 6) return "Moderate"
    if(uv < 3) return "High"
    if(uv < 11) return "Very High"

    return "Extreme"
  }
  function getHumtyLevel(humidity:number) : string{
    if(humidity < 30) return "Very Dry"
    if(humidity < 40) return "Dry"
    if(humidity < 61) return "Comfortable"
    if(humidity < 71) return "Slightly Humid"
    if(humidity < 81) return "Humid"
    if(humidity < 101) return "Very Humid"

    return "Very Humid"
  }
  function getDewPointLevel(dew: number): string {
  if (dew < 10) return "Dry"
  if (dew < 13) return "Comfortable"
  if (dew < 16) return "Slightly Humid"
  if (dew < 19) return "Humid"
  if (dew < 22) return "Very Humid"
  if (dew < 24) return "Oppressive"

  return "Extremely Oppressive"
}
function getVisibilityLevel(visibility: number): string {
  const km = visibility / 1000;

  if (km < 1) return "Very Poor";
  if (km < 4) return "Poor";
  if (km < 10) return "Moderate";
  if (km <= 20) return "Good";

  return "Excellent";
}
  

  function calculatedDewPoint(temp:number, humidity:number) : number{
    const gamma =
    Math.log(humidity / 100) +
    (17.625 * temp) / (243.04 + temp);

    return (243.04 * gamma) / (17.625 - gamma);
  }
  useEffect(()=>{
    setDew(Math.round(calculatedDewPoint(temp, humidity)))
  }, [temp, humidity])
  
  const weatherDetails = [
    {
        descricao: 'SW',
        icone: Wind,
        name: 'Wind',
        state: `${WS} km/h`
    },
    {
        descricao: getHumtyLevel(humidity),
        icone: Droplets,
        name: 'Humidity',
        state: `${humidity}%`
    },
    {
        descricao: getVisibilityLevel(visibility),
        icone: Eye,
        name: 'Visibility',
        state: `${visibility / 1000} km`
    },
    {
        descricao: getUVLevel(uv),
        icone: Sun,
        name: 'UV index',
        state: `${uv}`
    },
    {
        descricao: getDewPointLevel(dew),
        icone: Thermometer,
        name: 'Dew point',
        state: `${dew}°`
    }
];
  return (
      <>
        <Header/>
        <main className="  px-[30px] md:px-[40px] lg:px-[65px] ">
          <div className=" mt-[80px]">
            <section className="min-h-[calc(100vh-83px)]  space-y-[25px] flex flex-col justify-center">
              <header>
                <h1 className="flex items-center gap-[5px]">
                  <Navigation size={14} className="text-(--cor-amarelo-sol)"/>
                  <address className="text-[0.8125rem] lg:text-[1rem] text-(--cor-borda)">
                    {city}, {country}
                  </address>
                </h1>
              </header>
              <main className="flex flex-col lg:flex-row lg:items-end lg:gap-[50px] space-y-[20px] lg:space-y-0">
                <section className="flex items-center gap-[15px]  ">
                  <WeatherIcon
                    size={100}
                    strokeWidth={1}
                    className="text-(--cor-amarelo-sol)"
                  />
                  <p className="m-0 text-white font-(family-name:--font-space-grotesk) tracking-[-0.11em] leading-[0.8]  text-8xl lg:text-[11rem] font-bold">
                    {Math.round(temp)}°
                  </p>
                </section>
                <section className="text-white space-y-[10px] lg:space-y-[0px]">
                  <div className="font-bold text-[1.5rem] lg:text-[2rem] font-(family-name:--font-space-grotesk) capitalize">{desc}</div>
                  <div className="flex items-center gap-[15px]  text-[0.8125rem] lg:text-[1rem] text-(--cor-borda)">
                    <span>Feels like {feelsLike}°</span>
                    <span className="block bg-white w-[2px] h-[2px] rounded-full" />
                    <span>High {maxTemp}°</span>
                    <span className="block bg-white w-[2px] h-[2px] rounded-full" />
                    <span>Low {minTemp}°</span>
                  </div>
                </section>
            
              </main>
              <footer>
                <div className="w-full bg-(--cor-borda) h-[0.5px] rounded-full mt-[20px]"></div>
                <div className="flex justify-between mt-[35px]">
                  <section className="text-[0.8125rem] lg:text-[1rem] text-(--cor-borda) flex flex-wrap space-x-[30px]">
                    <span >
                    {WS} Km/h SW
                    </span>
                    <span>
                      {humidity}% humidity
                    </span>
                    <span>Updated {
                        agora.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                      }</span>
                  </section>
                </div>
              </footer>
            </section>
          </div>

          <section>
            <header>
              <span className="text-(--cor-amarelo-sol) text-[0.75rem] lg:text-[0.8rem] font-bold tracking-widest" >YOUR FORECAST</span>
              <h1 className="text-white font-bold text-[1.5rem] lg:text-[2.5rem] font-(family-name:--font-space-grotesk)">The next few hours</h1>
            </header>
            
            <section className="grid lg:grid-cols-[1.5fr_1fr] md:grid-cols-[1fr_1fr] gap-[25px] mt-[30px]">
              <section className="border rounded-3xl p-[25px]">
                <Title subTitle= "Next 12 Hours" title = "Hourly forecast" icone={Clock}/>
                <main>

                </main>
              </section>

              <Suncicle latitude={lat} longitude={lon} hora={agora} />
            </section>
          </section>

          <section className="grid lg:grid-cols-[1fr_2fr] gap-[25px] mt-[30px]">
            <aside className="border rounded-3xl p-[25px]">
              <Title subTitle= "Plan ahead" title = "7-day forecast" icone={Compass}/>
              <aside className='mt-[45px]'>
                {Array.from({ length: 7 }).map((_, index) => (
                  <CardDays key={index} />
                ))}
              </aside>
            </aside>

            <aside className="border rounded-3xl p-[25px]">
              <Title subTitle= "Atmosphere" title = "Weather details" icone={CloudSun}/>
              <aside className='grid lg:grid-cols-2 gap-x-[25px]'>
                {weatherDetails.map((detail) => (
                    <WeatherDetails
                        key={detail.name}
                        descricao={detail.descricao}
                        icone={detail.icone}
                        name={detail.name}
                        state={detail.state}
                    />
                ))}
              </aside>
            </aside>
          </section>
        </main>
      </>
  );
}
