'use client';

import { Card, CustomFilter, Hero, SearchBar, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { getCars } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search State
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  // Filter State
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2000);

  // Pagination State
  const [limit, setLimit] = useState(10);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const result = await getCars({
        brand: brand || '',
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
        year: year || 2000,
      });
      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, fuel, limit, model, year]);

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>
            Explore all of our Cumi Darat Cars and find the perfect one for you.
          </p>
        </div>

        <div className='home__filters'>
          <SearchBar setModel={setModel} setBrand={setBrand} />
          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel} />
            <CustomFilter
              title='year'
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                // eslint-disable-next-line react/jsx-key
                <Card car={car} />
              ))}
            </div>

            {loading && (
              <div className='mt-16 w-full flex-center'>
                <Image
                  src='/loader.svg'
                  alt='loader'
                  width={50}
                  height={50}
                  className='object-contain'
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>No results</h2>
            <p>Please try again later.</p>
          </div>
        )}
      </div>
    </main>
  );
}
