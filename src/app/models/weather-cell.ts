export class WeatherCell{
    weatherForecast: any;
    constructor(
         public id:number,
         public cityName:string,
         public country:string,
         public measure:string, 
         weatherForecast:any
         )
         {
        this.weatherForecast = weatherForecast;
        
    }   
}

export class WeatherCellDetail{
    currentWeather:any;
    currentTemp:any;
    constructor(
        public id:number, //data.id
        public cityName:string, //data.name
        public country: string, //data.sys.country
        public sunrise: number, //data.sys.sunrise 
        public sunset: number, //data.sys.sunset
        public wind : number, //data.wind.speed
        public windDeg : number, //data.wind.deg
        currentWeather, //data.weather[0]
        currentTemp //data.main
    ){
        this.currentWeather = currentWeather;
        this.currentTemp = currentTemp;
    }
}

