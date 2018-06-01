export interface Forecast {
  forecastMoments: ForecastMoment[]
}

export interface ForecastMoment {
  time: string,
  temp_high: number,
  temp_low: number,
  humidity: number,
  windDirection: string,
  windStrength: number
}

export class ForecastService {
  public getWeatherForecasts() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api.openweathermap.org/data/2.5/forecast?id=2694762&APPID=d5522d73c5c76fd651027ccd9f7ee924", false);
    xhr.send();
    let response = JSON.parse(xhr.responseText);
    //Handle the response
    return this.createForecast(response.list);
  }

  private createForecast(json): Forecast {
    let forecast: Forecast = { forecastMoments: [] };
    for (let element of json) {
      let forecastMoment: ForecastMoment = {
        time: element.main.dt_txt,
        temp_high: this.kelvinToCelsius(element.main.temp_max),
        temp_low: this.kelvinToCelsius(element.main.temp_min),
        humidity: element.main.humidity,
        windDirection: element.wind.deg,
        windStrength: element.wind.speed
      }
      this.addForecastMoment(forecast, forecastMoment)
    }
    return forecast;
  }

  private addForecastMoment(forecast: Forecast, forecastMoment: ForecastMoment) {
    forecast.forecastMoments.push(forecastMoment);
  };
  
  private kelvinToCelsius(kelvin) {
    let celsius = kelvin - 273.15;
    return celsius;
  }


}


//Latitude: 58.402128 | Longitude: 15.60235
//api.openweathermap.org/data/2.5/weather?lat=58.402128&lon=15.60235
//api-key: d5522d73c5c76fd651027ccd9f7ee924
//http://api.openweathermap.org/data/2.5/forecast?id=2694762&APPID=d5522d73c5c76fd651027ccd9f7ee924
//http://api.openweathermap.org/data/2.5/weather?lat=58.402128&lon=15.60235&APPID=d5522d73c5c76fd651027ccd9f7ee924