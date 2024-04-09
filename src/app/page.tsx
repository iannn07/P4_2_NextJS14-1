import { Card, CustomFilter, Hero, SearchBar, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { HomeProps } from '@/types';
import { getCars } from '@/utils';

export default async function Home({ searchParams }: HomeProps) {
  const { brand, year, model, limit, fuel } = searchParams;

  // API BUG FIX
  const car_years = [...yearsOfProduction];
  let car_year = Number(
    car_years[Math.floor(Math.random() * car_years.length)].value
  );

  if (car_year < 1950 || car_year > 2022) {
    car_year = 2022;
  }

  // API BUG DEFAULT VALUE
  const allCars = await getCars({
    brand: brand || '',
    model: model || '',
    year: year || car_year,
    fuel: fuel || '',
    limit: limit || 20,
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

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
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <div key={car.id} className='home__car-container'>
                  <Card car={car} />
                </div>
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 20) / 10}
              isNext={(searchParams.limit || 20) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>No results</h2>
            <p>{allCars.message}</p>
            <p>Please try again later.</p>
          </div>
        )}
      </div>
    </main>
  );
}
