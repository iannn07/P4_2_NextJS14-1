import { CarProps, FilterProps } from '@/types';
import axios from 'axios';

export async function getCars(filters: FilterProps) {
  const { brand, year, model, limit, fuel } = filters;
  console.log(filters);

  const response = await axios.get(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${brand}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: {
        'X-RapidAPI-Key': 'a5d2c58859msh8b6b9cc17d34bbdp128a9fjsn595536d17b0c',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
      },
    }
  );

  // console.log(response.data);

  return response.data;
}

export const calculateRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageURL = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  const { make, model, year } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
  return newPathname;
};
