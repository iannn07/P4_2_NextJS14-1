import { Card, CustomFilter, Hero, SearchBar } from '@/components';
import { getCars } from '@/utils';

export default async function Home() {
  const allCars = await getCars();

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
            <CustomFilter />
            <CustomFilter />
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
