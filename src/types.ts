
export interface City {
  _id: number
  city_code: number
  city_name_he: string
  city_name_en: string
}


export interface WeatherResponse {
  location: {
    name: string
    country: string
    localtime: string
  }
  current: {
    temp_c: number
    feelslike_c: number
    humidity: number
    wind_kph: number
    condition: {
      text: string
      icon: string
    }
  }
}


export interface HistoryItem {
  cityHe: string
  cityEn: string
  tempC: number
  condition: string
  date: string
}
